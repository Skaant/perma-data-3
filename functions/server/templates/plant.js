import React from 'react'
import RankBar from '../../components/RankBar'
import Extracts from '../../components/Extracts';

export default props => {
  if (props.data && props.data.plant) {
    return (
      <div className='container'>
        <div id='plant' className='row'>
          <div id='miniature' className='col-md-4'>
            <img src={ props.data.plant.miniature }/>
          </div>
          <div id='description' className='col-md-8'>
            <RankBar plant={ props.data.plant }
                lang={ props.lang }
                langs={ props.langs }/>
            <h1>{ props.data.plant.names && props.data.plant.names[props.lang] }</h1>
            <div id='tool-bar'>
              <h2>{ props.data.plant.id && typeof props.data.plant.id === 'string'
                && `${ props.data.plant.id[0].toUpperCase() }${ props.data.plant.id.slice(1) }` }</h2>
              <a href={ `/${ props.lang === 'en' ? 'fr' : 'en' }/plant/${
                props.data.plant && props.data.plant.id  
              }` }>
                { props.lang === 'en' ? 'FR' : 'EN' }</a>
            </div>
          </div>
        </div>
        <div id='data'>
          <Extracts extracts={ props.data.extracts }/>
        </div>
      </div>
    )
  } else {
    return (
      <div className='row'>
        <h2>no plant data</h2></div>
    )
  }
}