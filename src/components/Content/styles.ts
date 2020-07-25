import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CO;
  
  display: flex;
  justify-content: center;
  align-items: flex-start;

  overflow-y: scroll;
  scroll-behavior: smooth;

  min-height: calc(100vh - 55px - 55px);
  padding: 20px 20%;
  background-color: var(--primary);


  ::-webkit-scrollbar {
    width: 4px;
    
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--secondary);
  }

  ::-webkit-scrollbar-track {
    background-color: var(--primary);
  }

  @media (max-width: 680px) {
    padding: 20px 20px;
  }
`;
