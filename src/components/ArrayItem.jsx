import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'

const Container = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right:4px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? `1px 1px 15px black` : 'none'};
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${colors.P300};
  border-radius: 50%;
  border-color: ${({ isDragging }) => (isDragging ? colors.Y200 : 'transparent')};
  border-style: solid;
  border-width: 4px;
  font-size: 22px;
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
