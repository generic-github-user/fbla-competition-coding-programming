focused_student_id = '';

// Dialog handling
var view_student_dialog = document.querySelector('dialog#view-student');
// Polyfill
if (!view_student_dialog.showModal) {
      dialogPolyfill.registerDialog(view_student_dialog);
}
$('dialog#view-student button.close').click(function() {
      $('dialog#view-student > *.student-name').text('');
      clear_fields($('dialog#view-student'));
      view_student_dialog.close();
});
$('dialog#view-student button.confirm').click(function() {
      // write_student_info('dialog.view-student', 'Updated student information: ', firebase.firestore().collection("students").doc(focused_student_id), 'set');
      write_student_info('dialog.view-student', 'Updated student information: ', focused_student_id);
})

// Create a dialog to view an existing student
function view_student(student_id) {
      // Show dialog box
      view_student_dialog.showModal();

      // Get student data from database
      db.collection('students').doc(student_id).get().then(function(doc) {
            // If student exists, load
            if (doc.exists) {
                  console.log("Student data:", doc.data());
                  data = doc.data();
                  focused_student_id = student_id;

                  // Set title of box
                  $('dialog#view-student > *.student-name').text(data.name);
                  // List of properties to load
                  properties = ['name', 'number', 'grade', 'total_hours'];
                  // Cycle through properties
                  for (var i = 0; i < properties.length; i++) {
                        // Get input box element
                        var field = $('dialog#view-student input#student-' + properties[i]);
                        // Set value
                        field.val(data[properties[i]]);
                        // Mark input as filled
                        field.parent().addClass('is-dirty');
                  }
                  // $('dialog#view-student input#student-number').val(data.number);
                  // $('dialog#view-student input#student-grade').val(data.grade);
            }
            // Otherwise, log error message to console
            else {
                  console.log("No such student");
            }
      }).catch(function(error) {
            // Log error
            console.log("Error getting document:", error);

            snackbar('Error; could not load student information.');
      });
}