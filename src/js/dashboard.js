function auth_change() {
      if (firebase.auth().currentUser == null) {
            window.location.href = './login.html';
      }

      var email = firebase.auth().currentUser.email;
      $('#profile-info span.mdl-chip__contact').text(email[0].toUpperCase());
      $('#profile-info span.mdl-chip__text').text('Logged in as ' + email);
}


db = firebase.firestore();
firebase.auth().onAuthStateChanged(auth_change);
window.setTimeout(auth_change, 1000);