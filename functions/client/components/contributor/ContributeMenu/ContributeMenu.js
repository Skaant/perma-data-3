import React from 'react'

// included in contibutor module
export default ({ mode, handleModeChange }) => (
  <div id='contribute-menu' className='col-md-6 offset-md-3'>
    <h1>CONTRIBUTE</h1>
    <h2>PLANTS</h2>
    <h3 className={ mode === 'add-plant' ? ' active' : '' }
        onClick={ () => handleModeChange('add-plant') }>
      add plant</h3>
    <h2>EXTRACTS</h2>
    <h3 className={ mode === 'add-biblio' ? ' active' : '' }
        onClick={ () => handleModeChange('add-biblio') }>
      add biblio</h3>
    <h3 className={ mode === 'add-section' ? ' active' : '' }
        onClick={ () => handleModeChange('add-section') }>
      add section</h3>
    <h3 className={ mode === 'add-extract' ? ' active' : '' }
        onClick={ () => handleModeChange('add-extract') }>
      add extract</h3>
    <h2 className>DATA</h2>
    <h3 className={ mode === 'add-data' ? ' active' : '' }
        onClick={ () => handleModeChange('add-data') }>
      add data</h3>
  </div>
)