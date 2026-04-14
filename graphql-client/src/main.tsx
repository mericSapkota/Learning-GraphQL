import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { BrowserRouter } from "react-router-dom";

//
const client = new ApolloClient({
  link: new HttpLink({
    // uri: "/graphql",  rick and morty api
    uri: "http://localhost:4000/graphql", // your own graphql server
  }),
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
