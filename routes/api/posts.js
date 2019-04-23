const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// post model
const Post = require("../../models/Post");
//profile Model
const Profile = require("../../models/Profile");

//post validation
const validatePostInput = require("../../validation/post");

router.get("/test", (req, res) => {
  res.json({
    msg: "posts test"
  });
});

//@route GET api/posts
//@desc  Get Posts
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostfound: "No Post Found!" }));
});

//@route GET api/posts/:id
//@desc  Get Post by id
//@access public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post Found With That Id!" })
    );
});

//@route POST api/posts
//@desc  Create Post
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

//@route DELETE api/posts/:id
//@desc  Delete Post
//@access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        //check the owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User Not Authoeized" });
        }
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "Post Not Found" })
          );
      });
    });
  }
);

//@route POST api/posts/like/:id
//@desc  Like a Post
//@access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: "User Already Liked This Post" });
          }
          // Add user id to likes array

          post.likes.unshift({ user: req.user.id });
          post.save().then(post => {
            res.json(post);
          });
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found!" }));
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc  UNLike a Post
//@access private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ Notliked: "You haven't yet Liked This Post" });
          }
          // get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //splice out of the array
          post.likes.splice(removeIndex, 1);
          //save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found!" }));
    });
  }
);

//@route POST api/posts/comment/:id
//@desc  Comment to a Post
//@access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //add to comment array

        post.comments.unshift(newComment);
        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "no post found" }));
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  Delete a Comment from a  Post
//@access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Commetn doesnot exists" });
        }

        //get remove index

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice  comment out of the array

        post.comments.splice(removeIndex, 1);

        //save

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "no post found" }));
  }
);

module.exports = router;
