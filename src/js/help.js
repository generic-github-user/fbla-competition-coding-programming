$(document).ready(function() {
      var topic = new URL(window.location.href).searchParams.get('topic');
      var article_info = help_articles.find((a) => a.link == topic);
      console.log(article_info)

      $('#help-title').text(article_info.title);
      var path = './docs/' + topic + '.html';

      // check if app is running inside electron
      // var userAgent = navigator.userAgent.toLowerCase();
      // if (userAgent.indexOf(' electron/') == -1) {
      //       path = topic + '.html';
      // } else {
      //       console.log(app.getAppPath());
      // }

      // var userAgent = navigator.userAgent.toLowerCase();
      // if (userAgent.indexOf(' electron/') > -1) {
      //       console.log(True)
      // }

      // console.log(app.getAppPath());
      // Why is the error showing up even if this is commented out?
      $('#help-content').load(path);
});