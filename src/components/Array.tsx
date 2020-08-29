import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { ArrayBoard } from './ArrayBoard'
import { ArrayInput } from './ArrayInput'
import { ArrayItem } from './ArrayItem'
import { Indices } from './Indices'
import { PointerBoard } from './PointerBoard'
import { ArrayItemType, ArrayType } from './types'

const ENTER_KEY_CODE = 13

const defaultArray: ArrayType = [1, -2, 3, -4, 5, -6]

interface ArrayProps {}

const ArrayComponent: React.FC<ArrayProps> = () => {
  const [items, setItems] = useState<ArrayItemType[]>(initItemsFromArray(defaultArray))
  const [arrayInput, setArrayInput] = useState<string>(stringifyArray(defaultArray))
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

  const handleInputChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    setArrayInput(currentTarget.value.trim())
  }

  const handleInputKeyUp = ({ currentTarget, keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyCode === ENTER_KEY_CODE) {
      try {
        let newArray = JSON.parse(currentTarget.value.trim())
        if (Array.isArray(newArray)) setItems(initItemsFromArray(newArray))
        setInputError(null)
      } catch (err) {
        console.error(err)
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
          {(dropProvided, _) => (
            <ArrayBoard droppableRef={dropProvided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <ArrayItem item={item} provided={dragProvided} snapshot={dragSnapshot} />
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </ArrayBoard>
          )}
        </Droppable>

        <Indices numIndices={items.length} />

        <Droppable direction="horizontal" droppableId={'2'}>
          {(dropProvided, _) => (
            <PointerBoard droppableRef={dropProvided.innerRef} numIndices={items.length} />
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

function initItemsFromArray(array: ArrayType): ArrayItemType[] {
  return array.map((value, idx) => ({ id: `${idx}`, value }))
}

function getArrayFromItems(items: ArrayItemType[]): ArrayType {
  return items.map((item) => item.value)
}

// ! Don't delete, will use later
// function swapElements(array, idxOne, idxTwo) {
//   let temp = array[idxOne]
//   array[idxOne] = array[idxTwo]
//   array[idxTwo] = temp
// }

function moveItem(items: ArrayItemType[], toIdx: number, fromIdx: number) {
  items.splice(toIdx, 0, items.splice(fromIdx, 1)[0])
}

function stringifyArray(array: ArrayType): string {
  return JSON.stringify(array, null, 2)
}

function arrayInputFromItems(items: ArrayItemType[]): string {
  return stringifyArray(getArrayFromItems(items))
}

export { ArrayComponent as Array }
