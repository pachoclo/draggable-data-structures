import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'
import { ArrayItem } from './ArrayItem'
import constants from './constants'

const DropZone = styled.div`
  display: flex;
  align-items: start;
`

const Container = styled.div`
  flex-grow: 1;
  display: inline-flex;
  position: relative;
`

const ContainerBG = styled.div`
  position: absolute;
  top: 0px;
  left: ${({ index }) =>
    constants.array.height * (1 + index) +
    index * constants.array.gap}px; /* TODO: why is this so contrived?*/
  z-index: 0;
  width: ${constants.array.gap}px;
  height: ${constants.array.height}px;
  background-color: ${colors.P200};
`

const Wrapper = styled.div`
  border-left: ${constants.array.gap}px solid ${colors.P200};
  border-bottom: ${constants.array.gap}px solid ${colors.P200};
  border-top: ${constants.array.gap}px solid ${colors.P200};
  display: flex;
  flex-direction: column;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: 20px 0;
`

const ArrayBoard = ({ items, dropProvided, dropSnapshot }) => (
  <Wrapper
    isDraggingOver={dropSnapshot.isDraggingOver}
    {...dropProvided.droppableProps}
  >
    <Container>
      {items.map((_, idx) => (
        <ContainerBG key={idx} index={idx} />
      ))}

      <DropZone ref={dropProvided.innerRef}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(dragProvided, dragSnapshot) => (
              <ArrayItem
                item={item}
                provided={dragProvided}
                snapshot={dragSnapshot}
              />
            )}
          </Draggable>
        ))}

        {dropProvided.placeholder}
      </DropZone>
    </Container>
  </Wrapper>
)

export { ArrayBoard }
