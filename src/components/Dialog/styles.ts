import styled, { keyframes } from 'styled-components'
import { IButton, ETheme } from '.'


export const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: .5;

`;


export const ModalWrapperStyled = styled.div`
  display: inline-table;
  position: fixed;
  top: 0;
  left: 50%;

  padding: .5rem;
 

	transform: translate(-50%);
  z-index: 1050;

  width: 50%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: auto;

  outline: 0;
  border-radius: .3rem;

  @media (max-width: 680px) {
    width: 100%;
  }

`;



const fadeIn = keyframes` {
  from {
    opacity: 0;
    transform: translate3d(0, 30%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`

export const ModalStyled = styled.div`

  z-index: 100;
  background: white;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  pointer-events: none;

  border-radius: .3rem;


  animation-duration: .5s;
  animation-fill-mode: both;
  animation-name: ${fadeIn};
`;



export const ModalContendStyled = styled.div`
  pointer-events: auto;
`;

export const ModalHeaderStyled = styled.div`

  display: flex;
  align-items: flex-start;
  padding:  1rem;

  border-top-right-radius: .3rem;
  border-top-left-radius: .3rem;

  background-color: var(--secondary);
  color: var(--white);

	background-image: linear-gradient(
		180deg,
		hsla(0, 0%, 100%, 0.3),
		hsla(0, 0%, 100%, 0) 50%,
		rgba(0, 0, 0, 0.12) 51%,
		rgba(0, 0, 0, 0.04)
	) !important;

`;

export const ModalCloseButtonStyled = styled.div`

  padding: 1rem;
  background: transparent;
  margin: -1rem -1rem -1rem auto;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: var(--white);
  opacity: .3;
  cursor: pointer;
  border: none;
  outline: 0 !important;

  &:hover{
    opacity: .8;
    text-decoration: none;
  }
`;

export const ModalBodyStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: .3rem;
  min-height: 50vh;
`;

export const ModalFooterStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  border-bottom-right-radius: .3rem;
  border-bottom-left-radius: .3rem;

  padding:  .5rem 1rem;

  
  background-color: var(--secondary);
  color: var(--white);
	background-image: linear-gradient(
		180deg,
		hsla(0, 0%, 100%, 0.3),
		hsla(0, 0%, 100%, 0) 50%,
		rgba(0, 0, 0, 0.12) 51%,
		rgba(0, 0, 0, 0.04)
	) !important;
`;



export const ButtonStyled = styled.button<IButton>`
	padding: 10px 15px !important;

  border-radius: 4px;
  margin-left: 8px;

  cursor: pointer;
  background-color: ${(props) => props.color}!important;
  color:${(props) => (props.color === ETheme.PRIMARY ? 'var(--white)' : 'var(--black)')}!important;

  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.19);

  background-image: ${(props) =>
    props.glossy !== undefined
      ? 'linear-gradient(180deg,hsla(0,0%,100%,0.3),hsla(0,0%,100%,0) 50%,rgba(0,0,0,0.12) 51%,rgba(0,0,0,0.04))!important;'
      : null};

  opacity: 1;
  
  &:hover{
    opacity: 0.9;
    background: currentColor;
  }
`


