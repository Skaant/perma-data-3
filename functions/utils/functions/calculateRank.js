const RANKS = require('../refs/ranks')

module.exports = (rank, value) => RANKS[RANKS.indexOf(rank) + value]