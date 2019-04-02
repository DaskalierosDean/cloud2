'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const bookmarklist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const bookmarklistId = request.params.id;
    logger.debug('Bookmark id = ', bookmarklistId);
    if(loggedInUser){
    const viewData = {
      title: 'Bookmark List',
      bookmarklist: bookmarklistStore.getBookmarklist(bookmarklistId),
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('bookmarklist', viewData);
  }
    else response.redirect('/');
  },

  deleteBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarkId = request.params.bookmarkid;
    logger.debug(`Deleting Song ${bookmarkId} from Bookmark ${bookmarklistId}`);
    bookmarklistStore.removeBookmark(bookmarklistId, bookmarkId);
    response.redirect('/bookmarklist/' + bookmarklistId);
  },
  
      addWebsite(request, response) {
    const bookmarkId = request.params.id;
    const bookmark = bookmarklistStore.getBookmarklist(bookmarkId);
    const newWebsite = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
    };
    bookmarklistStore.addWebsite(bookmarkId, newWebsite);
    response.redirect('/bookmarklist/' + bookmarkId);
  },
  
};

module.exports =  bookmarklist;
