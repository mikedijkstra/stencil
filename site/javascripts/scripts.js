(function() {
  $(function() {
    return $('[data-toggle-nav-menu]').click(function() {
      return $('[data-nav-menu]').slideToggle();
    });
  });

  $(window).load(function() {});

}).call(this);
