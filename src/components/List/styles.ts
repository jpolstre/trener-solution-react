import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */

  margin-bottom: 20px;
  

  min-width: 100%;
  height: 100%;

  > ul {
    list-style: none;
    min-width: 90%;
  }

  &:last-child{
    margin-bottom: 0;
  }
`;


export const Caption = styled.h3`
  margin-bottom: 6px;
`
