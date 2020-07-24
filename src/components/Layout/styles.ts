import styled from 'styled-components'

//HE - header
//CO - Content
//FO - Footer

const Grid = styled.div`
  display: grid;
  grid-template-rows: 55px auto  55px;
  
  /* grid-template-columns: 90px auto 90px;
  
  grid-template-areas:
  'HE HE HE' 
  'CO CO CO' 
  'FO FO FO'; */

  grid-template-columns: auto;


  grid-template-areas:
  'HE' 
  'CO' 
  'FO';
  height: 100vh;

  /* @media (max-width:320px){
    grid-template-areas:
    'HE' 
    'CO' 
    'FO';
  }

  grid-template-columns:  auto ; */
`;

export default Grid;