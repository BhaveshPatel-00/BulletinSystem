/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "asdklmkmgdfmoplghqawee");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!"});
  }
};
