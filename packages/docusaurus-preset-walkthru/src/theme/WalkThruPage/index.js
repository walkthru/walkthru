import React from 'react'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { WalkThru } from '@walkthru/react'
import Layout from '@theme/Layout'
import styles from './styles.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function WalkThruPage({ config }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles['page-wrapper']}>
      <Layout>
        <main className={styles['content-wrapper']}>
          <div className="container container-fluid">
            <div className="row">
              <div className="col">
                <ErrorBoundary fallback={({ error, tryAgain }) => (
                  <div>
                    <p>This component crashed because of error: {error.message}.</p>
                    <button onClick={tryAgain}>Try Again!</button>
                  </div>
                )}>
                  <BrowserOnly>
                    {() =>
                      <div className={styles['wrapper']}>
                        <WalkThru
                          {...config}
                          instructionsStyle={(base) => `
                            ${base}
                            font-size: 16px;
                          `}
                        />
                      </div>
                    }
                  </BrowserOnly>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}
