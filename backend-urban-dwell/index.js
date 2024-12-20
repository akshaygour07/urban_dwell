const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./src/config/db");
const authSchema = require("./src/schemas/authSchema");
const userSchema = require("./src/schemas/userSchema");
const authResolver = require("./src/resolvers/authResolver");
const userResolver = require("./src/resolvers/userResolver");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
connectDB();

const context = async ({ req }) => {
  const token = req.headers.authorization || '';
  let user = null;

  if (token) {
    const decoded = verifyToken(token.replace('Bearer ', ''));
    user = await User.findById(decoded.userId);
  }

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs: [authSchema, userSchema],
  resolvers: [authResolver, userResolver],
  context
  // uploads: false,
  
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
