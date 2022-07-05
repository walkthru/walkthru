import styled from 'styled-components'
import WTCode from './WTCode'

const CodeWrapper = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgb(28 25 23 / var(--tw-bg-opacity));
  border-radius: 0.25rem;
  flex-direction: column;
  width: 100%;
  display: flex;
  position: relative;
  height: ${(props) => props.height}%;
  overflow: hidden;
`

function WTCodeWrapper(props) {
  if (!props.height) {
    return <CodeWrapper />
  }
  return (
    <CodeWrapper height={props.height}>
      <WTCode {...props} />
    </CodeWrapper>
  )
}

export default WTCodeWrapper
