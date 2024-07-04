import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate as Redirect,
} from "react-router-dom";
import DeviceList from "./components/DeviceList";
import DeviceDetail from "./components/DeviceDetail";
import { Apollo } from "./config/apolloConfig";

const App = () => {
  return (
    <Apollo>
      <Router>
        <Routes>
          <Route path="/devices/:id" element={<DeviceDetail />} />
          <Route path="/" element={<DeviceList />} />
          <Route path="*" element={<Redirect to="/" />} />
        </Routes>
      </Router>
    </Apollo>
  );
};

export default App;
