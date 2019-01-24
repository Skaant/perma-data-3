const add = require('./extracts/add')
const search = require('./extracts/search')

module.exports = {
  add,
  subs: (req, res) => {
    res.status(501)
  },
  search
}