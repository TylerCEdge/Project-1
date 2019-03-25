

$(window).load(function () {
  // full load
  $('#myModal').on('shown.bs.modal', function () {
    pageLoad.trigger('focus')
  })
});