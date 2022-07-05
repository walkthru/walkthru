import styled from 'styled-components'

const Wrapper = styled.div`
  max-height: ${(props) => props.height}%;
  display: inline-block;
  border-width: 1px;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : 'rgb(229, 231, 235)'};
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'rgb(255, 255, 255)'};
  background-image: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

/*
 * This image element is invisible (opacity 0). It's used as a hack for getting the height correct.
 */
const Image = styled.img`
  height: 100%;
  opacity: 0;
  margin: 0 auto;
`

function WTImage({ height, image }) {
  if (!image) {
    return <div />
  }
  return (
    <Wrapper
      height={height}
      bgColor={image.bgColor}
      borderColor={image.borderColor}
      src={image.src}
    >
      <Image src={image.src} />
    </Wrapper>
  )
}

export default WTImage
