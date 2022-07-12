import createCache from '@emotion/cache'
import Select, { NonceProvider } from 'react-select'
import { useState, useEffect } from 'react'

class MyNonceProvider extends NonceProvider {
  createEmotionCache = (nonce) => {
    return createCache({ nonce, container: this.props.container, key: 'react-select' });
  };
}

function WTSelect({ tutorialSlug, stepSlug, steps, title }) {
  function navigate({ value }) {
    if (value) {
      window.location.hash = value
    } else {
      window.location.hash = null
    }
  }
  const [options] = useState([
    {
      label: title,
      options: steps.map((step, index) => ({
        value: step.slug,
        label: `${index + 1}. ${step.frontmatter.title}`,
      })),
    },
  ])
  const [value, setValue] = useState(
    options[0].options.find((o) => o.value === stepSlug)
  )
  useEffect(() => {
    setValue(options[0].options.find((o) => o.value === stepSlug))
  }, [stepSlug, options])
  const selectStyles = {
    fontSize: '14px !important',
    color: 'hsl(0, 0%, 20%)',
  }
  const shadowRootNode = document.querySelector('#shadow-root').shadowRoot
  return (
    <MyNonceProvider container={shadowRootNode}>
      <Select
        value={value}
        onChange={navigate}
        options={options}
        isSearchable={false}
        styles={{
          container: (base) => {
            return {
              ...base,
              ...selectStyles,
              lineHeight: '1rem',
            }
          },
          input: (base) => ({
            ...base,
            ...selectStyles,
            'input:focus': {
              boxShadow: 'none',
              borderColor: 'inherit',
            },
          }),
          control: (base) => ({
            ...base,
            ...selectStyles,
            boxShadow: 'none',
            borderColor: 'inherit',
          }),
          groupHeading: () => {
            return {
              ...selectStyles,
              borderBottom: '1px solid',
              paddingBottom: '0.75rem',
              textTransform: 'none',
              margin: '0 12px 0.75rem 12px',
              fontWeight: 'bold',
            }
          },
        }}
      />
    </MyNonceProvider>
  )
}

export default WTSelect
