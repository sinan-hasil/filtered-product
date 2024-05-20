import styled from "styled-components"


const IconButton = ({onClick}) => {

    const DeleteButton = styled.button`
        width: 35px;
        height: 35px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 10px;
    `

  return (
    <DeleteButton onClick={onClick}>SİL</DeleteButton>
  )
}

export default IconButton