import { getData } from "@walkthru/data"
const path = require('path')

const docusaurusPluginWalkThru = async function (context, options) {
  return {
    name: 'docusaurus-plugin-walkthru',
    async loadContent() {
      const data = await getData('walkthru-intro', options.githubToken)
      return [
        {
          stepSlug: 'introduction',
          tutorialSlug: 'walkthru-intro',
          data
        }
      ]
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions
      for await (const item of content) {
        const { tutorialSlug } = item
        const dataJsonPath = await createData(
          'data.json',
          JSON.stringify(item),
        );
        addRoute({
          path: `/${tutorialSlug}`,
          component: '@theme/WalkThruPage',
          modules: {
            config: dataJsonPath,
          },
          exact: true,
        });
      }
    },
    configureWebpack(config, isServer, utils) {
      const nm = path.resolve(context.siteDir, 'node_modules')
      return {
        resolve: {
          alias: {
            react: path.resolve(nm, 'react'),
            'react-dom': path.resolve(nm, 'react-dom')
          }
        }
      }
    },
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, 'walkthru')
      return [`${contentPath}/**/*.{md,json}`]
    },
    /* other lifecycle API */
  };
};

export default docusaurusPluginWalkThru
