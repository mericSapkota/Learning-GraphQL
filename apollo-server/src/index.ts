import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { initDatabase } from "./db";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "4000");

async function startServer() {
  await initDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(console.error);
