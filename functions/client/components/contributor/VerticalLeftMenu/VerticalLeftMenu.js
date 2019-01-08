import React from 'react'

export default ({ mode, handleModeChange }) => (
  <div id='vertical-left-menu' className='col-md-4'>
    <h3 id='vertical-left-menu__title'>TOOL LIST</h3>
    <h4 className={ `vertical-left-menu__tool ${ mode === 'plant-adder' ? ' active' : '' }` }
        onClick={ () => handleModeChange('plant-adder') }>
      plant adder</h4>
    <h4 className={ `vertical-left-menu__tool ${ mode === 'image-converter' ? ' active' : '' }` }
        onClick={ () => handleModeChange('image-converter') }>
      image converter</h4>
  </div>

)