import React from 'react'
import { Container, Caption } from './styles'

export interface Props {
	title: string
}

const List: React.FC<Props> = ({title, children }) => {
	return (
		<Container>
			<Caption>{title}</Caption>
			<ul>{ children}</ul>
		</Container>
	)
}

export default List
