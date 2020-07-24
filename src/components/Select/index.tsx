import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { scrollTo } from '../../utils'
import { ButtonCmp, ETheme } from '../Dialog'
import { Container, SelectContainer, Option, ToolInfoBar, InputFilter, IconClear, } from './styles'

export interface IOption {
	label: string
	value: string
}

interface Props {
	options: IOption[]
	onChange: (value: string) => void
	onKeyEnter: () => void
	currentValue: string
	toolBar?: boolean
}

const Select: React.FC<Props> = ({ options, onChange, currentValue, toolBar, onKeyEnter }) => {
	const refSelect = useRef<HTMLDivElement>(null)

	const [ active, setActive ] = useState<string>('')
	const [ filter, setFilter ] = useState<string>('')

	const refActive = useRef<string>()
	refActive.current = active

	const refOptionsFielter = useRef<IOption[]>([])
	refOptionsFielter.current = useMemo(
		() => {
			if (filter === '') return options
			const termsArray = filter.toLowerCase().split(' ')
			return options.filter((option) => termsArray.every((term) => option.label.toLowerCase().indexOf(term) > -1))
		},
		[ options, filter ]
	)

	//se memoriza y solo cambia cuando se llama a la [dependencia] si no se obtiene de memoria.
	const scrollToActive = useCallback(
		() => {
			const container = refSelect.current

			let timeoutHack:number

			timeoutHack = setTimeout(() => {
				if (container) {
					const activeElem = container.querySelector('.active') as HTMLDivElement
					scrollTo(container, activeElem?.offsetTop-110, 10)
				}
				clearTimeout(timeoutHack)

			}, 10)
		},
		[ refSelect ]//solo cambia si cambia este valor si no se obtiene de memoria
	)

	const keyboardHandler = useCallback((e:KeyboardEvent)=>{
		const keyCode = e.code
		const index = refOptionsFielter.current.findIndex(option=>option.value === refActive.current)
		let activeCurrent: string = ''
		if(keyCode !== 'ArrowUp' &&	keyCode !== 'ArrowDown' && keyCode !== 'Enter'){ return
		}else if(index < 0 && refOptionsFielter.current.length >= 0){
			activeCurrent = refOptionsFielter.current[0].value
		}else{
			e.preventDefault()
			if(keyCode === 'Enter'){
				onKeyEnter()
			}else if(keyCode==='ArrowUp'){
				if(index > 0){
					activeCurrent = refOptionsFielter.current[index-1].value
				}else{
					activeCurrent = refOptionsFielter.current[refOptionsFielter.current.length-1].value
				}
			}else if(keyCode==='ArrowDown'){
				if(index < refOptionsFielter.current.length-1){
					activeCurrent = refOptionsFielter.current[index+1].value
				}else{
					activeCurrent = refOptionsFielter.current[0].value
				}
			}
		}
	
		if(activeCurrent !== ''){
			setActive(activeCurrent+'')
			onChange(activeCurrent+'')
			scrollToActive()
		}
		// eslint-disable-next-line
	}, [options])

	useEffect(
		() => {
			setActive(currentValue)
			scrollToActive()
			window.document.addEventListener('keydown', keyboardHandler)
			return ()=>window.document.removeEventListener('keydown', keyboardHandler)
		},
		// eslint-disable-next-line
		[]
	)

	const handleClick = (value: string) => {
		setActive(value)
		onChange(value)
	}

	return (
		<Container>
			{toolBar !== undefined && toolBar ? (
				<ToolInfoBar>
					<div>
						<InputFilter value={filter} onChange={(e) => setFilter(e.target.value)} onKeyDown={(e)=>{
							if(e.keyCode === 27) setFilter('')
						}} placeholder='Filtrar' />
						<IconClear onClick={() => setFilter('')} />
					</div>
					<ButtonCmp
						glossy
						label={`Actual:${parseInt(active)+1}`}
						color={ETheme.PRIMARY}
						onClick={() => {
							setFilter('')
							scrollToActive()
						}}/>
						
			
				</ToolInfoBar>
			) : (
				''
			)}
			<SelectContainer ref={refSelect}>
				{refOptionsFielter.current.map((option, index) => (
					<Option key={option.value} className={active === option.value ? 'active' : ''}>
						<span onClick={() => handleClick(option.value)}>{index+1}. {option.label}</span>
					</Option>
				))}
			</SelectContainer>
		</Container>
	)
}

export default Select
