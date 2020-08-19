import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'
import { ArrayItem } from './ArrayElement'

const items = [20, 3, 4, 5, 7]

const initElements = (items) =>
  items.map((value, idx) => ({ id: `${idx}`, value }))

const Wrapper = styled.div`
  border-left: 8px solid ${colors.P200};
  border-bottom: 8px solid ${colors.P200};
  border-top: 8px solid ${colors.P200};
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.T75 : colors.B50};
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
  left: ${({ index }) => 60 * (1 + index) + index * 8}px;
  z-index: 0;
  width: 8px;
  height: 60px;
  background-color: ${colors.P200};
`

const DraggableArray = ({
  isCombineEnabled = false,
  listId = 0,
  listType,
  internalScroll,
}) => {
  const [elements, setElements] = useState(initElements(items))
  const [currentArray, setCurrentArray] = useState(
    getArrayFromElements(elements)
  )

  const renderBoard = (dropProvided) => {
    return (
      <Container>
        {elements.map((_, idx) => (
          <ContainerBG key={idx} index={idx} />
        ))}

        <DropZone ref={dropProvided.innerRef}>
          {elements.map((element, index) => (
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
  }

  const onDragEnd = (result /* DropResult */) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const elementsCopy = elements
    swapElements(elementsCopy, result.source.index, result.destination.index)
    setElements(elementsCopy)
    setCurrentArray(getArrayFromElements(elements))
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

function getArrayFromElements(elements) {
  return elements.map((element) => element.value)
}

function swapElements(array, idxOne, idxTwo) {
  let temp = array[idxOne]
  array[idxOne] = array[idxTwo]
  array[idxTwo] = temp
}

export { DraggableArray }
