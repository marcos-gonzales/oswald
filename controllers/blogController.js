const db = require('../models/db');


exports.getIndex = function(req, res) {
  res.render('index');
};

exports.getData = function(req, res) {
  db.query("SELECT * FROM blog_post", (error, results, fields) => {
  if(error) throw error;
    res.json(results);
  })
};

exports.postBlog = function(req, res) {
  db.query(`INSERT INTO blog_post (id, author, subject, post) VALUES(null, '${req.body.author}', '${req.body.subject}', '${req.body.post}')`)
  req.flash( 'success','you have successfully created this post'); 
  res.redirect('/')
};

exports.deletePost = function(req, res) {
  db.query(`DELETE FROM blog_post WHERE id="${req.params.id}"`, (error, results, fields) => {
    if(error) throw error;
    req.flash('success', 'You have successfully deleted a post');
    res.redirect('/');
  })
};