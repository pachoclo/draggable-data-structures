import { colors } from '@atlaskit/theme'
import React from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import styled from 'styled-components'
import constants from './constants'
import { ArrayItemType } from './types'

const Item = styled.div<{ isDragging: boolean; variant: string }>`
  align-items: center;
  background-color: ${colors.P300};
  border-color: ${({ isDragging }) => (isDragging ? colors.Y200 : 'transparent')};
  border-radius: ${({ variant }) => (variant === 'square' ? 'none' : '50%')};
  border-style: solid;
  border-width: ${constants.array.gap - 2}px;
  box-shadow: ${({ isDragging }) => (isDragging ? `1px 1px 25px black` : 'none')};
  display: flex;
  font-size: 30px;
  font-weight: 700;
  height: ${constants.array.height - (constants.array.gap - 2) * 2}px;
  justify-content: center;
  user-select: none;
  width: ${constants.array.height - (constants.array.gap - 2) * 2}px;

  &:not(:first-child) {
    margin-left: ${constants.array.gap}px;
  }
`

interface ArrayItemProps {
  item: ArrayItemType
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  variant?: 'square' | 'circle'
}

const ArrayItem: React.FC<ArrayItemProps> = ({ item, provided, snapshot, variant = 'square' }) => (
  <Item
    isDragging={snapshot.isDragging}
    variant={variant}
    ref={(ref) => provided.innerRef(ref)}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    {item?.value}
  </Item>
)

export { ArrayItem }
