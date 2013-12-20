opts = new Options()

onFormSubmit = () ->
  opts.data.notifications = $('.notifications').prop('checked')
  opts.data.stats = $('.stats').prop('checked')
  opts.save()
  window.close()

$ () ->
  $('.notifications').prop('checked', opts.data.notifications)
  $('.stats').prop('checked', opts.data.stats)
  $('form').submit onFormSubmit
