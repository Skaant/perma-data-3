import React from 'react'
import { render } from 'react-dom'
import Inventory from '../../Inventory/Inventory'
import firebase from 'firebase/app'
import firebaseConfig from '../../../../firebase.config'

firebase.initializeApp(firebaseConfig)

render(<Inventory/>, document.getElementById('inventory'))