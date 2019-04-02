'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');

const start = {
  index(request, response) {
    logger.info('start rendering');
     const viewData = {
      title: 'Welcome to Webmark 1',
      description: 'This app enables you to manage your bookmarks. You can organise them into categories and share them with your friends and colleagues.',
    };
    response.render('start', viewData);
  },
};

module.exports = start;
