import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-left: 4px;
  margin-top: -25px;
  /* border: 1px solid ${colors.T200}; */
`

const ArrowUp = styled.div`
  border: solid ${colors.T200};
  border-width: 0 7px 7px 0;
  display: inline-block;
  padding: 5px;
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
