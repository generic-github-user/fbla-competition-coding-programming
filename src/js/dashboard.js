var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
}
$('button#add-student').click(function() {
      dialog.showModal();
});
$('button.close').click(function() {
      dialog.close();
});