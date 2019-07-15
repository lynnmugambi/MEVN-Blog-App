const express = require('express');
const Post = require("../models/post");

const app = express.Router();

app.route('/posts')
  .get((req, res) => {
    Post.find({}, 'title description', (error, posts) => {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({ _id: -1 })
  })

  // Add new post
  .post((req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
      title: title,
      description: description
    })

    new_post.save((error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  })

  //delete all posts
  .delete((req, res) => {
    Post.deleteMany({}, (err, post) => {
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
  })

//Fetch single post
app.route('/posts/:id')
  .get((req, res) => {
    Post.findById(req.params.id, 'title description', (error, post) => {
      if (error) { res.send(error); }
      if (post == null) {
        res.send({
          "error": "This ID cannot be found."
        })
      }
      res.send(post)
    })
  })

  // Update a post
  .put((req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { res.send(error); }

      if (!post) {
        res.send({
          "error": "This ID can not be found"
        })
      } else {
        post.title = req.body.title
        post.description = req.body.description
        post.save((error) => {
          if (error) {  
            console.log(error)
          }
          res.send({
            success: "Post has been updated"
          })
        })
      }
    })
  })

  //delete single post
  .delete((req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err, post) => {
      if (err)
        res.send(err)

      console.log(post)
      if (post.deletedCount == 0) {
        res.send({
          "error": "This ID cannot be found."
        })
      }

      res.send({
        success: "Post deleted!"
      })
    })
  })

module.exports = app;