import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERoutes } from '../../../components/Content'
import ItemList from '../../../components/ItemList'
import List from '../../../components/List'

import { AppState } from '../../../store/ducks/rootReducer'

const DataList: React.FC = () => {
	const { next, cost, travelTime, userType } = useSelector((state: AppState) => state.trener)
	const history = useHistory()

	const viewNextTrains = () => {
		history.push(ERoutes.NEXT_TRAINS)
	}
	const viewAllCosts = () => {
		history.push(ERoutes.ALL_COSTS_NOW)
	}

	return (
		<React.Fragment>
			<List title='Datos'>
				<ItemList label='Proximo' labelLink={next} onClick={viewNextTrains} />
				<ItemList label={`Costo ${userType.name}`} labelLink={cost} onClick={viewAllCosts} />
				<ItemList label='Tiempo de Viaje' labelLink={travelTime} />
			</List>
		</React.Fragment>
	)
}

export default DataList
