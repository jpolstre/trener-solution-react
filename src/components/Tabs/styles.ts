import styled from 'styled-components';

export const Container = styled.footer`
  grid-area: FO;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--secondary);
  
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0.3),hsla(0,0%,100%,0) 50%,rgba(0,0,0,0.12) 51%,rgba(0,0,0,0.04))!important;
  
  color: var(--text-white);
  
`;

export const Tab = styled.div`
  height: 100%;
  text-align: center;
  line-height: 55px;
  background-color: var(--tertiary);

  opacity: 0.5;


  padding: 0px 25px;

  min-width:50%;
  cursor: pointer;

  border-top: 1px solid transparent;


  transition: all 0.2s ease-in-out;
  
 
  &.active{
    background-color: var(--active);
    border-top: 1px solid black;

  }
`
