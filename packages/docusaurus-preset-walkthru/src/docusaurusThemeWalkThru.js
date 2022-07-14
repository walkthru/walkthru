const path = require('path')

const docusaurusThemeWalkThru = async function (context, options) {
  return {
    name: 'docusaurus-theme-walkthru',
    getThemePath() {
      return path.resolve(__dirname, 'theme')
    },
  }
}

export default docusaurusThemeWalkThru
