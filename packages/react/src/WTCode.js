import { useEffect, useRef, useState } from 'react'
import { animateScroll } from 'react-scroll'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from './okaidia'
import styled from 'styled-components'
import WTFileBar from './WTFileBar'

const Pre = styled.pre`
  overflow-y: auto;
  margin: 0;
  padding: 0;
  border-radius: 0.25rem;
`

const Code = styled.code`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  line-height: 1.8;
  font-size: 13px;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
`

const LineNumbers = styled.div`
  flex-shrink: 0;
`

const Lines = styled.div`
  flex-grow: 1;
  overflow: auto;
  ::-webkit-scrollbar { display: none; }
`

const Highlightable = styled.div`
  opacity: ${(props) => (props.highlighted ? '1;' : '0.5;')}
  -webkit-transition: opacity 100ms linear;
  -ms-transition: opacity 100ms linear;
  transition: opacity 100ms linear;
  ${Pre}:active & {
    opacity: ${(props) => (props.highlighted ? '1;' : '0.8;')}
  }
  ${Pre}.no-highlight & {
    opacity: 1;
  }
  ${Pre}:hover & {
    opacity: ${(props) => (props.highlighted ? '1;' : '0.8;')}
  }
`

const LineNumber = styled(Highlightable)`
  display: inline-flex;
  justify-content: center;
  width: 3.5rem;
  flex-shrink: 0;
`

const Line = styled(Highlightable)`
  display: flex;
  background-color: ${(props) =>
    props.highlighted ? '#100d0b;' : 'rgb(28 25 23);'};
`

const LineContent = styled.div`
  white-space: ${(props) => (props.wrap ? 'pre-wrap;' : 'pre;')}
  word-break: ${(props) => (props.wrap ? 'break-word;' : 'normal;')}
`

const Token = styled(Highlightable)`
  display: inline-block;
`

function getHighlightedLines(focus) {
  if (focus.length === 0) {
    return
  }
  return focus.split(',').reduce((acc, cur) => {
    const range = cur.split('-')
    if (range.length === 1) {
      acc.push(parseInt(cur))
    } else {
      for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
        acc.push(i)
      }
    }
    return acc
  }, [])
}

function scrollNewCenter(center, el) {
  const codeEl = el.firstChild
  const count = codeEl.querySelectorAll('.__line-no').length
  if (count > 1) {
    const lineHeight = codeEl.offsetHeight / count
    const scrollPos = lineHeight * center - el.offsetHeight / 2
    animateScroll.scrollTo(scrollPos, {
      containerId: 'scrollContainer',
      duration: 500,
    })
  }
}

function WTCode({ files, step, sameFile, config }) {
  const { focus, language, center } = step.frontmatter
  const ref = useRef()
  const active = step.frontmatter.file
  const [content, setContent] = useState('')
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const file = files.find((file) => file.path === active)
  const [activeFile, setActiveFile] = useState(file)
  const highlightedLines = focus ? getHighlightedLines(focus.toString()) : []
  useEffect(() => {
    const file = files.find((file) => file.path === active)
    setActiveFile(file)
  }, [files, step, active])
  useEffect(() => {
    let scrollPos = 0
    if (sameFile) {
      animateScroll.scrollTo(prevScrollPos, {
        containerId: 'scrollContainer',
        duration: 0,
      })
      scrollPos = ref.current.scrollTop
    }
    scrollNewCenter(center, ref.current)
    setPrevScrollPos(scrollPos)
  }, [content, center, prevScrollPos, sameFile])
  useEffect(() => {
    ref.current.scrollTo(0, 0)
  }, [])
  return (
    <>
      <WTFileBar files={files} activeFile={activeFile} config={config} />
      <Highlight
        {...defaultProps}
        theme={theme}
        code={activeFile.content}
        language={language || activeFile.path.split('.').pop()}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          return (
            <Pre
              ref={ref}
              className={`${className} ${
                highlightedLines.length ? '' : 'no-highlight'
              }`}
              id="scrollContainer"
            >
              <Code>
                <LineNumbers>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i })
                    if (highlightedLines.indexOf(i + 1) > -1) {
                      lineProps.highlighted = true
                    }
                    return (
                      <div
                        style={lineProps.style}
                        key={`number-wrapper-${i.toString()}`}
                      >
                        <LineNumber
                          highlighted={lineProps.highlighted}
                          className="__line-no"
                          key={`number-${i.toString()}`}
                        >
                          {i + 1}
                        </LineNumber>
                      </div>
                    )
                  })}
                </LineNumbers>
                <Lines>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i })
                    if (highlightedLines.indexOf(i + 1) > -1) {
                      lineProps.highlighted = true
                    }
                    return (
                      <Line {...lineProps} key={i.toString()}>
                        <LineContent key={`content-${i.toString()}`}>
                          {line.map((token, key) => {
                            const tokenProps = getTokenProps({ token, key })
                            if (highlightedLines.indexOf(i + 1) > -1) {
                              tokenProps.highlighted = true
                            }
                            return <Token {...tokenProps} key={`${i}-${key}`} />
                          })}
                        </LineContent>
                      </Line>
                    )
                  })}
                </Lines>
              </Code>
            </Pre>
          )
        }}
      </Highlight>
    </>
  )
}

export default WTCode
