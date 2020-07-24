import React from 'react'

import { useLocation, useHistory } from 'react-router-dom'
import { ERoutes } from '../Content'

import { Container, BackButton, IconBack } from './styles'

interface Props {
	title: string
}
const Header: React.FC<Props> = ({ title }) => {
	const location = useLocation()
	const history = useHistory()
	// history.goBack()
	return (
		<Container>
			{location.pathname !== ERoutes.TRAVELS ? (
				<BackButton onClick={() => history.push(ERoutes.TRAVELS)}>
					<IconBack /> TR5NR
				</BackButton>
			) : (
				''
			)}
			<h4>{title}</h4>
		</Container>
	)
}

export default Header
