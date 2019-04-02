'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const bookmarklist = require('./controllers/bookmarklist.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


router.post('/dashboard/addBookmark', dashboard.addBookmark);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);


router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletebookmarklist/:id', dashboard.deleteBookmarklist);
router.get('/about', about.index);
router.get('/bookmarklist/:id', bookmarklist.index);
router.get('/bookmarklist/:id/deletebookmark/:bookmarkid', bookmarklist.deleteBookmark);
router.get('/dashboard/deletepicture', dashboard.deletePicture);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);


router.get('/about', about.index);
router.post('/about/addcomment', about.addComment);
router.post('/dashboard/addbookmarkGroup', dashboard.addBookmark);

module.exports = router;
