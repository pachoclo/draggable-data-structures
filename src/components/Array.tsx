import React, { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { ArrayBoard } from './ArrayBoard'
import { Pointer } from './Pointer'
import { ArrayInput } from './ArrayInput'
import { ArrayItemType } from './types'

const ENTER_KEY_CODE = 13

const defaultArray = [1, -2, 3, -4, 5, -6]

interface ArrayProps {}

const ArrayComponent: React.FC<ArrayProps> = () => {
  const [items, setItems] = useState(initItemsFromArray(defaultArray))
  const [arrayInput, setArrayInput] = useState(stringifyArray(defaultArray))
  const [inputError, setInputError] = useState<string | null>(null)

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) {
      return
    }
    const itemsCopy = [...items]
    moveItem(itemsCopy, destination.index, source.index)
    setItems(itemsCopy)
    setArrayInput(arrayInputFromItems(itemsCopy))
  }

  const handleInputChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    setArrayInput(currentTarget.value.trim())
  }

  const handleInputKeyUp = ({
    currentTarget,
    keyCode,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyCode === ENTER_KEY_CODE) {
      try {
        let newArray = JSON.parse(currentTarget.value.trim())
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
        value={arrayInput}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        errorMessage={inputError}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="horizontal" droppableId={'1'}>
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

function initItemsFromArray(array: (string | number)[]): ArrayItemType[] {
  return array.map((value, idx) => ({ id: `${idx}`, value }))
}

function getArrayFromItems(items: ArrayItemType[]) {
  return items.map((item) => item.value)
}

// function swapElements(array, idxOne, idxTwo) {
//   let temp = array[idxOne]
//   array[idxOne] = array[idxTwo]
//   array[idxTwo] = temp
// }

function moveItem(items: ArrayItemType[], toIdx: number, fromIdx: number) {
  items.splice(toIdx, 0, items.splice(fromIdx, 1)[0])
}

function stringifyArray(array: (string | number)[]) {
  return JSON.stringify(array, null, 2)
}

function arrayInputFromItems(items: ArrayItemType[]) {
  return stringifyArray(getArrayFromItems(items))
}

export { ArrayComponent as Array }
