import React, { useEffect, useRef, useCallback } from 'react'

import { ETheme, EType, IDialog } from '.'

import { Container, Footer, Header, Body, IconCancel, IconOk, IconClose, ButtonAction } from './style'

const Cmp: React.FC<IDialog> = ({ title, content, type, iconClose, footerBootons }) => {
	const containerRef = useRef<HTMLDivElement>(null)

	function fire(elem: Element, type: string, opt: string) {
		const evt = new CustomEvent<string>(type, { detail: opt })
		evt.initCustomEvent(type, true, true, opt)
		elem.dispatchEvent(evt)
	}

	const onHide = useCallback((opt: string) => {
		const container =  containerRef.current?.parentElement
		if (container) {
			fire(container, 'onHide', opt)
		}
	}, [])

	const onShow = useCallback(
		() => {
			const container = containerRef.current
			if (container) {
				container.classList.add('show')
				document.querySelector('.back-cover')?.addEventListener('click', ()=>{
					onHide('cancel')
				})
			}
		},
		[ onHide ]
	)

	useEffect(
		() => {
			onShow()
		},
		[ onShow ]
	)

	return (
		<Container ref={containerRef}>
			<Header>
				<h3>{title}</h3>
				{iconClose ? (
					<IconClose
						onClick={() => {
							onHide('cancel')
						}}
					/>
				) : (
					''
				)}
			</Header>
			<Body className='body'> {content()}</Body>
			{type === EType.CONFIRM ? (
				<Footer>
					{footerBootons ? (
						footerBootons
					) : (
						<React.Fragment>
							<ButtonAction
								glossy
								color={ETheme.SECONDARY}
								onClick={() => {
									onHide('cancel')
								}}>
								<IconCancel />
								<span>Cancel</span>
							</ButtonAction>
							<ButtonAction
								glossy
								color={ETheme.PRIMARY}
								onClick={() => {
									onHide('ok')
								}}>
								<IconOk />
								<span>Ok</span>
							</ButtonAction>
						</React.Fragment>
					)}
				</Footer>
			) : (
				''
			)}
		</Container>
	)
}

export default Cmp
