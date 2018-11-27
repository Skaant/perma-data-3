import React from 'react'
import RankItem from './rankbar/RankItem'

export default ({ rank, ...props }) => (
  <div id='rank-bar' className='row'>
    {
      ['family', 'genus', 'species', 'variety'].map(key => (
        <RankItem key={ key } label={ key }
          current={ rank === key } plant={ props[key] }/>
      ))
    }
  </div>
)