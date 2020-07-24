import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
	ButtonStyled,
	ModalBodyStyled,
	ModalCloseButtonStyled,
	ModalContendStyled,
	ModalHeaderStyled,
	ModalStyled,
	ModalWrapperStyled,
	OverlayStyled,
	ModalFooterStyled
} from './styles'

export enum ETheme {
	PRIMARY = 'var(--focus)',
	SECONDARY = 'var(--gray)'
}

export interface IButton {
	label?: string
	onClick: () => void
	color: ETheme
	glossy?: boolean
}

export const ButtonCmp: React.FC<IButton> = (props) => {
	return <ButtonStyled {...props}>{props.label}</ButtonStyled>
}

export const useModal = (): [boolean, () => void] => {
	const [ isShowing, setIsShowing ] = useState(false)

	const toggle = () => {
		let timeoutHack: number
		timeoutHack = setTimeout(() => {
			setIsShowing(!isShowing)
			clearTimeout(timeoutHack)
		}, 10)
	}
	return [ isShowing, toggle ]
}

interface props {
	isShowing: boolean
	hide(): void
	onOk(): void
	title: string
	buttons?: React.FC<IButton>[]
}

const Modal: React.FC<props> = ({ isShowing, hide, title, buttons, onOk, children }) => {
	const handleOverlayClicked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if ((e.target as HTMLDivElement)?.id !== 'wrapper') {
		  return;
		}
		hide()
	}

	const bodyRef = useRef<React.ReactNode>(<div>cargando...</div>)
	bodyRef.current = children

	return isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<OverlayStyled />
					<ModalWrapperStyled
						aria-modal
						aria-hidden
						tabIndex={-1}
						role='dialog'
						id='wrapper'
						onClick={handleOverlayClicked}>
						<ModalStyled>
							<ModalContendStyled>
								<ModalHeaderStyled>
									<h3>{title}</h3>
									<ModalCloseButtonStyled data-dismiss='modal' aria-label='Close' onClick={hide}>
										<span aria-hidden='true'>&times;</span>
									</ModalCloseButtonStyled>
								</ModalHeaderStyled>
								<ModalBodyStyled>{bodyRef.current}</ModalBodyStyled>
								<ModalFooterStyled>
									{buttons && buttons.length > 0 ? (
										buttons.map((button) => button)
									) : (
										<React.Fragment>
											<ButtonCmp color={ETheme.SECONDARY} label='Cancelar' glossy onClick={hide} />
											<ButtonCmp color={ETheme.PRIMARY} label='Ok' glossy onClick={onOk} />
										</React.Fragment>
									)}
								</ModalFooterStyled>
							</ModalContendStyled>
						</ModalStyled>
					</ModalWrapperStyled>
				</React.Fragment>,
				document.body
			)
		: null
}

export default Modal
