import Header from '$/components/Header';
import Loader from '$/components/Loader';
import Home from '$/pages/Home';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('$/components/AuthLayout/login.jsx'));
const SignUp = lazy(() => import('$/components/AuthLayout/signUp.jsx'));
const Chat = lazy(() => import ('$/pages/Chat'));

const RouterController = () => {
    return (
        <Suspense fallback={<Loader />}>
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
                    path="/user/login"
                    element={
                        <Header>
                            <Login />
                        </Header>
                    }
                />
                <Route
                    path="/user/register"
                    element={
                        <Header>
                            <SignUp />
                        </Header>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <Chat />
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default RouterController;
