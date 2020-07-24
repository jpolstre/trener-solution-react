import React from 'react'
import TravelsList from './TravelsList'
import {Container} from './styles'
import DataList from './DataList'

const Travels: React.FC = () => {
	return (
		<Container>
			<TravelsList />
			<DataList />
		</Container>
	)
}

export default Travels
