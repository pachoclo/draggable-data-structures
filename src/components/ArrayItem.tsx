import { colors } from "@atlaskit/theme"
import React from "react"
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd"
import styled from "styled-components"
import constants from "./constants"
import { ArrayItemType } from "./types"

const Container = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  height: ${constants.array.height}px;
  justify-content: center;
  width: ${constants.array.height}px;
`

const Item = styled.div<{ isDragging: boolean }>`
  align-items: center;
  background-color: ${colors.P300};
  border-color: ${({ isDragging }) => (isDragging ? colors.Y200 : "transparent")};
  border-radius: 50%;
  border-style: solid;
  border-width: 10px;
  box-shadow: ${({ isDragging }) => (isDragging ? `1px 1px 15px black` : "none")};
  display: flex;
  font-size: 36px;
  font-weight: 700;
  height: 65%;
  justify-content: center;
  user-select: none;
  width: 65%;
`

interface ArrayItemProps {
  item: ArrayItemType
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
}

const ArrayItem: React.FC<ArrayItemProps> = ({ item, provided, snapshot }) => {
  return (
    <Container
      ref={(ref) => provided.innerRef(ref)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Item isDragging={snapshot.isDragging}>{item?.value}</Item>
    </Container>
  )
}

export { ArrayItem }
