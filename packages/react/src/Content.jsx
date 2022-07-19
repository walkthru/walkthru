/** @jsxImportSource @emotion/react */

import { css, jsx, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const styleBase = `
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  overflow: auto;
  p:first-of-type {
    margin-top: 0;
  }
`

function Content ({ html, styles }) {
  const style = typeof styles === 'function' ? css`${styles(styleBase)}` : css`${styleBase}`
  const shadowRootNode = document.querySelector('#shadow-root').shadowRoot
  const myCache = createCache({
    key: 'walkthru-content',
    stylisPlugins: [],
    container: shadowRootNode
  })
  return (
    <CacheProvider value={myCache}>
      <div
        css={style}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </CacheProvider>
  )
}

export default Content
