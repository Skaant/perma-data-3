import React from 'react'
import DataList from './DataList/DataList'
import ParentList from './ParentList/ParentList'

export default ({ lang, title, datas, plant }) => (
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
    <DataList datas={ datas }/>
  </div>
)