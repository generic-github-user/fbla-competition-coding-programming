// Versatile function for creating new students and updating student data
// function write_student_info(selector, message, write_method, method_name) {
function write_student_info(selector, message, doc_id) {
      // Store student info in variables
      var name = $(selector + ' input#student-name').val();
      var number = $(selector + ' input#student-number').val();
      var grade = $(selector + ' input#student-grade').val();
      var hours = $(selector + ' input#student-total_hours').val();

      // Upload to database using specified write method (i.e. firebase.firestore().collection("students").add for adding a new student)
      // console.log(write_method[method_name])
      // if (write_method = 1) {
      //       write_method =firebase.firestore().collection("students")
      // }

      // Error is thrown if method name (.add) is included in write method
      // i.e. we cannot do firebase.firestore().collection("students").add(data)
      // write_method[method_name]({

      console.log({
            name: name,
            number: number,
            grade: grade,
            total_hours: hours,
            created: new Date().getTime(),
            created_by: firebase.auth().currentUser.uid
      })
      firebase.firestore().collection("students").doc(doc_id).set({
                  name: name,
                  number: number,
                  grade: grade,
                  total_hours: hours,
                  created: new Date().getTime(),
                  created_by: firebase.auth().currentUser.uid
            })
            .then(function() {
                  // Log successful operation to console
                  console.log("Document written with ID: ", doc_id);

                  var notification = document.querySelector('.mdl-js-snackbar');
                  var snackbar_data = {
                        message: message + name + ' [' + grade + ']',
                        actionHandler: function(event) {
                              view_student(doc_id);
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
                  snackbar('Error; could not add student information.');
            });
}