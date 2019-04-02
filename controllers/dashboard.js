'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'PictureStore Dashboard',
      user: loggedInUser,
      album: pictureStore.getAlbum(loggedInUser.id),
      collection: bookmarklistStore.getBookmarklistCollection(loggedInUser.id),
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('dashboard', viewData);
  },

  deleteBookmarklist(request, response) {
    const bookmarklistId = request.params.id;
    logger.debug(`Deleting Bookmarklist ${bookmarklistId}`);
    bookmarklistStore.removeBookmarklist(bookmarklistId);
    response.redirect('/dashboard');
  },
  
   addBookmark(request, response) {
    const newBookmark = {
      id: uuid(),
      title: request.body.title,
      bookmarks: [],
    };
    bookmarklistStore.addBookmark(newBookmark);
    response.redirect('/dashboard');
  },
  
    uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/dashboard');
    });
    },
      
    deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },
  
   deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
    };

module.exports = dashboard;
