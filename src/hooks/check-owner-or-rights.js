// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { method, app, data } = context
    const { user } = context.params
    const userId = user._id
    const itemId = context.id
    let { listId } = data

    if (method !== 'create') {
      const item = await app.service('items').get(itemId)
      listId = item.listId
    }
    const list = await app.service('lists').get(listId)
    if (list.userId.toString() !== userId.toString() && list.rights.some(r => r.userId.toString() !== userId.toString())) {
      throw new Error("Only the owner and people with rights to access this list can perform CRUD operations with items!")
    }

    return context;
  };
};
