import React from 'react'
import DataList from './DataList/DataList';

export default ({ title, datas }) => (
  <div id='plant' className='main container'>
    <div className='row'>
      <h1 className='col-12'>{ title }</h1>
    </div>
    <DataList datas={ datas } />
  </div>
)