import React from 'react'
import { render } from 'react-dom'
import AppBar from '../../components/AppBar'
import PlantData from '../../components/PlantData'

render(<AppBar/>, document.getElementById('app-bar'))
render(<PlantData/>, document.getElementById('plant-data'))