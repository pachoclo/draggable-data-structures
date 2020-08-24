import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'
import constants from './constants'

const Container = styled.div`
  width: ${constants.array.height}px;
  height: ${constants.array.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: ${constants.array.gap}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `1px 1px 15px black` : 'none'};
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 65%;
  background-color: ${colors.P300};
  border-radius: 50%;
  border-color: ${({ isDragging }) =>
    isDragging ? colors.Y200 : 'transparent'};
  border-style: solid;
  border-width: 10px;
  font-size: 36px;
  font-weight: 700;
`

const ArrayItem = ({ item, provided, snapshot }) => {
  return (
    <Container
      ref={(ref) => provided.innerRef(ref)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Item isDragging={snapshot.isDragging}>{item?.value}</Item>
    </Container>
  )
}

export { ArrayItem }
