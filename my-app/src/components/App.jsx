import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NotesPage from "./NotesPage";
import LoginPage from "./LoginPage";
import RequireAuth from "./RequireAuth";
import Signup from "./Signup";
import Logout from "./Logout";

function App() {
  return (
    <>
      <BrowserRouter>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>

        <Routes>

          <Route index element={<RequireAuth> <NotesPage /> </RequireAuth>} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
