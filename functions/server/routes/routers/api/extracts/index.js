const add = require('./add/add')
const search = require('./search/search')

module.exports = {
  add,
  subs: (req, res) => {
    res.status(501)
  },
  search
}