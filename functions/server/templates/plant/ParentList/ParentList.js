import React from 'react'

const RankItem = ({ plant, lang, first }) => {
  if (plant.rank === 'family') {
    return (
      <li key={ plant.id } className='breadcrumb-item'
          title={ plant.rank }>
        <span>{ plant.rank }</span>&nbsp;
        <a href={ `/${ lang }/plant/${ plant.id }` }>
          { plant.name }</a></li>
    )
  } else {
    return (
      <React.Fragment>
        <RankItem plant={ plant.parent } lang={ lang }/>
        <li key={ plant.id } className='breadcrumb-item'
            title={ plant.rank }>
          <span>{ plant.rank }</span>&nbsp;
          {
            first ? (
              <b>{ plant.id }</b>
            ) : (
              <a href={ `/${ lang }/plant/${ plant.id }` }>
                { plant.name }</a>
            )
          }
        </li>
      </React.Fragment>
    )
  }
}

export default ({ plant, lang }) => (
  <ol id='parent-list' className='breadcrumb'>
    <RankItem plant={ plant } lang={ lang } first={ true }/>
  </ol>
)