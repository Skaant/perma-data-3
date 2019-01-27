import React from 'react'
import { render } from 'react-dom'
import Contributor from '../../Contributor/Contributor'
import firebase from 'firebase/app'
import firebaseConfig from '../../../../firebase.config'

firebase.initializeApp(firebaseConfig)

render(<Contributor />, document.getElementById('contributor'))