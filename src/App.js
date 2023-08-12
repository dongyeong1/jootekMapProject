import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Kakaomap from "./pages/Kakaomap";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/kakaomap"
                        element={<Kakaomap></Kakaomap>}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
