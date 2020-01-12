// Load list of students into dashboard

var search_options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
            'name',
            'number'
      ]
};

function update_results(student_data) {
      var search_string = $('#student-search').val();
      if (search_string != undefined && search_string.length > 0) {
            var results = fuse_students.search(search_string);
      } else {
            var results = student_data;
      }

      $('#student-list').empty();
      console.log(search_string)

      // Use Firebase search function OR
      // Create search function inside of callback OR
      // Search and load results outside (after)

      // If --> all results or ?
      results.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc);
            data = doc;

            // Load data as row in table
            student_row = $('<tr id="' + doc.id + '"><td class="mdl-data-table__cell--non-numeric">' + data.name + '</td><td>' + data.number + '</td><td>' + data.grade + '</td><td>' + data.total_hours + '</td></tr>');
            // Bind event listener for click to display student info dialog box
            student_row.click(() => {
                  view_student(doc.id);
            });

            $('#student-list').append(student_row);
      });
}

db.collection('students')
      // Sort by name
      .orderBy('name')
      // Limit to 10 students
      .limit(100)
      // Get values
      .get()
      .then(function(querySnapshot) {
            // $('#student-list .mdl-progress').remove();
            // $('div.mdl-progress').append($('<tbody id="student-list">'));

            console.log('Retrieved student information');

            // var student_data = querySnapshot.map(doc => doc.data());
            var student_data = [];
            querySnapshot.forEach(doc => student_data.push(doc.data()));

            fuse_students = new Fuse(student_data, search_options);
            $('#student-search').on('input', () => {
                  update_results(student_data);
            });
            update_results(student_data);
      })
      // Catch errors
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });