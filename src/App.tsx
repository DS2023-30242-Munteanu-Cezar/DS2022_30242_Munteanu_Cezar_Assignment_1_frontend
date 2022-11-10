import './App.css';
import { Route, Routes } from "react-router-dom";
import Main from './main/main';
import LoginProvider from './contexts/login_context';
import UsersProvider from './contexts/users_context';
import DeviceProvider from './contexts/device_context';
import MeasurementsProvider from './contexts/measurement_context';

function App() {
  return (
    <MeasurementsProvider>
      <DeviceProvider>
        <LoginProvider>
          <UsersProvider>
          <div>
            <Routes>
              <Route path="*" element={<Main />}></Route>
            </Routes>
          </div>
          </UsersProvider>
        </LoginProvider>
      </DeviceProvider>
    </MeasurementsProvider>
  );
}

export default App;
