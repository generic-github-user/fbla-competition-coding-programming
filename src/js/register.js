// Register new account on button press
$('button#register').click(function() {
      // Collect account information
      var email = $('input#email').val();
      var password = $('input#password').val();
      // Create account
      firebase.auth().createUserWithEmailAndPassword(email, password);
      // Redirect to home back
      window.location.replace("./index.html");
});