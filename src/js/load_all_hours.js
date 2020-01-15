// Load list of hours into dashboard

// Fuzzy search options
var search_options = {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      // Search hours name and number
      keys: [
            'description',
            'student_name'
      ]
};

function add_row(data, name) {
      console.log(name)
      // Load data as row in table
      hours_row = $('<tr id="' + data.id + '"><td class="mdl-data-table__cell--non-numeric">' + name + '</td><td class="mdl-data-table__cell--non-numeric">' + data.description + '</td><td>' + data.number + '</td><td>' + data.date + '</td></tr>');
      // Bind event listener for click to display hours info dialog box
      hours_row.click(() => {
            view_hours(doc.id);
      });

      $('#service-list').append(hours_row);
}

// Superfund site
// async function get_student_names(docs) {
//       // return new Promise(resolve => {
//       var student_names = {};
//
//       await docs.forEach(function(data) {
//             if (!student_names[data.student]) {
//                   if (data.student) {
//                         firebase.firestore().collection('students').doc(data.student)
//                               .get()
//                               .then(
//                                     function(student_doc) {
//                                           if (student_doc.exists) {
//                                                 console.log("Document data:", student_doc.data());
//                                                 var name = student_doc.data().name;
//
//                                                 student_names[data.student] = name;
//                                           } else {
//                                                 console.log("No such document!");
//                                           }
//                                     })
//                               .catch(
//                                     function(error) {
//                                           console.log("Error getting document:", error);
//                                     }
//                               );
//                   }
//                   // else {
//                   //       name = 'Unknown';
//                   // }
//             }
//       });
//
//       return student_names;
//
//       // resolve(student_names);
//       // });
// }

// Update table of events based on search results
function update_service_results(hours_data) {
      // Get search term
      var search_string = $('#hours-search').val();
      // If the user has entered a search term, search for it
      if (search_string != undefined && search_string.length > 0) {
            var results = fuse_hours.search(search_string);
      }
      // Otherwise, use all data
      else {
            var results = hours_data;
      }

      $('#service-list').empty();
      console.log('Searching for ' + search_string)

      // Use Firebase search function OR
      // Create search function inside of callback OR
      // Search and load results outside (after)


      // function asyncCall() {
      //       // console.log('calling');
      //       console.log(get_student_names(results));
      //       // var names = await get_student_names(results);
      //       // .then(function(names) {
      //       console.log(names)
      //
      //       get_student_names.then(function(names) { // If --> all results or ?
      //             results.forEach(function(doc) {
      //                   data = doc;
      //
      //                   console.log(data.student)
      //                   add_row(doc, data, names[data.student] || 'Unknown');
      //             });
      //       })
      //       // });
      //       // console.log(get_student_names(results))
      // }


      results.forEach(function(hours_doc) {
            if (hours_doc.student) {
                  firebase.firestore()
                        .collection('students')
                        .doc(hours_doc.student)
                        .get()
                        .then(
                              function(student_doc) {
                                    if (student_doc.exists) {
                                          hours_doc.student_name = student_doc.data().name;
                                          add_row(hours_doc, student_doc.data().name);
                                    } else {
                                          console.log("No such document!");
                                    }
                              })
                        .catch(
                              function(error) {
                                    console.log("Error getting document");
                              }
                        );
            } else {
                  add_row(hours_doc, 'Unknown');
            }
      });
}

firebase.firestore().collection('hours')
      // Sort by name
      .orderBy('date')
      // Limit to 10 hours
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
            console.log(hours_data)

            // Create a new fuse search query from the volunteer event data
            fuse_hours = new Fuse(hours_data, search_options);
            // Update results when search query is updated
            $('#hours-search').on('input', () => {
                  update_service_results(hours_data);
            });
            // Update on start (once data is loaded; we're still in the .then())
            update_service_results(hours_data);
      })
      // Catch errors
      .catch(function(error) {
            console.log("Error getting documents: ", error);
      });