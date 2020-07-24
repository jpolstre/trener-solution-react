import React from 'react'
import { useSelector } from 'react-redux'
import ItemList from '../../../components/ItemList'
import List from '../../../components/List'
import { AppState } from '../../../store/ducks/rootReducer'

const NextTrains: React.FC = () => {
	const {nextTrains, destination} = useSelector((state: AppState) => state.trener)
	return (
		<List title={`Proximas Salidas hacia "${destination.name}" (${nextTrains.length})`}>
			{nextTrains.map(({ label, labelLink }, index) => (
				<ItemList key={index} label={label} labelLink={labelLink} />
			))}
		</List>
	)
}
export default NextTrains
