'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarklistStore = {

  store: new JsonStore('./models/bookmarklist-store.json', { bookmarklistCollection: [] }),
  collection: 'bookmarklistCollection',

  getBookmarklistCollection() {
    return this.store.findAll(this.collection);
  },

  getBookmarklist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
    getUserBookmarklist(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeBookmarklist(id) {
    const bookmark = this.getBookmarklist(id);
    this.store.remove(this.collection, bookmark);
  },

  removeBookmark(id, bookmarkId) {
    const bookmarklist = this.getBookmarklist(id);
    const bookmarks = bookmarklist.bookmarks;
    _.remove(bookmarks, { id: bookmarkId});
  },

    addBookmark(bookmark) {
    this.store.add(this.collection, bookmark);
  },
  
  addWebsite(id, webId){
    const bookmarklist = this.getBookmarklist(id);
    bookmarklist.bookmarks.push(webId);
  },
  
}

module.exports = bookmarklistStore;
