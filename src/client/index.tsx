import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from "common/App";
import theme from "common/theme";
import { changeTitle } from "common/redux/reducers/title";
import createEmotionCache from "common/createEmotionCache";
import { CssBaseline } from "@mui/material";

const preloadedState = (window as any)["__PRELOADED_STATE__"];
delete (window as any)["__PRELOADED_STATE__"];

const store = Redux.createStore(changeTitle, preloadedState);
const cache = createEmotionCache();

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <Router>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </CacheProvider>
        </Router>
    </ReduxProvider>,
    document.getElementById("root")
);