import styled from 'styled-components'

//HE - header
//CO - Content
//FO - Footer

const Grid = styled.div`
  display: grid;
  
  grid-template-rows: 55px auto  55px;
  grid-template-columns: auto;

  grid-template-areas:
  'HE' 
  'CO' 
  'FO';
  height: 100vh;

 
`;

export default Grid;