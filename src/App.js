import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserForm from './UserForm';
import Developers from './Developers';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="/developers">Developers</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<UserForm />} exact />
          <Route path="/developers" element={<Developers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
