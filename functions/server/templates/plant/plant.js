import React from 'react'
import DataList from './DataList/DataList'
import ParentList from './ParentList/ParentList'
import SectionPlantList from './SectionPlantList/SectionPlantList';

export default ({ lang, datas, plant, similar, descendants }) => {
  return (
  <div id='plant' className='main container'>
    <div className='row'>
      <nav className='col-12'>
        <ParentList plant={ plant } lang={ lang }/>
      </nav>
    </div>
    <div className='row'>
      <h1 className='col-12'>
        { plant.name }</h1>
    </div>
    {
      datas.length > 0 && (
        <DataList datas={ datas }/>
      )
    }
    {
      (plant.rank !== 'family' && similar.length > 0) && (
        <SectionPlantList label={ `in the same ${ plant.parent.rank }` }
            list={ similar } lang={ lang }/>
      )
    }
    {
      (plant.rank !== 'variety' && descendants.length > 0) && (
        <SectionPlantList label={ `in this ${ plant.rank }` }
            list={ descendants } lang={ lang }/>
      )
    }
  </div>
)}