import React from 'react'
import styled from 'styled-components'
import { colors } from '@atlaskit/theme'
import constants from './constants'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 116px;
`

const ArrowUp = styled.div`
  border: solid ${colors.T200};
  border-width: 0 ${constants.array.gap * 1.2}px ${constants.array.gap * 1.2}px 0;
  padding: ${constants.array.gap - 2}px;
  transform: rotate(-135deg);
  grid-area: 1 / 1;
`

const Pointer = () => {
  return (
    <Wrapper>
      <ArrowUp />
    </Wrapper>
  )
}

export { Pointer }
