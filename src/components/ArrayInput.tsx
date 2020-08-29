import React from 'react'
import { colors } from '@atlaskit/theme'
import styled from 'styled-components'

const ArrayInputStyled = styled.input`
  background-color: transparent;
  border: 2px solid transparent;
  color: ${colors.T200};
  font-size: 24px;
  outline: none;
  padding: 3px 6px 8px 6px;
  text-align: center;

  &:focus,
  &:hover {
    animation: fadein 0.5s;
    background-color: ${colors.DN70};
    border-bottom: 2px solid ${colors.DN80};
    border-left: 2px solid ${colors.DN60};
    border-right: 2px solid ${colors.DN80};
    border-top: 2px solid ${colors.DN60};
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
