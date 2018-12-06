import React from 'react'
import RankItem from './rankbar/RankItem'
import SuggestionsGroup from './rankbar/SuggestionsGroup'

export default ({ lang, langs, plant }) => (
  <div id='rank-bar'>
    <div id='rank-hierarchy' className='row'>
      {
        ['family', 'genus', 'species', 'variety'].map(key => (
          <React.Fragment>
            <RankItem key={ key } rank={ key }
              lang={ lang } langs={ langs }
              current={ plant.rank === key } plant={ plant }/>
            {
              Object.keys(plant.suggestions[key]).length > 0 && (
                <SuggestionsGroup key={ key } rank={ key }
                    lang={ lang } langs={ langs }
                    plant={ plant } device='mobile'/>
              )
            }
          </React.Fragment>
        ))
      }
    </div>
    <div id='rank-suggestions'>
      {
        ['family', 'genus', 'species', 'variety']
          .filter(key => Object.keys(plant.suggestions[key]).length > 0)
          .map(key => (
            <SuggestionsGroup key={ key } rank={ key }
              lang={ lang } langs={ langs }
              plant={ plant } device='desktop'/>
          ))
      }
    </div>
  </div>
)