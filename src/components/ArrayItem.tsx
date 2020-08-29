import { colors } from '@atlaskit/theme'
import React from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import styled from 'styled-components'
import constants from './constants'
import { ArrayItemType } from './types'
import clsx from 'clsx'

const ArrayItemStyled = styled.div<{ variant: string }>`
  align-items: center;
  background-color: ${colors.P300};
  border-color: transparent;
  border-radius: ${({ variant }) => (variant === 'square' ? 'none' : '50%')};
  border-style: solid;
  border-width: ${constants.array.gap - 2}px;
  display: flex;
  font-size: 30px;
  font-weight: 700;
  height: ${constants.array.height - constants.array.gap * 2}px;
  justify-content: center;
  user-select: none;
  width: ${constants.array.height - constants.array.gap * 2}px;

  &.dragging {
    border-color: ${colors.Y200};
    box-shadow: 1px 1px 25px black;
    background-color: ${colors.P300};
  }

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
  <ArrayItemStyled
    className={clsx({ dragging: snapshot.isDragging })}
    variant={variant}
    ref={(ref) => provided.innerRef(ref)}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    {item?.value}
  </ArrayItemStyled>
)

export { ArrayItem }
