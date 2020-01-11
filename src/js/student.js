student_id = new URL(window.location.href).searchParams.get('student_id');

function get_name(user_id) {
      return 'Phil';
}

// Get student data from database
firebase.firestore().collection('students').doc(student_id).get().then(function(doc) {
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
                  var field = $('input#student-' + properties[i]);
                  // Set value
                  field.val(data[properties[i]]);
                  // Mark input as filled
                  field.parent().addClass('is-dirty');
            }

            $('#student-created').text('Added: ' + new Date(data.created));
            $('#student-created-by').text('Added by: ' + get_name(data.created_by));
            $('#student-updated').text('Updated: ' + new Date(data.updated));
            $('#student-updated-by').text('Updated most recently by: ' + get_name(data.updated_by));

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