import styled from 'styled-components';

import { ChevronRight } from '@styled-icons/material'

export const Li = styled.li`

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px;
  border: 1px solid  var(--gray);
  border-bottom: none;
  /* border-radius: 15px; */

  font-size: 1.1rem;

  width: 100%;
  min-height: 60px;

  &:first-child{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

  }

  &:last-child {
    border-bottom: 1px solid  var(--gray);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  background-color: var(--white);

  @media (max-width: 680px){
    font-size: 0.9rem;
  }
  
`;

export const IconArrowRight = styled(ChevronRight)`
  width: 24px;
  height: 24px;
`

export const Anchor = styled.a`
 /* text-decoration:underline;
 font-style:italic; */

user-select: none;
 font-weight: 500;

 cursor:pointer;
 color: var(--link);
`
