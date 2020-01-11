var help_dialog = document.querySelector('dialog#help-search');
if (!help_dialog.showModal) {
      dialogPolyfill.registerDialog(help_dialog);
}
$('#help-button').click(function() {
      help_dialog.showModal();
});
help_dialog.querySelector('.close').addEventListener('click', function() {
      help_dialog.close();
var search_options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
            'title',
            'link'
      ]
};
});