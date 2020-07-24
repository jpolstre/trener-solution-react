import React, { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Grid from './styles'

import Header from '../Header'
import Tabs from '../Tabs'
import Content from '../Content'

import { BrowserRouter as Router } from 'react-router-dom'
import { AppState } from '../../store/ducks/rootReducer'

import { EQueries } from '../../services/queries'
import { queryDb } from '../../store/ducks/trener/actions'
import Loading from '../Loading'

const Layout: React.FC = () => {
	const { titleHeader, loading } = useSelector((state: AppState) => state.trener)
	const refLoading = useRef<boolean>()
	refLoading.current = loading

	const dispatch = useDispatch()
	useEffect(
		() => {
			dispatch(queryDb(EQueries.INIT_DB))
		},
		[ dispatch ]
	)

	return (
		<Grid>
			<Router>
				<Header title={titleHeader} />
				<Content />
				<Tabs />
			</Router>
			{refLoading.current && refLoading.current === true ? <Loading label='cargando...' /> : null}
		</Grid>
	)
}

export default Layout
