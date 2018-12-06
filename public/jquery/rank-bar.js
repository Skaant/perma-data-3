$.noConflict()
jQuery(document).ready($ => {
  $('.suggestions-more')
    .on('click', e => {
      const rank = $(e.target).data('rank')
      $(`.suggestions-less, .suggestions-group`)
        .removeClass('reveal')
      $(`.suggestions-more, #suggestions-${ rank }, #suggestions-less-${ rank }`)
        .addClass('reveal')
      $(`#suggestions-more-${ rank }`)
        .removeClass('reveal')
      $(`#suggestions-less-${ rank }`)
        .on('click', () => {
          $(`#suggestions-less-${ rank }, #suggestions-${ rank }`)
            .removeClass('reveal')
          $(`#suggestions-more-${ rank }`)
            .addClass('reveal')
        })
    })

  $(`.suggestions-less`)
    .on('click', e => {
      const rank = $(e.target).data('rank')
      $(`#suggestions-less-${ rank }, #suggestions-${ rank }`)
        .removeClass('reveal')
      $(`#suggestions-more-${ rank }`)
        .addClass('reveal')
    })
})