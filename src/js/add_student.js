// Dialog handling
var add_student_dialog = document.querySelector('dialog.add-student');
if (!add_student_dialog.showModal) {
      dialogPolyfill.registerDialog(add_student_dialog);
}
$('button#add-student').click(function() {
      clear_fields($('dialog.add-student'));
      add_student_dialog.showModal();
});
$('button.close').click(function() {
      add_student_dialog.close();
});

method = firebase.firestore().collection("students").add;

// Add student data to database
// Get database
$('dialog.add-student button.confirm').click(function() {
      // write_student_info('dialog.add-student', 'Added student: ', firebase.firestore().collection("students"), 'add');
      write_student_info('dialog.add-student', 'Added student: ', generatePushID());
      // Close dialog box
      add_student_dialog.close();
});