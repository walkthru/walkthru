import docusaurusPluginWalkThru from './docusaurusPluginWalkThru'
import docusaurusThemeWalkThru from './docusaurusThemeWalkThru'

function docusaurusPresetWalkThru(context, options = {}) {
  return {
    themes: [
      async () => docusaurusThemeWalkThru(context, options)
    ],
    plugins: [
      async () => docusaurusPluginWalkThru(context, options)
    ],
  }
}

export default docusaurusPresetWalkThru
