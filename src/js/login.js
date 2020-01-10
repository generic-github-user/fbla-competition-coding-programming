// Attempt to sign in on button press
$('button#log-in').click(function() {
      // Collect account information
      var email = $('input#email').val();
      var password = $('input#password').val();
      // Create account
      firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(result) {
                  window.location.replace('./index.html');
            }).catch(function(error) {
                  console.error(error);
            });

      // Reset input fields
      $('input#email').val('');
      $('input#password').val('');

      // Redirect to home page
      window.location.replace("./index.html");
});