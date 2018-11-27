import React from 'react'
import RankBar from '../../components/RankBar'

import LangContext from '../../components/contexts/LangContext'

export default props => {
  if (props.data && props.data.plant) {
    return (
      <LangContext.Provider value={ {
          lang: props.lang
      } }>
        <div className='row'>
          <RankBar rank={ props.data.plant.rank }
              family={ props.data.plant.family }
              genus={ props.data.plant.genus }
              species={ props.data.plant.species }/>
          <h1>{ props.data.plant.names && props.data.plant.names[props.lang] }</h1>
          <h2>{ props.data.plant.id && typeof props.data.plant.id === 'string'
            && `${ props.data.plant.id[0].toUpperCase() }${ props.data.plant.id.slice(1) }` }</h2>
        </div>
      </LangContext.Provider>
    )
  } else {
    return (
      <div className='row'>
        <h2>no plant data</h2></div>
    )
  }
}