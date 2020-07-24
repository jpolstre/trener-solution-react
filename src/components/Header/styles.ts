import styled from 'styled-components';

import { Palette, ChevronLeft } from '@styled-icons/material'

export const Container = styled.header`
  grid-area: HE;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--secondary);

  /**glossy */
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0.3),hsla(0,0%,100%,0) 50%,rgba(0,0,0,0.12) 51%,rgba(0,0,0,0.04))!important;

  color: var(--text-white);
`;

export const Button = styled.button`
  border-radius: 50%;
  
  cursor: pointer;
`;

export const IconToggleTheme = styled(Palette)`
  width: 24px;
  height: 24px;
`;



export const IconBack = styled(ChevronLeft)`
  width: 24px;
  height: 24px;
`;

export const BackButton =  styled.button`
  padding:5px 10px;
    margin-right: 30px;

  background-color: var(--primary);
  /**glossy */
  background-image: linear-gradient(180deg,hsla(0,0%,100%,0.3),hsla(0,0%,100%,0) 50%,rgba(0,0,0,0.12) 51%,rgba(0,0,0,0.04))!important;

  border-radius: 25px 8px 8px 25px;

  box-shadow: 0 0 2px 0.1px white;
  /* border-bottom-right-radius: 16px; */
  /* border-top-right-radius: 16px; */

  /* border-bottom-left-radius: 55px 45px; */
  /* border-top-left-radius: 55px 45px; */

  font-weight: 700;

  cursor: pointer;
`
