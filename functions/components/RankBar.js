import React from 'react'
import RankItem from './rankbar/RankItem'
import RankSuggestions from './rankbar/RankSuggestions'

export default ({ lang, langs, plant }) => (
  <div id='rank-bar'>
    <div id='rank-hierarchy' className='row'>
      {
        ['family', 'genus', 'species', 'variety'].map(key => (
          <RankItem key={ key } label={ key }
            lang={ lang } langs={ langs }
            current={ plant.rank === key } plant={ plant[key] }/>
        ))
      }
    </div>
    <div id='rank-suggestions' className='container'>
      {
        ['family', 'genus', 'species', 'variety'].map(key => (
          <RankSuggestions key={ key } rank={ key }
            lang={ lang } langs={ langs }
            plant={ plant }/>
        ))
      }
    </div>
  </div>
)