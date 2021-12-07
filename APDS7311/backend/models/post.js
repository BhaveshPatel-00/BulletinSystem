/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true}
});

module.exports = mongoose.model('Post', postSchema);
