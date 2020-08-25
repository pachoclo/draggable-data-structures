import { colors } from '@atlaskit/theme'
import styled from 'styled-components'

const ArrayInput = styled.input`
  background-color: transparent;
  font-size: 24px;
  border: none;
  padding: 2px 4px 4px 4px;
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

export { ArrayInput }
