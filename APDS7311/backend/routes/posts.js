/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

/*
Code Attribution
Varsity College APDS7311 LAB GUIDE Part A
https://learn-eu-central-1-prod-fleet01-xythos.learn.cloudflare.blackboardcdn.com/5f5880ccc4141/1747273?X-Blackboard-Expiration=1622300400000&X-Blackboard-Signature=rc5e9W17qyi7M5ZeaCe4iQdgVI6G07FGUMttY4A1cz8%3D&X-Blackboard-Client-Id=515070&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27ADPS%2520Lab%2520Guide%2520Complete.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210529T090000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PL5M5HI5WH%2F20210529%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=4656ea88610acfcf56266d9664cf513d76436b18a13e9aa0fd0c31e6dd68220c
Varsity College
https://www.varsitycollege.co.za/
*/

const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth,(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id:createdPost._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creation of post failed"
    })
  })
});

router.put("/:id", checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.nModified > 0){
      res.status(200).json({ message: "Update Successful!" });
    } else {
      res.status(401).json({ message: "Not Authorised!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Post could not be updated!"
    });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to fetch posts!"
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to fetch post!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then
    (result => {
      if (result.n > 0){
        res.status(200).json({ message: "Delete successful!" });
      } else {
        res.status(401).json({ message: "Not Authorised!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to delete post!"
      });
    });
});

module.exports = router;
