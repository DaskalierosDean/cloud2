'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const commentStore = require('../models/comment-store.js');

const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    const viewData = {
      title: 'About Webmark 1',
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comments: commentStore.getAllcomments()
    };
    response.render('about', viewData);
  },
addComment(request, response) {
  const newComment = {
    id: uuid(),
    name: request.body.name,
    comment: request.body.comment
  };
  commentStore.addComment(newComment);
  response.redirect('/about');
},
  
  deleteComment(request, response){
    const commentId = request.params.commentId;
    commentStore.removeComment(commentId);
    response.redirect('/about');
  },
};

module.exports = about;
