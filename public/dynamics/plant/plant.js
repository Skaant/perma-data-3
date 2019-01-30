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

    const refreshTagItems = () => {
      Array.from($('.tag-list__item'))
        .forEach(tagItem => {
          if($(tagItem).hasClass('btn-primary') 
              && selected.includes($(tagItem).data('value'))) {
            $(tagItem).removeClass('btn-primary').addClass('btn-success')
          } else if ($(tagItem).hasClass('btn-success') 
              && !selected.includes($(tagItem).data('value'))) {
            $(tagItem).removeClass('btn-success').addClass('btn-primary')
          }
        })
    }
  
    $('.data-item__tag, .tag-list__item')
      .on('click', e => {
        const { value } = $(e.target).data()
        if (selected.includes(value)) {
          selected.splice(selected.indexOf(value), 1)
        } else {
          selected.push(value)
        }
        refreshTagItems()
        refreshList()
      })
})