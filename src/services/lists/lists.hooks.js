const { authenticate } = require('@feathersjs/authentication').hooks;

const populateItems = require('../../hooks/populate-items');

const checkOwner = require('../../hooks/check-owner');

const populateUserid = require('../../hooks/populate-userid');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), populateUserid()],
    update: [authenticate('jwt'), checkOwner()],
    patch: [authenticate('jwt'), checkOwner()],
    remove: [authenticate('jwt'), checkOwner()]
  },

  after: {
    all: [],
    find: [populateItems()],
    get: [populateItems()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
