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

db = firebase.firestore();
$('dialog button.confirm').click(function() {
      var name = $('dialog input#student-name').val();
      var number = $('dialog input#student-number').val();
      var grade = $('dialog input#student-grade').val();
      db.collection("students").add({
                  name: name,
                  number: number,
                  grade: grade,
                  total_hours: 0
            })
            .then(function(docRef) {
                  console.log("Document written with ID: ", docRef.id);

                  var notification = document.querySelector('.mdl-js-snackbar');
                  var snackbar_data = {
                        message: 'Added student: ' + name + ' [' + grade + ']',
                        actionHandler: function(event) {},
                        actionText: 'View',
                        timeout: 5000
                  };
                  notification.MaterialSnackbar.showSnackbar(snackbar_data);
            })
            .catch(function(error) {
                  console.error("Error adding document: ", error);
            });
      dialog.close();
});