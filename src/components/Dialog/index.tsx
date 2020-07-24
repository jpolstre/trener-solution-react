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

export const ButtonCmp:React.FC<IButton> = (props) => {
	return <ButtonStyled {...props}>{props.label}</ButtonStyled>
}

// export interface IOptionsDialog {
// 	title?: string
// 	buttons?: React.FC<IButton>[]

// 	onShow?: () => void
//   onHide?: () => void
//   closeButton?: boolean
//   message?: string
//   overlayClose?:boolean
//   onOverlayClicked?:()=> void
// 	onEscapeKeyDown?: () => void
// 	keyboardClose?: boolean
// }


export const useModal = ():[boolean,  () => void] =>{
  const [isShowing, setIsShowing] = useState(false)

  const toggle = ()=>{
    let timeoutHack:number
    timeoutHack = setTimeout(() => {
      setIsShowing(!isShowing)
      clearTimeout(timeoutHack)
    }, 10)
  }
  return[
    isShowing,
    toggle
	]
}

interface props {
	isShowing: boolean
	hide(): void
  onOk(): void
	title:string
	buttons?: React.FC<IButton>[]
}

const Modal:React.FC<props> = ({ isShowing, hide, title, buttons, onOk, children }) => {
    const handleOverlayClicked = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement)?.id !== 'wrapper') {
      return;
    }
    hide()
	}
	
	const bodyRef = useRef<React.ReactNode>(<div>cargando...</div>) 
	bodyRef.current = children
	// const renderBody = (sw:boolean = false)=>{
	// 	if(!sw){
	// 		const cto = setTimeout(()=>{
	// 			console.log('renderBody');
	// 			renderBody(true)
	// 			clearTimeout(cto)
	// 		}, 500)
	// 		bodyRef.current =  <div>cargando...</div>
	// 	}else{
	// 		console.log('rerender');
	// 		bodyRef.current =  children
	// 	} 
	// }
	// useEffect(()=>{
	// 	console.log('setTimeout');
	// 	const cto = setTimeout(()=>{
	// 		bodyRef.current = children
	// 		clearTimeout(cto)
	// 	}, 1000)
	// },[children])

	return isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<OverlayStyled />
					<ModalWrapperStyled aria-modal aria-hidden tabIndex={-1} role='dialog' id="wrapper" onClick={handleOverlayClicked} >
						<ModalStyled>
							<ModalContendStyled>
								<ModalHeaderStyled>
                  <h3>{title}</h3>
									<ModalCloseButtonStyled data-dismiss='modal' aria-label='Close' onClick={hide}>
										<span aria-hidden='true'>&times;</span>
									</ModalCloseButtonStyled>
								</ModalHeaderStyled>
								<ModalBodyStyled>
								{bodyRef.current}
								</ModalBodyStyled>
								<ModalFooterStyled>
									{(buttons && buttons.length > 0)?buttons.map(button=>button):<React.Fragment><ButtonCmp color={ETheme.SECONDARY} label="Cancelar" glossy onClick={hide}/><ButtonCmp color={ETheme.PRIMARY} label="Ok" glossy onClick={onOk}/></React.Fragment>
									}
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



// interface IPropsModal {
//   isModalVisible?: boolean
//   hide:()=>void
//   options?:IOptionsDialog
// }

// const ModalCmp: React.FC<IPropsModal> = ({isModalVisible, hide, options, children}) => {

//   const handleOverlayClicked = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if ((e.target as HTMLDivElement)?.className !== 'modali-wrapper') {
//       return;
//     }
//     if (options === undefined) {
//       hide();
//     } else {
//       if (options.overlayClose !== false) {
//         hide();
//       }
//       if (options.onOverlayClicked) {
//         options.onOverlayClicked();
//       }
//     }
//   }

//   const renderBody = ()=> {
//     if (children) {
//       return children;
//     } if (options && options.message) {
//       return (
//         <ModalBodyStyleStyled>
//           {options.message}
//         </ModalBodyStyleStyled>
//       );
//     }
//     return false;
//   }

//   const renderFooter = ()=> {
//     if(!options) return null
//     const { buttons } = options;
//     return (
//       <ModalFooterStyled>
//         {buttons?.map((button, index) => (
//           <React.Fragment
//             key={index}
//           >
//             {button}
//           </React.Fragment>
//         ))}
//       </ModalFooterStyled>
//     );
//   }

//   return isModalVisible ? ReactDOM.createPortal(
//     <React.Fragment>
//       <OverlayStyled  />
//       <ModalWrapperStyled aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={handleOverlayClicked}>
//         <ModalStyled>
//           <ModalContendStyled>
//             {options !== undefined && options.closeButton === false ? null : (
//               <ModalHeaderStyled>
//                 {options !== undefined && options.title !== undefined && (
//                   <div className="modali-title">
//                     {options.title}
//                   </div>
//                 )}
//                 <ModalCloseButtonStyled data-dismiss="modal" aria-label="Close" onClick={hide}>
//                   <span aria-hidden="true">&times;</span>
//                 </ModalCloseButtonStyled>
//               </ModalHeaderStyled>
//             )}
//             <ModalBodyStyled>
//               {renderBody()}
//             </ModalBodyStyled>
//             {options && options.buttons && options.buttons.length > 0 && renderFooter()}
//           </ModalContendStyled>
//         </ModalStyled>
//       </ModalWrapperStyled>
//     </React.Fragment>, document.body,
//   ) : null;
// }

// const Dialog = () => {}
// Dialog.Button = ButtonCmp
// Dialog.Modal = ModalCmp
// export default Dialog

// export const useModal = (options?: IOptionsDialog) => {
// 	const [ hasToggledBefore, setHasToggledBefore ] = useState(false)
// 	const [ isModalVisible, setIsModalVisible ] = useState(false)
// 	const [ isShown, setIsShown ] = useState(false)
// 	const isModalVisibleRef = useRef(isModalVisible)
// 	isModalVisibleRef.current = isModalVisible
// 	let timeoutHack: number
// 	const toggle = ()=> {
// 		timeoutHack = setTimeout(() => {
// 			setIsModalVisible(!isModalVisibleRef.current)
// 			clearTimeout(timeoutHack)
// 		}, 10)
// 		setIsShown(!isShown)
// 		setHasToggledBefore(true)
// 	}

// 	const handleKeyDown = (event: KeyboardEvent) =>{
// 		if (event.keyCode !== 27 || (options && options.keyboardClose === false)) return
// 		toggle()
// 		if (options && options.onEscapeKeyDown) {
// 			options.onEscapeKeyDown()
// 		}
// 	}

// 	useEffect(
// 		() => {
// 			if (isShown) {
// 				if (options && options.onShow) {
// 					options.onShow()
// 				}
// 				document.addEventListener('keydown', handleKeyDown)
// 				document.body.classList.add('modali-open')
// 			}
// 			if (!isShown && hasToggledBefore) {
// 				if (options && options.onHide) {
// 					options.onHide()
// 				}
// 				document.body.classList.remove('modali-open')
// 			}
// 			return () => document.removeEventListener('keydown', handleKeyDown)
// 		},
// 		[ isShown ]
// 	)

// 	return {
// 		opt:{
// 			isShown,
// 			isModalVisible,
// 			hide: toggle,
// 			options
// 		},
// 		toggle
//   }
// }
