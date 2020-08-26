import { colors } from '@atlaskit/theme'
import React from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import styled from 'styled-components'
import constants from './constants'
import { ArrayItemType } from './types'

const Container = styled.div`
  width: ${constants.array.height}px;
  height: ${constants.array.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: ${constants.array.gap}px;
`

const Item = styled.div<{ isDragging: boolean }>`
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
  box-shadow: ${({ isDragging }) =>
    isDragging ? `1px 1px 15px black` : 'none'};
`

interface ArrayItemProps {
  item: ArrayItemType
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
}

const ArrayItem: React.FC<ArrayItemProps> = ({ item, provided, snapshot }) => {
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
