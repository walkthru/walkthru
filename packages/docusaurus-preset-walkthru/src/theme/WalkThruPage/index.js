import React from 'react'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { WalkThru } from '@walkthru/react'
import Layout from '@theme/Layout'
import styles from './styles.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Head from '@docusaurus/Head'
import Sidebar from './sidebar'
import { usePluginData } from '@docusaurus/useGlobalData'

export default function WalkThruPage({ config }) {
  const { siteConfig } = useDocusaurusContext()
  const { tutorials } = usePluginData('docusaurus-plugin-walkthru')
  const title = `${config.data.config.title} ${siteConfig.titleDelimiter} ${siteConfig.title}`
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <div className={styles.layout}>
          <Sidebar tutorials={tutorials} />
          <main className={styles['content-wrapper']}>
            <div className="container container-fluid">
              <div className="row">
                <div className="col">
                  <ErrorBoundary
                    fallback={({ error, tryAgain }) => (
                      <div>
                        <p>
                          This component crashed because of error:{' '}
                          {error.message}.
                        </p>
                        <button onClick={tryAgain}>Try Again!</button>
                      </div>
                    )}
                  >
                    <BrowserOnly>
                      {() => (
                        <div className={styles['wrapper']}>
                          <WalkThru
                            {...config}
                            instructionsStyle={(base) => `
                              ${base}
                              font-size: 16px;
                            `}
                          />
                        </div>
                      )}
                    </BrowserOnly>
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  )
}
