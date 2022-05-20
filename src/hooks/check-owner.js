// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params

    const listId = context.id

    let list = await context.app.service('lists').get(listId, context.params)
    if (user._id.toString() != list.userId.toString()) {
      throw new Error('Only the owner of this list can modify or delete it!')
    }

    return context;
  };
};
