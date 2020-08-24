import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'
import constants from './constants'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${constants.array.height}px;
  height: ${constants.array.height}px;
  margin-left: ${constants.array.gap}px;
  margin-top: -25px;
  /* border: 1px solid ${colors.T200}; */
`

const ArrowUp = styled.div`
  border: solid ${colors.T200};
  border-width: 0 ${constants.array.gap * 1.5}px ${constants.array.gap * 1.5}px
    0;
  display: inline-block;
  padding: ${constants.array.gap}px;
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
