// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, method, result, params } = context

    const addItems = async list => {
      console.log(list)
      const items = await app.service('items').find({ query: {listId: list._id}})
      return {
        ...list,
        items
      }
    }

    if (method === 'find') {
      result.data = await Promise.all(result.data.map(addItems))
    } else {
      context.result = await addItems(result)
    }

    return context;
  };
};
