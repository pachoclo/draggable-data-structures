import React from 'react'
import styled from 'styled-components'
import { Pointer } from './Pointer'

const PointerBoardStyled = styled.div<{ numColumns: number }>`
  display: grid;
  grid-template-rows: 100px;
  grid-gap: 10px;
  grid-template-columns: repeat(${({ numColumns }) => numColumns}, 116px);
`

const PointerStyled = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 1 / 2;
`

interface PointerBoardProps {
  numIndices: number
  droppableRef: (element: HTMLElement | null) => any
}

const PointerBoard: React.FC<PointerBoardProps> = ({ numIndices, droppableRef, children }) => {
  return (
    <PointerBoardStyled ref={droppableRef} numColumns={numIndices}>
      <PointerStyled>
        <Pointer />
      </PointerStyled>
    </PointerBoardStyled>
  )
}

export { PointerBoard }
