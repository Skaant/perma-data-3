import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../components/PlantSearch/PlantSearch';

render((
  <PlantSearch mode='selection'
      selectPlant={ plant => document.location.href =
        `/${ document.getElementsByTagName('html')[0].lang }/plant/${ plant.id }` }/>
), document.getElementById('anchor-search'))