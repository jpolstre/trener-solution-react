import React, { useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal, { useModal } from '../../../components/Dialog'
import List from '../../../components/List'
import ItemList from '../../../components/ItemList'
import { AppState } from '../../../store/ducks/rootReducer'
import { queryDb, setStateValue, calcResults } from '../../../store/ducks/trener/actions'
import Select from '../../../components/Select'
import { EQueries } from '../../../services/queries'

const Travels: React.FC = () => {
	const [ swModal, toggleModal ] = useModal()

	const dispatch = useDispatch()

	const state = useSelector((state: AppState) => state)

	const {origin, destination, stations} = state.trener

	//Aqui se explica por que se utiliza esto*(refs): https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
	// NOTA.-: useStatecausa re-render, useRef no lo hace.
	//Otra gran diferencia es que establecer un estado es asíncrono y establecer una referencia es síncrono

	const typeItemRef = useRef<string>('')
	const titleModalRef = useRef<string>('')
	const stationRef = useRef<string>('')


	const options = useMemo(
		() => {
			return stations.map((station) => ({ label: station.name, value: String(station.code) }))
		},
		[ stations ]
	)


	const onShowModal = (type: string) => {
		typeItemRef.current = type
		if (type === 'origin') {
			stationRef.current = String(origin?.code)
			titleModalRef.current = 'Estacion Origen'
		} else {
			stationRef.current = String(destination?.code)
			titleModalRef.current = 'Estacion Destino'
		}
		dispatch(queryDb(EQueries.GET_ALL, 'stations'))
		toggleModal()
	}


	const onSelectedOption = () => {
		if(stationRef.current === '') return 
		const selectedStation = stations.find((station) => String(station.code) === stationRef.current)
		dispatch(setStateValue(typeItemRef.current, selectedStation))
		
		dispatch(calcResults())

		
		toggleModal()

	}

	return (
		<React.Fragment>
			<List title='Viajes'>
				<ItemList label='Origen' labelLink={origin?.name} onClick={() => onShowModal('origin')} typeButton/>
				<ItemList label='Destino' labelLink={destination?.name} onClick={() => onShowModal('destination')} typeButton/>
			</List>

			<Modal isShowing={swModal} hide={toggleModal} title={titleModalRef.current} onOk={onSelectedOption}>
				<Select
					options={options}
					currentValue={stationRef.current}
					onChange={(newVal) => (stationRef.current = newVal)}
					onKeyEnter={onSelectedOption}
					toolBar
				/>
			</Modal>
		</React.Fragment>
	)
}

export default Travels
