// Load list of hourss into dashboard

// Fuzzy search options
var search_options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      // Search hours name and number
      keys: [
            'description'
      ]
};

// Update table of events based on search results
function update_results(hours_data) {
      // Get search term
      var search_string = $('#hours-search').val();
      // If the user has entered a search term, search for it
      if (search_string != undefined && search_string.length > 0) {
            var results = fuse_hourss.search(search_string);
      }
      // Otherwise, use all data
      else {
            var results = hours_data;
      }

      $('#hours-list').empty();
      console.log('Searching for ' + search_string)

      // Use Firebase search function OR
      // Create search function inside of callback OR
      // Search and load results outside (after)

      // If --> all results or ?
      results.forEach(function(doc) {
            data = doc;

            // Load data as row in table
            hours_row = $('<tr id="' + doc.id + '"><td class="mdl-data-table__cell--non-numeric">' + data.description + '</td><td>' + data.number + '</td><td>' + data.date + '</td></tr>');
            // Bind event listener for click to display hours info dialog box
            hours_row.click(() => {
                  view_hours(doc.id);
            });

            $('#service-list').append(hours_row);
      });
}

firebase.firestore().collection('hours').where('student', '==', student_id)
      // or focused_student_id ?
      // Sort by name
      .orderBy('date')
      // Limit to 10 hourss
      .limit(100)
      // Get values
      .get()
      .then(function(querySnapshot) {
            console.log('Retrieved event information');

            // var hours_data = querySnapshot.map(doc => doc.data());
            var hours_data = [];
            //merge id in
            querySnapshot.forEach(doc => hours_data.push({
                  ...doc.data(),
                  ...{
                        'id': doc.id
                  }
            }));

            // Create a new fuse search query from the volunteer event data
            fuse_hours = new Fuse(hours_data, search_options);
            // Update results when search query is updated
            $('#hours-search').on('input', () => {
                  update_results(hours_data);
            });
            // Update on start (once data is loaded; we're still in the .then())
            update_results(hours_data);
      })
      // Catch errors
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });