import React, { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal, { useModal } from '../../components/Dialog'
import ItemList from '../../components/ItemList'
import List from '../../components/List'
import Select from '../../components/Select'
import { EQueries } from '../../services/queries'
import { AppState } from '../../store/ducks/rootReducer'
import { queryDb, setStateValue } from '../../store/ducks/trener/actions'

const MyData: React.FC = () => {
	const [ swModal, toggleModal ] = useModal()
	const dispatch = useDispatch()

	const { users, userType } = useSelector((state: AppState) => state.trener)

	const userCodeRef = useRef<string>('')

	const options = useMemo(
		() => {
			return users.map((user) => ({ label: user.name, value: String(user.code) }))
		},
		[ users ]
	)

	const onSelectedOption = () => {
		const userType = users.find((user) => String(user.code) === String(userCodeRef.current))
		if (userType) dispatch(setStateValue('userType', userType))

		toggleModal()
	}
	const onShowModal = () => {
		userCodeRef.current = String(userType?.code)
		dispatch(queryDb(EQueries.GET_ALL, 'users'))
		toggleModal()
	}
	return (
		<React.Fragment>
			<List title='Datos Del Usuario'>
				<ItemList label='Tipo Usuario' labelLink={userType.name} onClick={onShowModal} typeButton />
			</List>

			<Modal isShowing={swModal} hide={toggleModal} title='Tipo Usuario' onOk={onSelectedOption}>
				<Select
					options={options}
					currentValue={userCodeRef.current}
					onChange={(newVal) => (userCodeRef.current = newVal)}
					onKeyEnter={onSelectedOption}
				/>
			</Modal>
		</React.Fragment>
	)
}

export default MyData
