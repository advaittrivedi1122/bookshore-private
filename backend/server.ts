import dotenv from "dotenv";
dotenv.config();
import http, { Server } from "http";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import cors from "cors";
import connectDb from "./database/db";
import { MyContext } from "./utils/interfaces";
import authContext from "./graphql/context";

// establish connection to mongoDb
connectDb();

async function main() {

    const app: express.Express = express();

    const httpServer: Server = http.createServer(app);

    const apolloServer: ApolloServer = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
        includeStacktraceInErrorResponses : false,
        formatError: (formattedError: any, error: any): any => {
            if (formattedError.message) {
                return {
                    error : formattedError.message,
                    path : formattedError.path
                }
            }
            return formattedError;
        }
    })

    // start apollo graphql server
    await apolloServer.start();

    // set graphql server as middleware
    app.use(
        '/graphql',
        cors<cors.CorsRequest>({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200
        }),
        express.json(),
        expressMiddleware(apolloServer, {
            context: authContext
        })
    );

    httpServer.listen(process.env.PORT)
    console.log("Server started listening on port", process.env.PORT);

}



// Global catch implementaion for safety purpose
main()
.catch((error: any) => {
    console.log("🚀 ~ main error:", error)

});