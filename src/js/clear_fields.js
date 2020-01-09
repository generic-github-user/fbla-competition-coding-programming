// Dependent on jQuery

function clear_fields(container) {
      container.find('input.mdl-textfield__input').val('');
      container.find('div.mdl-textfield.mdl-js-textfield').removeClass('is-dirty');
      // container.find('form')[0].reset();
      // MaterialTextfield.change(container.find('input.mdl-textfield__input'));
}