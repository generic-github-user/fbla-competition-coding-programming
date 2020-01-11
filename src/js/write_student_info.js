// Versatile function for creating new students and updating student data
// function write_student_info(selector, message, write_method, method_name) {
function write_student_info(selector, message, doc_id) {
      // Store student info in variables
      // Name
      var name = $(selector + ' input#student-name').val();
      // Student number
      var number = $(selector + ' input#student-number').val();
      var grade = $(selector + ' input#student-grade').val();
      var hours = $(selector + ' input#student-total_hours').val();

      // Upload to database using specified write method (i.e. firebase.firestore().collection("students").add for adding a new student)
      // Error is thrown if method name (.add) is included in write method
      // i.e. we cannot do firebase.firestore().collection("students").add(data)

      var student_data = {
            name: name,
            number: number,
            grade: grade,
            total_hours: hours,
            updated: new Date().getTime(),
            updated_by: firebase.auth().currentUser.uid
      };

      // Set data at ID doc_id - create document if it does not exist
      var docRef = firebase.firestore().collection("students").doc(doc_id);
      docRef.get().then(function(doc) {
            if (!doc.exists) {
                  new_data = {
                        created: new Date().getTime(),
                        created_by: firebase.auth().currentUser.uid
                  }

            } else {
                  new_data = {
                        created: doc.data().created,
                        created_by: doc.data().created_by
                  }
            }

            student_data = {
                  ...student_data,
                  ...new_data
            }
            docRef.set(student_data)
                  .then(function() {
                        // Log successful operation to console
                        console.log("Document written with ID: ", doc_id);

                        // Display notification with link to view student
                        var notification = document.querySelector('.mdl-js-snackbar');
                        var snackbar_data = {
                              message: message + name + ' [' + grade + ']',
                              actionHandler: function(event) {
                                    view_student(doc_id);
                              },
                              actionText: 'View',
                              // Timeout before hiding notification
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
      }).catch(function(error) {
            console.log("Error getting document:", error);
      });

}