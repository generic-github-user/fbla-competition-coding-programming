// Dialog handling
var add_student_dialog = document.querySelector('dialog');
if (!add_student_dialog.showModal) {
      dialogPolyfill.registerDialog(add_student_dialog);
}
$('button#add-student').click(function() {
      clear_fields($('dialog'));
      add_student_dialog.showModal();
});
$('button.close').click(function() {
      add_student_dialog.close();
});

// Add student data to database
// Get database
db = firebase.firestore();
$('dialog button.confirm').click(function() {
      // Store student info in variables
      var name = $('dialog input#student-name').val();
      var number = $('dialog input#student-number').val();
      var grade = $('dialog input#student-grade').val();
      var hours = $('dialog input#student-hours').val();
      // Upload to database
      db.collection("students").add({
                  name: name,
                  number: number,
                  grade: grade,
                  total_hours: hours,
                  created: new Date().getTime(),
                  created_by: firebase.auth().currentUser.uid
            })
            .then(function(docRef) {
                  // Log successful operation to console
                  console.log("Document written with ID: ", docRef.id);

                  var notification = document.querySelector('.mdl-js-snackbar');
                  var snackbar_data = {
                        message: 'Added student: ' + name + ' [' + grade + ']',
                        actionHandler: function(event) {
                              view_student(docRef.id);
                        },
                        actionText: 'View',
                        timeout: 5000
                  };
                  // Display snackbar notification
                  notification.MaterialSnackbar.showSnackbar(snackbar_data);
            })
            // Catch errors and log to console
            .catch(function(error) {
                  console.error("Error adding document: ", error);

                  snackbar('Error; could not add student.');
            });
      // Close dialog box
      add_student_dialog.close();
});