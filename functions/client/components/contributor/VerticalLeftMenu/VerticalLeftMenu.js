import React from 'react'

// included in contibutor module
export default ({ mode, handleModeChange }) => (
  <div id='vertical-left-menu' className='col-lg-4'>
    <h3 className='contributor__title'>CONTRIBUTOR TOOLS</h3>
    <h4 className={ `vertical-left-menu__tool ${ mode === 'plant-adder' ? ' active' : '' }` }
        onClick={ () => handleModeChange('plant-adder') }>
      plant adder</h4>
    <h4 className={ `vertical-left-menu__tool ${ mode === 'image-converter' ? ' active' : '' }` }
        onClick={ () => handleModeChange('image-converter') }>
      image converter</h4>
  </div>

)