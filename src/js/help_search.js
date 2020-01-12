// const {
//       app,
//       BrowserWindow
// } = require('electron')

var help_dialog = document.querySelector('dialog#help-search');
if (!help_dialog.showModal) {
      dialogPolyfill.registerDialog(help_dialog);
}
$('#help-button').click(function() {
      help_dialog.showModal();
});
help_dialog.querySelector('.close').addEventListener('click', function() {
      help_dialog.close();
});

var search_options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
            'title',
            'link',
            'keywords'
      ]
};

var fuse = new Fuse(help_articles, search_options);

$('#help-search-input').on('input', function() {
      var search_string = $('#help-search-input').val();
      var results = fuse.search(search_string);
      $('#help-search-results').empty();
      console.log(search_string)

      for (var i = 0; i < results.length; i++) {
            // var url = '//docs/' + results[i].link + '.html';
            // var url = window.origin + '/src/docs/' + results[i].link + '.html';
            // var url = '/src/docs/help.html?topic=' + results[i].link;
            var url = './docs/help.html?topic=' + results[i].link;

            // var userAgent = navigator.userAgent.toLowerCase();
            // if (userAgent.indexOf(' electron/') > -1) {
            //       url = app.getAppPath() + url;
            // }

            $('#help-search-results').append($('<li class="mdl-list__item mdl-list__item--three-line"><span class="mdl-list__item-primary-content">\<i class="material-icons mdl-list__item-avatar">help_outline</i><span><a href="' + url + '">' + results[i].title + '</span><span class="mdl-list__item-text-body">Keywords: ' + results[i].keywords.split(' ').join(', ') + '</span></li>'))
      }
});