import React from 'react'
import styled from 'styled-components'
import { colors } from '@atlaskit/theme'
import constants from './constants'

interface IndicesProps {
  numIndices: number
}

const IndexContainer = styled.div`
  margin-top: ${constants.array.gap}px;
  border-bottom: 2px solid ${colors.T500};
  border-left: 2px solid ${colors.T500};
  border-right: 2px solid ${colors.T500};
  height: 20px;
  width: 112px;
  text-align: center;
  color: ${colors.T200};
  padding-bottom: 1px;
  font-size: 12px;

  &:not(:first-child) {
    margin-left: ${constants.array.gap}px;
  }
`

const IndicesStyled = styled.div<IndicesProps>`
  /* width: ${({ numIndices }) =>
    numIndices * constants.array.height + (numIndices - 4) * constants.array.gap}px; */
  /* border: 1px solid yellowgreen; */
  display: flex;
`

const Indices: React.FC<IndicesProps> = ({ numIndices }) => {
  return (
    <IndicesStyled numIndices={numIndices}>
      {Array(numIndices)
        .fill(null)
        .map((_, idx) => (
          <IndexContainer key={idx}>{idx}</IndexContainer>
        ))}
    </IndicesStyled>
  )
}

export { Indices }
