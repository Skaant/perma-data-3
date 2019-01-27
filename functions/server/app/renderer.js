const React = require('react')
const ReactDOMServer = require('react-dom/server')

module.exports = (template, props) =>  {
  return ReactDOMServer.renderToString(React.createElement(template.default, props))
}