import styled from 'styled-components'
import {useEffect, useRef, useState} from 'react'

const Wrapper = styled.div`
  max-height: ${({ containerHeight }) => containerHeight}%;
  height: ${({ containerHeight }) => containerHeight}%;
  border-width: 1px;
  border-color: ${({ borderColor }) =>
    borderColor ? borderColor : 'rgb(229, 231, 235)'};
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : 'rgb(255, 255, 255)'};
  border-radius: 0.25rem;
  overflow: auto;
  white-space: nowrap;
  display: flex;
`

const Image = styled.img`
  max-width: initial;
  cursor: ${({ zoom }) => (zoom ? 'zoom-out' : 'zoom-in')};
  height: ${({ imgHeight }) => (imgHeight)}px;
  width: ${({ imgWidth }) => (imgWidth)}px;
`

function WTImage({ containerHeight, step }) {
  const image = step.frontmatter.image
  const [zoom, setZoom] = useState(false)
  const [imgHeight, setImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const ref = useRef()
  useEffect(() => {
    setZoom(false)
  }, [step])
  useEffect(() => {
    const imgNaturalHeight = ref.current.naturalHeight
    const imgNaturalWidth = ref.current.naturalWidth
    if (zoom) {
      setImgHeight(imgNaturalHeight)
      setImgWidth(imgNaturalWidth)
    } else {
      const wrapperHeight = ref.current.parentElement.clientHeight
      const wrapperWidth = ref.current.parentElement.clientWidth
      const heightBasedScale = wrapperHeight / imgNaturalHeight
      const widthBasedScale = wrapperWidth / imgNaturalWidth
      const scale = (heightBasedScale * imgNaturalWidth < wrapperWidth) ? heightBasedScale : widthBasedScale
      setImgHeight(scale * imgNaturalHeight)
      setImgWidth(scale * imgNaturalWidth)
    }
  }, [image, ref, zoom])
  if (!image) {
    return <div />
  }
  return (
    <Wrapper
      containerHeight={containerHeight}
      bgColor={image.bgColor}
      borderColor={image.borderColor}
      onClick={() => setZoom(!zoom)}
    >
      <Image ref={ref} src={image.src} zoom={zoom} imgHeight={imgHeight} imgWidth={imgWidth} />
    </Wrapper>
  )
}

export default WTImage
