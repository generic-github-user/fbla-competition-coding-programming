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