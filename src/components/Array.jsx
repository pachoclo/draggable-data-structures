import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ArrayBoard } from './ArrayBoard'
import { Pointer } from './Pointer'
import styled from '@emotion/styled'
import { colors } from '@atlaskit/theme'

const ENTER_KEY_CODE = 13

const Input = styled.input`
  background-color: transparent;
  font-size: 16px;
  border: none;
  padding: 2px 4px 4px 4px;
  color: ${colors.T200};
  text-align: center;
  

  &:focus,
  &:hover {
    background-color: ${colors.P50};
    color: ${colors.P500};
    animation: fadein  .5s;
  }

  @keyframes fadein {
    from { opacity: 0.5; }
    to   { opacity: 1; }
  }
`

const ArrayComponent = ({
  isCombineEnabled = false,
  listId = 0,
  listType,
  array = [],
}) => {
  const [items, setItems] = useState(helpers.initItemsFromArray(array))
  const [arrayInput, setArrayInput] = useState(helpers.stringifyArray(array))

  const onDragEnd = (result) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return
    }
    const elementsCopy = items
    helpers.swapElements(
      elementsCopy,
      result.source.index,
      result.destination.index
    )
    setItems(elementsCopy)
    setArrayInput(helpers.arrayInputFromItems(items))
  }

  const handleInputChange = ({ target }) => {
    setArrayInput(target.value.trim())
  }

  const handleKeyUp = ({ target, keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) {
      try {
        let newArray = JSON.parse(target.value.trim())
        if (Array.isArray(newArray))
          setItems(helpers.initItemsFromArray(newArray))
      } catch (e) {
        console.error(e.message)
      }
    }
  }

  return (
    <>
      <Input
        type="text"
        value={arrayInput}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          type={listType}
          direction="horizontal"
          droppableId={listId.toString()}
        >
          {(dropProvided, dropSnapshot) => (
            <ArrayBoard
              items={items}
              dropProvided={dropProvided}
              dropSnapshot={dropSnapshot}
            />
          )}
        </Droppable>
      </DragDropContext>

      <Pointer />
    </>
  )
}

const helpers = {
  initItemsFromArray(array) {
    return array.map((value, idx) => ({ id: `${idx}`, value }))
  },

  getArrayFromItems(elements) {
    return elements.map((element) => element.value)
  },

  swapElements(array, idxOne, idxTwo) {
    let temp = array[idxOne]
    array[idxOne] = array[idxTwo]
    array[idxTwo] = temp
  },

  stringifyArray(array) {
    return JSON.stringify(array, null, 2)
  },

  arrayInputFromItems(items) {
    return this.stringifyArray(this.getArrayFromItems(items))
  },
}

export { ArrayComponent as Array }
