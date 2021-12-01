import * as React from "react";
import { Routes, Route,  } from "react-router-dom";

import Home from "./pages/Home";

const App = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </React.Fragment>
    );
}
export default App;