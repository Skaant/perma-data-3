import React from 'react'

const plantId = window.PLANT_ID

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      extracts: []
    }
  }

  componentDidMount() {
    fetch(`/api/extracts/${ plantId }`)
      .then(response => response.json())
      .then(extracts => this.setState({ extracts }))
  }

  render() {
    const { extracts } = this.state
    return (
      <div>
        coucou { plantId }
        {
          Object.keys(extracts).map(key => {
            const { id, content } = extracts[key]
            return (
              <h2 key={ id }>
                { content }</h2>
            )
          })
        }
      </div>
    )
  }
}