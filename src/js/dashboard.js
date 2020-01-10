// Dialog handling
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

function loggedout() {
      if (!firebase.auth().user) {
            window.location.href = './login.html';
      }
}
firebase.auth().onAuthStateChanged(loggedout);
loggedout();