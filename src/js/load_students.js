// Load list of students into dashboard

db.collection('students')
      // Sort by name
      .orderBy('name')
      // Limit to 10 students
      .limit(10)
      // Get values
      .get()
      .then(function(querySnapshot) {
            // $('#student-list .mdl-progress').remove();
            // $('div.mdl-progress').append($('<tbody id="student-list">'));

            console.log('Retrieved student information');
            querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  data = doc.data();

                  // Load data as row in table
                  student_row = $('<tr id="' + doc.id + '"><td class="mdl-data-table__cell--non-numeric">' + data.name + '</td><td>' + data.number + '</td><td>' + data.grade + '</td><td>' + data.total_hours + '</td></tr>');
                  // Bind event listener for click to display student info dialog box
                  student_row.click(() => {
                        view_student(doc.id);
                  });

                  $('#student-list').append(student_row);
            });
      })
      // Catch errors
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });