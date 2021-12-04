import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as Express from "express";
import * as Redux from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from "common/App";
import theme from "common/theme";
import { changeTitle } from "common/store/title/reducers";
import { CssBaseline } from "@mui/material";
import createEmotionCache from "common/createEmotionCache";
import * as users from "./api/users";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";

declare const module: any;

function main() {

    // initialize configuration
    dotenv.config();

    const express = Express();
    const port = process.env.SERVER_PORT;

    express.use(Express.static("build"));

    // Configure auth
    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.SECRET,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: 'https://dev--ph6y342.us.auth0.com'
    };
    express.use(auth(config));

    // Configure user api
    users.register(express);

    express.get("/*", (req, res, next) => {
        const store = Redux.createStore(changeTitle);
        const cache = createEmotionCache();
        const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

        const appHTML = ReactDOM.renderToString(
            <ReduxProvider store={store}>
                <StaticRouter location={req.path}>
                    <CacheProvider value={cache}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <App />
                        </ThemeProvider>
                    </CacheProvider>
                </StaticRouter>
            </ReduxProvider>
        );
        // Grab the CSS from emotion
        const emotionChunks = extractCriticalToChunks(appHTML);
        const emotionCss = constructStyleTagsFromChunks(emotionChunks);
        const appInitialState = JSON.stringify(store.getState()).replace(
            /</g,
            "\\u003c"
        );

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>TypeScript ReactJS SSR App</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <style>
                        body {
                            margin: 0px;
                            padding: 0px;
                        }
                    </style>
                    ${emotionCss}
                </head>
                <body>
                    <main id="root">${appHTML}</main>
                    <script>
                        window["__PRELOADED_STATE__"] = ${appInitialState}
                    </script>
                    <script type="application/javascript" src="bundle.js"></script>
                </body>
            </html>
        `);
        res.end();
        next();
    });

    const server = express.listen(port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
    }
}

main();