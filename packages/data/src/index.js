import { Octokit } from 'octokit'
import { readFile } from 'fs/promises'
import fm from 'front-matter'

async function getCode(owner, repo, files, ref, ghpat) {
  try {
    const octokit = new Octokit({
      auth: ghpat,
    })
    const data = await Promise.all(
      files.map((path) =>
        octokit.request(
          `GET /repos/{owner}/{repo}/contents/{path}?ref=${ref}`,
          {
            owner,
            repo,
            path,
          }
        )
      )
    )
    return data.map((item) => {
      let buff = new Buffer(item.data.content, 'base64')
      return {
        path: item.data.path,
        content: buff.toString('ascii'),
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function loadStepContent(tutorial, step) {
  const md = await readFile(
    `${process.cwd()}/walkthru/${tutorial}/${step}.md`,
    { encoding: 'utf-8' }
  )
  return {
    slug: step,
    content: fm(md).body,
    frontmatter: fm(md).attributes,
  }
}

async function getData(name, ghpat) {
  const json = await readFile(`${process.cwd()}/walkthru/${name}/config.json`, {
    encoding: 'utf-8',
  })
  const config = JSON.parse(json)
  const instructions = []
  for await (const step of config.steps) {
    instructions.push(await loadStepContent(name, step))
  }
  const files = instructions.map((i) => i.frontmatter.file)
  let uniqueFiles = files.filter((file, index) => {
    return files.indexOf(file) === index
  })
  const code = await getCode(
    config.code.owner,
    config.code.repo,
    uniqueFiles,
    config.code.ref,
    ghpat
  )
  return { code, instructions, config }
}

export { getData }
