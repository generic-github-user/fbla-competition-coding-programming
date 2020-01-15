// Load list of students into dashboard

// Fuzzy search options
var search_options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      // Search student name and number
      keys: [
            'name',
            'number'
      ]
};

// Update table of students based on search results
function update_results(student_data) {
      // Get search term
      var search_string = $('#student-search').val();
      // If the user has entered a search term, search for it
      if (search_string != undefined && search_string.length > 0) {
            var results = fuse_students.search(search_string);
      }
      // Otherwise, use all data
      else {
            var results = student_data;
      }

      $('#student-list').empty();
      console.log('Searching for ' + search_string)

      // Use Firebase search function OR
      // Create search function inside of callback OR
      // Search and load results outside (after)

      // If --> all results or ?
      results.forEach(function(doc) {
            data = doc;

            var csa_icon = '';
            if (data.csa_category == 'CSA Community') {
                  csa_icon = '<i class="material-icons">done</i>';
            } else if (data.csa_category == 'CSA Service') {
                  csa_icon = '<i class="material-icons">done_all</i>';
            } else if (data.csa_category == 'CSA Achievement') {
                  csa_icon = '<i class="material-icons">star_outline</i>';
            } else if (data.csa_category == 'n/a') {
                  csa_icon = '<i class="material-icons">radio_button_unchecked</i>';
            }

            // Load data as row in table
            student_row = $('<tr id="' + doc.id + '"><td class="mdl-data-table__cell--non-numeric">' + data.name + '</td><td>' + data.number + '</td><td>' + data.grade + '</td><td>' + data.total_hours + '</td><td><span class="csa-category">' + csa_icon + data.csa_category + '</span></td></tr>');
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
            //merge id in
            querySnapshot.forEach(doc => student_data.push({
                  ...doc.data(),
                  ...{
                        'id': doc.id
                  }
            }));
            console.log(student_data)

            // Create a new fuse search query from the student data
            fuse_students = new Fuse(student_data, search_options);
            // Update results when search query is updated
            $('#student-search').on('input', () => {
                  update_results(student_data);
            });
            // Update on start (once data is loaded; we're still in the .then())
            update_results(student_data);
      })
      // Catch errors
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });