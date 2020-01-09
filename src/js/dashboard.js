var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
}
$('button#add-student').click(function() {
      clear_fields($('dialog'));
      dialog.showModal();
});
$('button.close').click(function() {
      dialog.close();
});