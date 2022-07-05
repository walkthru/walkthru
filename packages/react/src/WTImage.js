import styled from 'styled-components'
import {useState} from "react";

const Wrapper = styled.div`
  max-height: ${(props) => props.height}%;
  height: ${(props) => props.height}%;
  border-width: 1px;
  border-color: ${({ borderColor }) => (borderColor ? borderColor : 'rgb(229, 231, 235)')};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'rgb(255, 255, 255)')};
  border-radius: 0.25rem;
  overflow: auto;
  white-space: nowrap;
  display: flex; 
`

const Image = styled.img`
  object-fit: ${({ zoom }) => (zoom ? 'none' : 'contain' )};
  max-width: ${({ zoom }) => (zoom ? 'initial' : '100%' )};
`

function WTImage({ height, image }) {
  const [zoom, setZoom] = useState(false)
  if (!image) {
    return <div />
  }
  return (
    <Wrapper
      height={height}
      bgColor={image.bgColor}
      borderColor={image.borderColor}
      src={image.src}
      onClick={() => setZoom(!zoom)}
    >
      <Image src={image.src} zoom={zoom} />
    </Wrapper>
  )
}

export default WTImage
