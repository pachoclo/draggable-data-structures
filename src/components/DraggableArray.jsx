import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'
import { ArrayItem } from './ArrayItem'

const Wrapper = styled.div`
  border-left: 4px solid ${colors.P200};
  border-bottom: 4px solid ${colors.P200};
  border-top: 4px solid ${colors.P200};
  display: flex;
  flex-direction: column;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: 40px 0;
`

const DropZone = styled.div`
  display: flex;
  align-items: start;
`

const ScrollContainer = styled.div`
  overflow: auto;
`

const Container = styled.div`
  flex-grow: 1;
  display: inline-flex;
  position: relative;
  min-width: 60px;
  min-height: 60px;
`

const ContainerBG = styled.div`
  position: absolute;
  top: 0px;
  left: ${({ index }) =>
    60 * (1 + index) + index * 4}px; /* TODO: why is this so contrived?*/
  z-index: 0;
  width: 4px;
  height: 60px;
  background-color: ${colors.P200};
`

const DraggableArray = ({
  isCombineEnabled = false,
  listId = 0,
  listType,
  internalScroll,
  array = [],
}) => {
  const [items, setItems] = useState(initItemsFromArray(array))
  const [currentArray, setCurrentArray] = useState(getArrayFromItems(items))

  const renderBoard = (dropProvided) => (
    <Container>
      {items.map((_, idx) => (
        <ContainerBG key={idx} index={idx} />
      ))}
      
      <DropZone ref={dropProvided.innerRef}>
        {items.map((element, index) => (
          <Draggable key={element.id} draggableId={element.id} index={index}>
            {(dragProvided, dragSnapshot) => (
              <ArrayItem
                author={element}
                provided={dragProvided}
                snapshot={dragSnapshot}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  )

  const onDragEnd = (result) => {
    if (!result.destination) {
      // TODO: dropping it out of the array container -> don't do anything for now.
      return
    }
    if (result.destination.index === result.source.index) {
      // TODO: dropping it at the same place -> don't do anything for now.
      return
    }

    const elementsCopy = items
    swapElements(elementsCopy, result.source.index, result.destination.index)
    setItems(elementsCopy)
    setCurrentArray(getArrayFromItems(items))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type={listType}
        direction="horizontal"
        isCombineEnabled={isCombineEnabled}
        droppableId={listId.toString()}
      >
        {(dropProvided, dropSnapshot) => (
          <Wrapper
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <ScrollContainer>{renderBoard(dropProvided)}</ScrollContainer>
            ) : (
              renderBoard(dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
      <div>{JSON.stringify(currentArray, null, 2)}</div>
    </DragDropContext>
  )
}

function initItemsFromArray(array) {
  return array.map((value, idx) => ({ id: `${idx}`, value }))
}

function getArrayFromItems(elements) {
  return elements.map((element) => element.value)
}

function swapElements(array, idxOne, idxTwo) {
  let temp = array[idxOne]
  array[idxOne] = array[idxTwo]
  array[idxTwo] = temp
}

export { DraggableArray }
