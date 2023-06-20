import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './map';
import About from './about';
import UsedData from './used_data';
import Profile from './profile';
import { Amplify} from 'aws-amplify';
import awsConfig from './aws-exports';
import { withAuthenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
// import './css/login.css'

Amplify.configure(awsConfig);


function App({ signOut, user }) {
  return (
    <div className="login-container"> {/* Wrap with your custom container */}
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map/*" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/used_data" element={<UsedData />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;

