const { login, signup } = require("../controllers/authController");

const authResolver = {
  Mutation: {
    login: async (_, { input }) => {
      const token = await login(input.email, input.password);
      return { token };
    },
    signup: async (_, { input }) => {
      const user = await signup(
        input.firstName,
        input.lastName,
        input.email,
        input.password,
      );
      return user;
    },
  },
};

module.exports = authResolver;
