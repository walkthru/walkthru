import { useState } from 'react'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import MarkdownIt from 'markdown-it'
import Content from './Content.jsx'

const md = new MarkdownIt()
// Remember old renderer, if overridden, or proxy to default renderer
var defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  justify-content: flex-start;
  display: flex;
`

const Button = styled.button`
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgb(245 158 11 / var(--tw-bg-opacity));
  border-radius: 0.25rem;
  display: flex;
  gap: 0.25rem;
  border: none;
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    & > * + * {
      margin-left: 0.25rem;
    }
  }
`

const ContentWrapper = styled.div`
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Wrapper = styled.div`
  min-height: 0;
  height: 100%;
`

function RightArrow({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

const RightArrowStyled = styled(RightArrow)`
  height: 1rem;
  width: 1rem;
`

function WTInstructions({ step, nextStepSlug, styles }) {
  function next() {
    window.location.hash = nextStepSlug
  }
  function createHtml(markdown) {
    return md.render(markdown)
  }
  const ref = useRef()
  const [html, setHtml] = useState(createHtml(step.content))
  useEffect(() => {
    ref.current.scrollTo(0, 0)
    setHtml(createHtml(step.content))
  }, [step])
  return (
    <Wrapper>
      <ContentWrapper ref={ref}>
        <Content html={html} styles={styles} />
        <ButtonWrapper>
          {nextStepSlug ? (
            <Button onClick={next}>
              <span>Next step</span>
              <RightArrowStyled />
            </Button>
          ) : (
            <></>
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default WTInstructions
