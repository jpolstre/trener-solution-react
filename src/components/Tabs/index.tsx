import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { AppState } from '../../store/ducks/rootReducer'
import { setStateValue } from '../../store/ducks/trener/actions'

import { ERoutes } from '../Content'

import { Container, Tab } from './styles'

const Tabs: React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const activeTab = useSelector((state: AppState) => state.trener.activeTab)

	const handlerClick = (active: ERoutes) => {
		dispatch(setStateValue('activeTab', active))

		history.push(active)
	}

	return (
		<Container>
			<Tab onClick={() => handlerClick(ERoutes.TRAVELS)} className={activeTab === ERoutes.TRAVELS ? 'active' : ''}>
				Viajes
			</Tab>

			<Tab onClick={() => handlerClick(ERoutes.MY_DATA)} className={activeTab === ERoutes.MY_DATA ? 'active' : ''}>
				Mis datos
			</Tab>
		</Container>
	)
}

export default Tabs
