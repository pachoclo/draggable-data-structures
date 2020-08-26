import React from 'react'
import { colors } from '@atlaskit/theme'
import styled from 'styled-components'

const ArrayInputStyled = styled.input`
  background-color: transparent;
  font-size: 24px;
  border: 2px solid transparent;
  padding: 3px 6px 8px 6px;
  color: ${colors.T200};
  text-align: center;
  outline: none;

  &:focus,
  &:hover {
    background-color: ${colors.DN70};
    animation: fadein 0.5s;
    border-top: 2px solid ${colors.DN60};
    border-left: 2px solid ${colors.DN60};
    border-right: 2px solid ${colors.DN80};
    border-bottom: 2px solid ${colors.DN80};
  }

  @keyframes fadein {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`

const Error = styled.span`
  color: ${colors.R300};
  margin-left: 16px;
`

interface ArrayInputProps extends React.HTMLProps<HTMLInputElement> {
  errorMessage: string | null
  className?: string
}

const ArrayInput: React.FC<ArrayInputProps> = ({ errorMessage, value, onChange, onKeyUp }) => {
  return (
    <div>
      <ArrayInputStyled value={value} onChange={onChange} onKeyUp={onKeyUp} />
      <Error>{errorMessage}</Error>
    </div>
  )
}

export { ArrayInput }
