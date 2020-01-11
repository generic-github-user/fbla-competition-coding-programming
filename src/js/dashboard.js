function loggedout() {
      if (firebase.auth().currentUser == null) {
            window.location.href = './login.html';
      }
}

firebase.auth().onAuthStateChanged(loggedout);
window.setTimeout(loggedout, 1000);