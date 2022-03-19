import styled from 'styled-components'

export const BidContainer = styled.div`
  display: grid; 
  grid-template-columns: 32px 96px;
  grid-template-rows: 48px 32px;
  gap: 4px 0px; 
  height: 68px;
  grid-template-areas: 
    "i1 i2"
    ". i4"; 
`

export const ArrowContainer = styled.div`
grid-area: i1;
align-self: center;
`

export const ArrowUp = styled.button`
  &:after{
    content: '🔼';
    display:inline-block;
    font-size: 16px;
  }
  border: none;
  background-color: unset;
  cursor: pointer;
`

export const ArrowDown = styled.button`
  &:after{
    content: '🔽';
    display:inline-block;
    font-size: 16px;
  }
  border:none;
  background-color: unset;
  cursor: pointer;
`

export const BidValue = styled.div`
grid-area: i2;
background-color: lightblue;
color: black;
height: 48px;
    width: 96px;
    border-radius: 8px;
    text-align: center;
    line-height: 48px;
    font-size: 1.2rem;
`

export const ActionContainer = styled.div`
grid-area: i4;
display: flex;
width: 100%;
height: 100%;
justify-content: space-around;
`

export const ActionAccept = styled.button`
&:after{
    content: '✅';
    display:inline-block;
    font-size: 20px;
  }
  &:hover{
    background-color: darkblue;
  }
    place-self: center;
    height: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 8px 0 0 8px;
    line-height: 24px;
    text-align: left;
    padding-left: 12px;
    border:none;
    background-color: none;
    border-right: 1px solid gray;
    background-color: lightblue;
    cursor: pointer;
`

export const ActionRefuse = styled.button`
&:after{
    content: '🏳️';
    display:inline-block;
    font-size: 20px;
  }
  &:hover{
    background-color: darkblue;
  }
  background-color: lightblue;
    place-self: center;
    height: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 0 8px 8px 0;
    line-height: 24px;
    text-align: right;
    padding-right: 12px;
    border:none;
    background-color: none;
    border-left: 1px solid gray;
    background-color: lightblue;
    cursor: pointer;
`