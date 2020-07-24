import React from 'react'

import GlobalsStyles from './assets/css/styles'
import Layout from '../src/components/Layout'
import { Provider } from 'react-redux'
import store from './store'

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Layout />
			<GlobalsStyles />
		</Provider>
	)
}

export default App
