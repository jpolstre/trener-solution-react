import styled from 'styled-components'

import { Clear } from '@styled-icons/material'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  height: 50vh;

  min-width: 100%;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
    
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
    /* border-radius: 4px; */
  }

  ::-webkit-scrollbar-track {
    background-color: var(--primary);
  }
`

export const Option = styled.div`
  padding: 15px;
  text-align: center;
  font-weight: 700;
  min-width: 100%;
  color:black;

  user-select: none;

  > span {
    cursor:pointer;
    padding: 15px;
  }

  &.active{
    background-color: var(--focus);
    color: var(--white);

    background-image:linear-gradient(180deg,hsla(0,0%,100%,0.3),hsla(0,0%,100%,0) 50%,rgba(0,0,0,0.12) 51%,rgba(0,0,0,0.04))!important;
  }
`
export const ToolInfoBar = styled.div`
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 0.5px solid var(--gray);

  box-shadow: 0 1px 2px -1px var(--gray);
  
  background-color: var(--white);

`


export const InputFilter = styled.input`
padding: 7px;
border: 1px solid black;
border-radius: 4px;
font-size: 1.1rem;

width: 200px;

`

export const IconClear = styled(Clear)`
  width: 24px;
  height: 24px;
  color: black;
  margin-left: -27px;

  cursor: pointer;
`

