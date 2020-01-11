var help_dialog = document.querySelector('dialog#help-search');
if (!help_dialog.showModal) {
      dialogPolyfill.registerDialog(help_dialog);
}
$('#help-button').click(function() {
      help_dialog.showModal();
});
help_dialog.querySelector('.close').addEventListener('click', function() {
      help_dialog.close();
});