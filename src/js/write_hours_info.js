// Versatile function for creating new volunteer events and updating existing ones

function write_student_info(selector, message, doc_id) {
      // Store hours info in variables
      // Description
      var description = $(selector + ' input#hours-description').val();
      // Student number
      var number = $(selector + ' input#hours-number').val();
      // Grade
      var date = $(selector + ' input#hours-date').val();

      // Volunteer event (hours) data from input form
      var hours_data = {
            description: description,
            number: number,
            date: date,
            created: new Date().getTime(),
            created_by: firebase.auth().currentUser.uid
      };

      // Set data at ID doc_id - create document if it does not exist
      var docRef = firebase.firestore().collection('hours').doc(doc_id);
      docRef.get().then(function(doc) {
            new_data = {
                  created: hours_data.created,
                  created_by: hours_data.created_by
            }

            // Merge data from fields (name, number, grade, hours) and environment (time, current logged in user)
            hours_data = {
                  ...hours_data,
                  ...new_data
            }
            // Upload data to database
            docRef.set(hours_data)
                  .then(function() {
                        // Log successful operation to console
                        console.log("Document written with ID: ", doc_id);

                        // Display notification with link to view student
                        var notification = document.querySelector('.mdl-js-snackbar');
                        var snackbar_data = {
                              // Message to display in notification
                              message: message + description + ' [' + number + ' hours]',
                              // Callback function to view student when link is clicked
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
                        snackbar('Error; could not add volunteer event information.');
                  });
      }).catch(function(error) {
            console.log("Error getting document:", error);
      });

}