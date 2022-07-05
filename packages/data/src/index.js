import { Octokit } from 'octokit'
import { readFile, access } from 'fs/promises'
import fm from 'front-matter'

async function loadCode(owner, repo, files, ref, ghpat) {
  const octokit = new Octokit({
    auth: ghpat,
  })
  const p = Promise.all(
    files.map((path) =>
      octokit.request(`GET /repos/{owner}/{repo}/contents/{path}?ref=${ref}`, {
        owner,
        repo,
        path,
      })
    )
  )
  let data
  try {
    data = await p
    return data.map((item) => {
      let buff = Buffer.from(item.data.content, 'base64')
      return {
        path: item.data.path,
        content: buff.toString(),
      }
    })
  } catch (err) {
    if (err.status === 401) {
      throw new Error(
        'Error connecting to GitHub API. Check your personal access token.'
      )
    }
    if (err.status === 404) {
      throw new Error(`GitHub error. 404 file not found: ${err.request.url}`)
    } else {
      throw err
    }
  }
}

function focusValid(focus) {
  if (typeof focus === 'undefined') {
    return true
  }
  if (typeof focus === 'number' && focus >= 0) {
    return true
  }
  if (typeof focus === 'string') {
    const f = focus.split('-')
    const f0 = parseInt(f[0])
    const f1 = parseInt(f[1])
    if (f1 > f0) {
      return true
    }
  }
  return false
}

async function loadStepContent(tutorial, step) {
  let md
  try {
    md = await readFile(`${process.cwd()}/walkthru/${tutorial}/${step}.md`, {
      encoding: 'utf-8',
    })
  } catch (err) {
    throw new Error(`Failed to find or parse step "${step}" in "${tutorial}".`)
  }
  let stepContent
  try {
    stepContent = {
      slug: step,
      content: fm(md).body,
      frontmatter: fm(md).attributes,
    }
  } catch (err) {
    throw new Error(`Step "${step}" in "${tutorial}" is invalid.`)
  }
  if (Object.getOwnPropertyNames(stepContent.frontmatter).length === 0) {
    throw new Error(`Step "${step}" in "${tutorial}" is missing frontmatter.`)
  }
  if (!stepContent.frontmatter.title) {
    throw new Error(
      `Step "${step}" in "${tutorial}" is missing "title" property.`
    )
  }
  if (typeof stepContent.frontmatter.image !== 'undefined' && (!stepContent.frontmatter.image || typeof stepContent.frontmatter.image.src === 'undefined')) {
    throw new Error(
      `Step "${step}" in "${tutorial}" is missing "image" "src" property.`
    )
  }
  if (!focusValid(stepContent.frontmatter.focus)) {
    throw new Error(
      `"focus" property in "${step}" in "${tutorial}" is invalid.`
    )
  }
  const center = stepContent.frontmatter.center
  if (center && center < 0) {
    throw new Error(
      `"center" property in "${step}" in "${tutorial}" is invalid.`
    )
  }
  return stepContent
}

async function loadConfigFile(name) {
  try {
    const json = await readFile(
      `${process.cwd()}/walkthru/${name}/config.json`,
      {
        encoding: 'utf-8',
      }
    )
    return JSON.parse(json)
  } catch (err) {
    throw new Error(`Failed to find or parse config.json file for "${name}".`)
  }
}

async function checkTutorialExists(name) {
  try {
    return await access(`${process.cwd()}/walkthru/${name}`)
  } catch (err) {
    throw new Error(`Could not find tutorial directory ./walkthru/${name}.`)
  }
}

async function checkConfigValid(config, name) {
  if (!config.title) {
    throw new Error(`Config for "${name}" is missing "title" property.`)
  }
  if (!config.code) {
    throw new Error(`Config for "${name}" is missing "code" property.`)
  }
  return true
}

async function getInstructions(steps, name) {
  const instructions = []
  for await (const step of steps) {
    instructions.push(await loadStepContent(name, step))
  }
  return instructions
}

async function getCode(config, instructions, ghpat) {
  const files = instructions
    .filter((i) => i.frontmatter.file)
    .map((i) => i.frontmatter.file)
  let uniqueFiles = files.filter((file, index) => {
    return files.indexOf(file) === index
  })
  return await loadCode(
    config.code.owner,
    config.code.repo,
    uniqueFiles,
    config.code.ref,
    ghpat
  )
}

async function getData(name, ghpat) {
  console.log(`Compiling ${name}...`)
  await checkTutorialExists(name)
  const config = await loadConfigFile(name)
  await checkConfigValid(config, name)
  const instructions = await getInstructions(config.steps, name)
  const code = await getCode(config, instructions, ghpat)
  console.log(`Successfully compiled ${name}.`)
  return { code, instructions, config }
}

export { getData }
