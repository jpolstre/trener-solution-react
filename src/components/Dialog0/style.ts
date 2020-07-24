import styled from 'styled-components'

import { Cancel, Check, HighlightOff } from '@styled-icons/material'

import { IButtonAction, ETheme } from '.'

export const Container = styled.div`
	/* position: absolute;
	top: 30%;
	left: 50%;

	transform: translate(-50%, -50%); */
	z-index: 10;

	min-width: 400px;

	background-color: var(--secondary);
	color: var(--white);

	border-radius: 4px;

	opacity: 0;

	transition: all 0.3s ease-in-out;

	&.show {
		opacity: 1;
	}
	&.hide {
		opacity: 0;
	}

	@media (max-width: 680px) {
		min-width: 100%;
	}
`
export const Header = styled.div`
	/**glossy */
	background-image: linear-gradient(
		180deg,
		hsla(0, 0%, 100%, 0.3),
		hsla(0, 0%, 100%, 0) 50%,
		rgba(0, 0, 0, 0.12) 51%,
		rgba(0, 0, 0, 0.04)
	) !important;

	background-color: var(--back);

	display: flex;
	justify-content: space-between;

	padding: 10px 20px;

	user-select: none;
	cursor: move;

	border-radius: 4px;

`

export const Body = styled.div`
	/* padding: 20px 20px; */
	/* margin-left: 5px; */
	background-color: var(--primary);
	/* -webkit-user-drag: none; */

	/* > * {
		-webkit-user-drag: none;
	} */
`

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;

	border-radius: 4px;


	padding: 10px 20px;

	background-image: linear-gradient(
		180deg,
		hsla(0, 0%, 100%, 0.3),
		hsla(0, 0%, 100%, 0) 50%,
		rgba(0, 0, 0, 0.12) 51%,
		rgba(0, 0, 0, 0.04)
	) !important;

	background-color: var(--secondary);
	/* > button {
		padding: 5px 10px;
		border-radius: 4px;

		cursor: pointer;
	}
	> button:last-child {
		margin-left: 8px;
		background-color: var(--focus);
		color: var(--white);
		font-weight: 700;
	}

	> button:first-child {
		background-color: var(--gray);
	}

	> button > svg {
		margin-right: 4px;
	} */
`

export const IconClose = styled(HighlightOff)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
export const IconCancel = styled(Cancel)`
 width: 24px;
 height: 24px;
`
export const IconOk = styled(Check)`
 width: 24px;
 height: 24px;
`

export const ButtonAction =styled.button <IButtonAction>`
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
