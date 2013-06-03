if (Posts.find().count() == 0) {
  Posts.insert({
    title: 'Introduzindo o Telescópio',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteoro',
    author: 'Tom Coleamn',
    url: 'http://meteor.com'
  
  });

  Posts.insert({
    title: 'O livro do meteoro',
    author: 'Tom Coleman',
    url: 'http://themeteorbook.com'
  });
}
