import React from 'react'
import { render } from 'react-dom'
import PlantSearch from '../../../components/PlantSearch/PlantSearch'

const html = document.getElementsByTagName('html')[0]
const lang = html.lang
const page = html.attributes.page.value

fetch(`/api/langs/${ lang }/main`)
  .then(result => result.json())
  .then(langs => render((
    <PlantSearch mode='selection'
        openDefault={ page !== 'home' }
        langs={ langs }
        selectPlant={ plant => document.location.href =
          `/${ lang }/plant/${ plant.id }` }/>
  ), document.getElementById('anchor-search')))