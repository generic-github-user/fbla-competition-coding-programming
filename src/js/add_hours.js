// Dialog handling
var add_hours_dialog = document.querySelector('dialog.add-hours');
if (!add_hours_dialog.showModal) {
      dialogPolyfill.registerDialog(add_hours_dialog);
}
$('button#add-hours').click(function() {
      clear_fields($('dialog.add-hours'));
      add_hours_dialog.showModal();
});
$('button.close').click(function() {
      add_hours_dialog.close();
});

// Add volunteer event data to database
// Get database
$('dialog.add-hours button.confirm').click(function() {
      write_student_info('dialog.add-hours', 'Added volunteer activity: ', generatePushID());
      // Close dialog box
      add_hours_dialog.close();
});