import React from 'react'

import GlobalsStyles from './assets/css/styles'
import Layout from '../src/components/Layout'
import { Provider } from 'react-redux'
import store from './store'

// import LoadData from '../src/components/LoadData'


const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Layout />
			<GlobalsStyles />
			{/* <LoadData /> */}
		</Provider>
	)
}

export default App
