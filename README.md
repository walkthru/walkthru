# WalkThru

**WalkThru is a better way of explaining code on the web.**

![WalkThru demo](https://media.giphy.com/media/A4McguuzE9AApZNZel/giphy.gif)

Check out the [Next.js demo](https://walkthru.netlify.app/walkthru-intro) or the [Docusaurus demo](https://walkthru-docusaurus.netlify.app/guides/walkthru-intro) to see how it works.

Follow [on Twitter](https://twitter.com/walkthruapp) for news and updates.

## Packages

Either use this:

- **WalkThru Docusaurus preset** for installing in a Docusaurus site.

Or both of these:

- **WalkThru data module** for compiling a tutorial from markdown files.
- **WalkThru React component** for displaying a tutorial in your site or app.

## WalkThru Docusaurus preset

A great way to use WalkThru is to add it to your Docusaurus site as a preset. 

- Installation and configuration instructions can be found [here](https://walkthru-docusaurus.netlify.app/guides/installing-walkthru). 
- An example implementation can be found [here](https://github.com/walkthru/docusaurus-demo).

## WalkThru data module

This module is used to compile a tutorial before it is displayed in your app.

### Installation

```
npm i -D @walkthru/data
```

### Usage in an app

The data module should be used server side. For example, in the `getStaticProps` method of Next.js or in a serverless function.

First, import the `getData` method from the package at the top of the file. This method is accepts an options object.

- `githubToken` (required). This is a GitHub personal access token which is used to contact the GitHub API to grab the code from your repo. You can learn how to generate one [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). You should probably put this in an environment variable.

The method will compile the tutorial and return it as an object that can be passed as props to the *WalkThru React component* to display the tutorial.

```js
import { getData } from '@walkthru/data'

const data = await getData({ githubToken: '...' })
```

## WalkThru React component

To display a WalkThru on your site you'll need to use the React component. 

See the [live demo source code](https://github.com/walkthru/next) if you want to see an implementation example using Next.js.

```
npm i -S @walkthru/react
```

Render the component anywhere in your app.

Note that you'll need a way to get the `data` object from the WalkThru data module (see above).

```jsx
import { WalkThru } from '@walkthru/react'

function App () {

  // Logic
  
  return (
    <WalkThru
      data={data}
      slug={slug}
      instructionsStyle={(base) => `
        ${base}
        font-size: 16px;
      `} 
    />
  )
}
```

### Props

- `data`. Returned from `getData`.
- `slug`. The slug of the current tutorial e.g. `my-tutorial`.
- `instructionStyle`. An callback function that allows you to style the instructions section. Return a template string with your desired CSS.

### Tips

- Don't server render this component.
- The step and tutorial slugs will be dynamic segments of the URL. e.g. `https://myapp.com/{tutorial-slug}#{step-slug}`.

## Creating a WalkThru

A WalkThru tutorial consists of multiple steps. Each step contains instructions and a code file and is defined in a separate markdown file. There is also a config file used for tutorial-wide settings.

### Directory structure

First, create a folder `walkthru` in the root of your app. Each tutorial should be in a separate folder e.g. `my-walkthru`.

Inside each tutorial, you'll need a `config.json` file. Each step of the tutorial will be in a separate markdown file e.g. `step1.md`.

```
.
├── walkthru
│   ├── my-walkthru
│       └── config.json
│       └── step1.md
│       └── step2.md
```

### Config file

Here is an example walkthru config file.

```json
{
  "title": "My Tutorial",
  "code": {
    "owner": "myname",
    "repo": "myrepo",
    "ref": "main"
  },
  "steps": [
    "step1",
    "step2"
  ]
}
```

Options:
- `title`. The tutorial title.
- `code`. An object where you declare the GitHub repo and files used.
  - `owner`. Your GitHub account name.
  - `repo`. The repo name.
  - `ref`. The branch, tag, or commit to use.
- `steps`. An array of step name strings. These are the names of the steps you want to include in the tutorial.

### Step files

Each step of the tutorial will be in a separate markdown file, like this:

```markdown
---
title: My step
file: walkthru/my-walkthru/app.jsx
---
# Hello world
```

Frontmatter options:
- `title`. The title of the step (required).
- `file`. The repo file you want to use as the code example.
- `language`. The language of the code example. No need to set this if the language can be determined from the file extension e.g. `js`.
- `focus`. The line or range of lines to focus on e.g. `7`, `7-11`.
- `center`. The line to center the code example on e.g. `9`. Tip: probably you would use the middle line of the focus range.
- `image`
  - `src`. The URL of the image (required if using `image`).
  - `bgColor`. Defaults to `rgb(255,255,255)`.
  - `borderColor`. Defaults to `rgb(229, 231, 235)`.
