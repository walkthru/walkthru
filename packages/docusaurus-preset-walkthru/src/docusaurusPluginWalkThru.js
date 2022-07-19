import { getData } from '@walkthru/data'
const path = require('path')

const docusaurusPluginWalkThru = async function (context, options) {
  return {
    name: 'docusaurus-plugin-walkthru',
    async loadContent() {
      return await getData({ githubToken: options.githubToken })
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute, setGlobalData } = actions
      const tutorials = content.map((item) => ({
        path: `/${options.path}/${item.slug}`,
        title: item.data.config.title,
        order: item.data.config.order,
      }))
      setGlobalData({ tutorials })
      for await (const item of content) {
        const { slug } = item
        const dataJsonPath = await createData(
          `${slug}.json`,
          JSON.stringify(item)
        )
        addRoute({
          path: `/${options.path}/${slug}`,
          component: '@theme/WalkThruPage',
          modules: {
            config: dataJsonPath,
          },
          exact: true,
        })
      }
    },
    configureWebpack(config, isServer, utils) {
      const nm = path.resolve(context.siteDir, 'node_modules')
      return {
        resolve: {
          alias: {
            react: path.resolve(nm, 'react'),
            'react-dom': path.resolve(nm, 'react-dom'),
          },
        },
      }
    },
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, 'walkthru')
      return [`${contentPath}/**/*.{md,json}`]
    },
    /* other lifecycle API */
  }
}

export default docusaurusPluginWalkThru
