$('button#register').click(function() {
      var email = $('input#email').val();
      var password = $('input#password').val();
      firebase.auth().createUserWithEmailAndPassword(email, password);
      window.location.replace("./index.html");
});