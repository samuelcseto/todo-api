const { authenticate } = require('@feathersjs/authentication').hooks;

const checkOwnerOrRights = require('../../hooks/check-owner-or-rights');

const populateUserid = require('../../hooks/populate-userid');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), checkOwnerOrRights(), populateUserid()],
    update: [authenticate('jwt'), checkOwnerOrRights()],
    patch: [authenticate('jwt'), checkOwnerOrRights()],
    remove: [authenticate('jwt'), checkOwnerOrRights()]
  },

  after: {
    all: [],
    find: [],
    get: [],
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
