// Dialog handling
var view_student_dialog = document.querySelector('dialog#view-student');
if (!view_student_dialog.showModal) {
      dialogPolyfill.registerDialog(view_student_dialog);
}
$('button.close').click(function() {
      view_student_dialog.close();
});

function view_student(student_id) {
      db.collection('students').doc(student_id).get().then(function(doc) {
            if (doc.exists) {
                  console.log("Student data:", doc.data());
                  data = doc.data();

                  view_student_dialog.showModal();

                  $('dialog#view-student > *.student-name').text(data.name);
                  properties = ['name', 'number', 'grade'];
                  for (var i = 0; i < properties.length; i++) {
                        var field = $('dialog#view-student input#student-' + properties[i]);
                        field.val(data[properties[i]]);
                        field.parent().addClass('is-dirty');
                  }
                  // $('dialog#view-student input#student-number').val(data.number);
                  // $('dialog#view-student input#student-grade').val(data.grade);
            } else {
                  console.log("No such student");
            }
      }).catch(function(error) {
            console.log("Error getting document:", error);

            var notification = document.querySelector('.mdl-js-snackbar');
            var snackbar_data = {
                  message: 'Error; could not load student information.',
                  timeout: 5000
            };
            // Display snackbar notification
            notification.MaterialSnackbar.showSnackbar(snackbar_data);
      });
}