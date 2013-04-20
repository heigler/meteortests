lists = new Meteor.Collection('Lists');

if (Meteor.isClient) {
  Template.categories.lists = function () {
    return lists.find({}, {sort: {Category: 1}});
  }

  // flag para mostrar ou não o campo #add-category
  Session.set('adding_category', false);

  // seta a flag em uma variável de template new_cat
  Template.categories.new_cat = function () {
    return Session.equals('adding_category', true);
  }

  Template.categories.events({
    'click #btnNewCat': function (e, t) {
      Session.set('adding_category', true);
      // limpa o DOM
      Meteor.flush();
      focusText(t.find('#add-category'));
    },

    'keyup #add-category': function (e, t) {
      // tecla Enter/return pressionada
      if (e.which === 13) {
        // força que o valor do campo seja uma string
        var catVal = String(e.target.value || '');
        if (catVal) {
          lists.insert({Category: catVal});
          // limpa o valor do campo
          e.target.value = '';
        }
      }
    },

    // quando o campo #add-category perde foco o botão + aparece (flag)
    'focusout #add-category': function (e, t) {
      Session.set('adding_category', false);
    }
  });

  // função auxiliar que recebe uma instancia DOM foca nela e a seleciona
  function focusText (i) {
    i.focus();
    i.select();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
