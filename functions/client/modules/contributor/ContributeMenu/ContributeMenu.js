import React from 'react'
import MenuTool from './MenuTool/MenuTool';

// included in contibutor module
export default ({ handleModeChange }) => (
  <div id='contribute-menu' className='col-lg-8 offset-lg-2'>
    <div className='row'>
      <MenuTool title='plants'>
        <button type='button' className='btn btn-x btn-primary col-12'
            onClick={ () => handleModeChange('add-plant') }>
          add</button>
      </MenuTool>
      <MenuTool title='extracts'>
        <button type='button' className='btn btn-x btn-primary col-12'
            onClick={ () => handleModeChange('add-extract') }>
          add</button>
      </MenuTool>
      <MenuTool title='datas'>
        <button type='button' className='btn btn-x btn-primary col-12'
            onClick={ () => handleModeChange('add-data') }>
          add</button>
      </MenuTool>
    </div>
  </div>
)