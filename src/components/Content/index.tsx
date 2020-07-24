import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import MyData from '../../pages/MyData'
import Travels from '../../pages/Travels/Home'
import NextTrains from '../../pages/Travels/NextTrains'
import AllCostsNow from '../../pages/Travels/AllCostsNow'

import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { Container } from './styles'
import { setStateValue } from '../../store/ducks/trener/actions'

export enum ERoutes {
	TRAVELS = '/travels',
	NEXT_TRAINS = '/travels/next_trains',
	ALL_COSTS_NOW = '/travels/all_costs_now',

	MY_DATA = '/data'
}

const Content: React.FC = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	useEffect(
		() => {
			if (location.pathname === ERoutes.TRAVELS) {
				dispatch(setStateValue('titleHeader', 'TR5NR'))
				dispatch(setStateValue('activeTab', ERoutes.TRAVELS))

			}else if(location.pathname === ERoutes.NEXT_TRAINS){
				dispatch(setStateValue('titleHeader', 'Proximos Trenes'))
				dispatch(setStateValue('activeTab', ERoutes.TRAVELS))
			
			}else if(location.pathname === ERoutes.ALL_COSTS_NOW){
				dispatch(setStateValue('titleHeader', 'Costos Hora Alta'))
				dispatch(setStateValue('activeTab', ERoutes.TRAVELS))
			
			} else if (location.pathname === ERoutes.MY_DATA) {
				dispatch(setStateValue('titleHeader', 'Mis Datos'))
				dispatch(setStateValue('activeTab', ERoutes.MY_DATA))
			}
		},
		[ dispatch, location ]
	)

	return (
		<Container>
			<Switch>
				<Route exact path='/'>
					<Redirect to={ERoutes.TRAVELS} />
				</Route>
				<Route exact path={ERoutes.TRAVELS} component={Travels} />
				<Route exact path={ERoutes.NEXT_TRAINS} component={NextTrains} />
				<Route exact path={ERoutes.ALL_COSTS_NOW} component={AllCostsNow} />

				<Route exact path={ERoutes.MY_DATA} component={MyData} />
			</Switch>
		</Container>
	)
}

export default Content
