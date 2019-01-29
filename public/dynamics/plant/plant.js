$.noConflict()
  jQuery(document).ready($ => {
    let selected = []

    const getSortedTags = data => {
      const tags = $(data).data().tags.split(',')
      if (tags.length > 1) {
        return tags.sort((a, b) => {
          if (selected.includes(a)) {
            if (!selected.includes(b)) {
              return -1
            }
          } else {
            if (selected.includes(b)) {
              return 1
            }
          }
          return a.localeCompare(b)
        })
      } else {
        return tags
      }
    }

    const refreshList = () => {
      const newList = $('.data-item')
        .sort((aData, bData) => {
          const aSortedTags = getSortedTags(aData)
          const bSortedTags = getSortedTags(bData)
          let i = 0
          while(i < aSortedTags.length && i < bSortedTags.length) {
            if (aSortedTags[i] === bSortedTags[i]) {
              i++
            } else {
              if (selected.includes(aSortedTags[i])) {
                if (!selected.includes(bSortedTags[i])) {
                  return -1
                }
              } else {
                if (selected.includes(bSortedTags[i])) {
                  return 1
                }
              }
              return aSortedTags[i].localeCompare(bSortedTags[i])
            }
          }
        })
      console.log(selected, newList)
      newList.appendTo('#data-list__content')
  }
  
    $('.data-item__tag')
      .on('click', e => {
        const { value } = $(e.target).data()
        if (selected.includes(value)) {
          selected.splice(selected.indexOf(value), 1)
        } else {
          selected.push(value)
        }
        refreshList()
      })
})