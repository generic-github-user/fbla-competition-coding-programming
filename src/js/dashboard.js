var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
}
$('button#add-student').click(function() {
      dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
});