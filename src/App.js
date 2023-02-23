import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Header from "./componenet/Header";
import Todo from "./page/Todo";
import { useState } from "react";
import { getAccessToken } from "./util/AccessToken";
function App() {
  const [isLogin, setIsLogin] = useState(getAccessToken());

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route
            path="/"
            element={<Home isLogin={isLogin} setIsLogin={setIsLogin}></Home>}
          />
          <Route
            path="/signup"
            element={<SignUp setIsLogin={setIsLogin}></SignUp>}
          />
          <Route path="/todo" element={<Todo isLogin={isLogin}></Todo>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
