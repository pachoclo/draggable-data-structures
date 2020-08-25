import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ArrayBoard } from './ArrayBoard'
import { Pointer } from './Pointer'
import { ArrayInput } from './ArrayInput'

const ENTER_KEY_CODE = 13

const defaultArray = [1, -2, 3, -4, 5, -6]

const ArrayComponent = ({ listType }) => {
  const [items, setItems] = useState(initItemsFromArray(defaultArray))
  const [arrayInput, setArrayInput] = useState(stringifyArray(defaultArray))
  const [inputError, setInputError] = useState(null)

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
      return
    }
    const itemsCopy = [...items]
    moveItem(itemsCopy, destination.index, source.index)
    setItems(itemsCopy)
    setArrayInput(arrayInputFromItems(itemsCopy))
  }

  const handleInputChange = ({ target }) => {
    setArrayInput(target.value.trim())
  }

  const handleInputKeyUp = ({ target, keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) {
      try {
        let newArray = JSON.parse(target.value.trim())
        if (Array.isArray(newArray)) setItems(initItemsFromArray(newArray))
        setInputError(null)
      } catch (e) {
        console.error(e)
        setInputError('Invalid array -_-')
      }
    }
  }

  return (
    <>
      <ArrayInput
        type="text"
        value={arrayInput}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        errorMessage={inputError}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable type={listType} direction="horizontal" droppableId={'1'}>
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

function initItemsFromArray(array) {
  return array.map((value, idx) => ({ id: `${idx}`, value }))
}

function getArrayFromItems(elements) {
  return elements.map((element) => element.value)
}

// function swapElements(array, idxOne, idxTwo) {
//   let temp = array[idxOne]
//   array[idxOne] = array[idxTwo]
//   array[idxTwo] = temp
// }

function moveItem(array, toIdx, fromIdx) {
  array.splice(toIdx, 0, array.splice(fromIdx, 1)[0])
}

function stringifyArray(array) {
  return JSON.stringify(array, null, 2)
}

function arrayInputFromItems(items) {
  return stringifyArray(getArrayFromItems(items))
}

export { ArrayComponent as Array }
