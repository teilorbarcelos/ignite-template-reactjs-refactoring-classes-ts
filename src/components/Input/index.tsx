import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input({ name, ...rest }: Props) {
  const inputRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState<React.SetStateAction<boolean>>(false)

  const { fieldName, defaultValue, registerField } = useField(name)

  async function handleInputBlur() {
    setIsFocused(false)

    setIsFilled(!!inputRef.current)
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>

      <input
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}