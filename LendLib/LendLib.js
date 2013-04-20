lists = new Meteor.Collection('Lists');

if (Meteor.isClient) {
  Template.categories.lists = function () {
    return lists.find({}, {sort: {Category: 1}});
  };

  // flag para mostrar ou não o campo #add-category
  Session.set('adding_category', false);

  // seta a flag em uma variável de template new_cat
  Template.categories.new_cat = function () {
    return Session.equals('adding_category', true);
  };

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

  Template.list.items = function () {
    if (Session.equals('current_list', null)) {
      return null;
    }else{
      var cats = lists.findOne({_id:Session.get('current_list')});
      if (cats && cats.items) {
        for (var i = 0; i < cats.items.length; i++) {
          var d = cats.items[i];
          d.Lendee = d.LentTo ? d.LentTo : 'free';
          d.LendClass = d.LentTo ? 'label-important' : 'label-success';
        }
        return cat.items;
      }
    }
  };

  Template.list.list_selected = function () {
    return ((Session.get('current_list') != null) &&
      (!Session.equals('current_list'), null));
  };

  Template.categories.list_status = function () {
    if (Session.equals('current_list', this._id)) {
      return '';
    }else{
      return ' btn-inverse';
    }
  };

  Template.list.list_adding = function () {
    return (Session.equals('list_adding', true));
  };

  Template.list.lendee_editing = function () {
    return (Session.equals('lendee_input', this.Name));
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
