function snackbar(text) {
      // Display notification at bottom of screen
      var notification = document.querySelector('.mdl-js-snackbar');
      var snackbar_data = {
            message: text,
            timeout: 5000
      };
      // Display snackbar notification
      notification.MaterialSnackbar.showSnackbar(snackbar_data);
}