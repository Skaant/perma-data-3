import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../../components/PlantSearch/PlantSearch'

const lang = document.getElementsByTagName('html')[0].lang

fetch(`/api/langs/${ lang }/home`)
  .then(result => result.json())
  .then(langs => render((
    <PlantSearch mode='selection'
        langs={ langs }
        selectPlant={ plant => document.location.href =
          `/${ lang }/plant/${ plant.id }` }/>
  ), document.getElementById('anchor-search')))