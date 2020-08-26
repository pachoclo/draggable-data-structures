import React from 'react'
import { colors } from '@atlaskit/theme'
import styled from 'styled-components'

const ArrayInputStyled = styled.input`
  background-color: transparent;
  font-size: 24px;
  border: none;
  padding: 2px 4px 6px 4px;
  color: ${colors.T200};
  text-align: center;

  &:focus,
  &:hover {
    background-color: ${colors.P50};
    color: ${colors.P500};
    animation: fadein 0.5s;
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

const ArrayInput: React.FC<ArrayInputProps> = ({
  errorMessage,
  value,
  onChange,
  onKeyUp,
}) => {
  return (
    <div>
      <ArrayInputStyled value={value} onChange={onChange} onKeyUp={onKeyUp} />
      <Error>{errorMessage}</Error>
    </div>
  )
}

export { ArrayInput }
