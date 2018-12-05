import React from 'react'
import RankItem from './rankbar/RankItem'

export default ({ lang, langs, plant }) => (
  <div id='rank-bar' className='row'>
    {
      ['family', 'genus', 'species', 'variety'].map(key => (
        <RankItem key={ key } label={ key }
          lang={ lang } langs={ langs }
          current={ plant.rank === key } plant={ plant[key] }/>
      ))
    }
  </div>
)