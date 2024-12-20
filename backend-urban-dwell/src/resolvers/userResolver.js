const {
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userResolver = {
  Query: {
    user: async (_, { id }) => {
      return await findUserById(id);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      return await createUser(input);
    },
    updateUser: async (_, { id, input }) => {
      return await updateUser(id, input);
    },
    deleteUser: async (_, { id }) => {
      return await deleteUser(id);
    },
  },
};

module.exports = userResolver;
