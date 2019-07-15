const express = require('express');
const Post = require("../models/post");

const app = express.Router();

app.route('/posts')
  .get((req, res) => {
    Post.find({}, 'title description', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({ _id: -1 })
  })

  // Add new post
  .post((req, res) => {
    //var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
      title: title,
      description: description
    })

    new_post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  })

  .delete((req, res) => {
    var db = req.db;
    Post.deleteMany({}, function (err, post) {
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
  })

module.exports = app;