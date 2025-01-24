// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import AppHeader from "./components/AppHeader";
/* import BalanceBar from './components/BalanceBar'; */
import BottomNavigation from "./components/BottomNavigation";
import MapView from "./pages/MapView";
/* import { WalletView } from './pages/WalletView';
import { ProfileView } from './pages/ProfileView'; */
import "./App.css";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div className="app">
                    <AppHeader style="z-index: 100;"/>
                    {/* <BalanceBar /> */}
                    <Routes>
                        <Route path="/map" element={<MapView />} />
                        {/* <Route path="/wallet" element={ <WalletView /> } />
            <Route path="/profile" element={ <ProfileView /> } /> }
                        */}
                        <Route path="/" element={<Navigate to="/map" replace />} />
                    </Routes>
                    <BottomNavigation />
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
