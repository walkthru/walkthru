import styled from 'styled-components'
import { useState } from 'react'

const DrawerIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="-5 0 24 24"
      fill="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

const DrawerIconStyled = styled(DrawerIcon)`
  height: 1.5rem;
  width: 1.5rem;
  color: white;
  opacity: ${(props) => (props.on ? '1' : '0.6')};
  transform: ${(props) => (props.flipped ? 'scale(-1)' : 'scale(1)')};
`

function DrawerTab({ className, drawerClick }) {
  const [flipped, setFlipped] = useState(false)
  function click() {
    setFlipped(!flipped)
    drawerClick()
  }
  return (
    <div className={className} onClick={click}>
      <DrawerIconStyled flipped={false} on={!flipped} />
      <DrawerIconStyled flipped={true} on={flipped} />
    </div>
  )
}

const DrawerTabStyled = styled(DrawerTab)`
  background-color: rgb(41 37 36);
  border-radius: 10000px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: calc(50% - 1.25rem);
  right 0.75rem;
  z-index: 10;
  @media (max-width: 767px) {
    display: flex;
  }
`

function WTDrawer({ drawerClick }) {
  return <DrawerTabStyled drawerClick={drawerClick} />
}

export default WTDrawer
