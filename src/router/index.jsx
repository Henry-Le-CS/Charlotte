import Header from '$/components/Header';
import Chat from '$/pages/Chat';
import Home from '$/pages/Home';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Login  = lazy(() => import('$/pages/Auth/login'));
const SignUp = lazy(() => import('$/pages/Auth/signUp'));

const RouterController = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Header>
                        <Home />
                    </Header>
                }
            />
            <Route
                path="/chat"
                element={
                    <Header>
                        <Chat />
                    </Header>
                }
            />
            <Route
                path='/user/login'
                element={
                    <Header>
                        <Login />
                    </Header>
                }
            />
            <Route
                path='/user/register'
                element={
                    <Header>
                        <SignUp />
                    </Header>
                }
            />
            {/* <Route
                path='/about'
                element={
                    <Header>
                        
                    </Header>
                }
            /> */}
            {/* <Route
                path='/blog'
                element={
                    <Header>
                        
                    </Header>
                }
            /> */}
            {/* <Route
                path='/pages'
                element={
                    <Header>
                        
                    </Header>
                }
            /> */}
            {/* <Route
                path='/contact'
                element={
                    <Header>
                        
                    </Header>
                }
            /> */}
            
            
            
            
        </Routes>
    )
}

export default RouterController
