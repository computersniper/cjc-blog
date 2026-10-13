(function () {
  var menu = document.getElementById('learning-sites-menu');
  if (!menu) return;
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();
