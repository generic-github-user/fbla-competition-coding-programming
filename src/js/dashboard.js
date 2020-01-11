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
      // Upload to database
      db.collection("students").add({
                  name: name,
                  number: number,
                  grade: grade,
                  total_hours: 0
            })
            .then(function(docRef) {
                  // Log successful operation to console
                  console.log("Document written with ID: ", docRef.id);

                  var notification = document.querySelector('.mdl-js-snackbar');
                  var snackbar_data = {
                        message: 'Added student: ' + name + ' [' + grade + ']',
                        actionHandler: function(event) {},
                        actionText: 'View',
                        timeout: 5000
                  };
                  // Display snackbar notification
                  notification.MaterialSnackbar.showSnackbar(snackbar_data);
            })
            // Catch errors and log to console
            .catch(function(error) {
                  console.error("Error adding document: ", error);

                  var notification = document.querySelector('.mdl-js-snackbar');
                  var snackbar_data = {
                        message: 'Error; could not add student.',
                        timeout: 5000
                  };
                  // Display snackbar notification
                  notification.MaterialSnackbar.showSnackbar(snackbar_data);
            });
      // Close dialog box
      dialog.close();
});

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

db.collection('students')
      .orderBy('name')
      .limit(10)
      .get()
      .then(function(querySnapshot) {
            console.log('Retrieved student information');
            querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  data = doc.data();

                  student_row = $('<tr id="' + doc.id + '"><td class="mdl-data-table__cell--non-numeric">' + data.name + '</td><td>' + data.number + '</td><td>' + data.grade + '</td><td>' + data.total_hours + '</td></tr>');
                  student_row.click(() => {
                        view_student(doc.id);
                  });

                  $('#student-list').append(student_row);
            });
      })
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });


function loggedout() {
      if (firebase.auth().currentUser == null) {
            window.location.href = './login.html';
      }
}

firebase.auth().onAuthStateChanged(loggedout);
window.setTimeout(loggedout, 1000);