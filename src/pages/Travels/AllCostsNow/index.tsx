import React from 'react'
import { useSelector } from 'react-redux'
import ItemList from '../../../components/ItemList'
import List from '../../../components/List'
import { AppState } from '../../../store/ducks/rootReducer'

const AllCostNow: React.FC = () => {
	const costs = useSelector((state: AppState) => state.trener.costs)

	return (
		<List title='Costos segun perfil'>
			{costs.map((cost, index) => <ItemList key={index} {...cost} />)}
		</List>
	)
}

export default AllCostNow
