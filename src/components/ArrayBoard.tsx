import { colors } from '@atlaskit/theme'
import React from 'react'
import styled from 'styled-components'
import constants from './constants'

const DropZone = styled.div`
  display: flex;
  border: ${constants.array.gap}px solid ${colors.P200};
  display: flex;
  margin-top: 20px;
  padding: ${constants.array.gap}px;
`

interface ArrayBoardProps {
  droppableRef: (element: HTMLElement | null) => any
}

const ArrayBoard: React.FC<ArrayBoardProps> = ({ droppableRef, children }) => (
  <DropZone ref={droppableRef}>{children}</DropZone>
)

export { ArrayBoard }
