(function() {
  var onFormSubmit, opts;

  opts = new Options();

  onFormSubmit = function() {
    opts.data.notifications = $('.notifications').prop('checked');
    opts.data.stats = $('.stats').prop('checked');
    opts.save();
    return window.close();
  };

  $(function() {
    $('.notifications').prop('checked', opts.data.notifications);
    $('.stats').prop('checked', opts.data.stats);
    return $('form').submit(onFormSubmit);
  });

}).call(this);
