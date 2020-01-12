$(document).ready(function() {
      var topic = new URL(window.location.href).searchParams.get('topic');
      var article_info = help_articles.find((a) => a.link == topic);
      console.log(article_info)

      $('#help-title').text(article_info.title);
      $('#help-content').load('/src/docs/' + topic + '.html');
});