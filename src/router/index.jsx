import Header from '$/components/Header';
import Loader from '$/components/Loader';
import Home from '$/pages/Home';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Recovery from '../pages/Reset Password/recovery';
import Request from '../pages/Reset Password/request';
import EmailSent from '../pages/Response/emailSent';
import PageNotFound from '../pages/Response/pageNotFound';
import ServerError from '../pages/Response/serverError';
import Success from '../pages/Response/success';
const Login = lazy(() => import('$/components/AuthLayout/login.jsx'));
const SignUp = lazy(() => import('$/components/AuthLayout/signUp.jsx'));
const Chat = lazy(() => import ('$/pages/Chat'));
const RouterController = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Header><Home /></Header> }/>
                <Route path="/about" element={<Header><About /></Header> }/>
                <Route path="/contact" element={<Header><Contact /></Header> }/>
                <Route path="/blog" element={<Header><Blog /></Header> }/>
                <Route path="/user/login" element={<Header><Login /></Header> }/>
                <Route path="/user/register" element={<Header><SignUp /></Header> }/>
                <Route path="/request-password" element={<Header><Request /></Header> }/>
                <Route path="/recovery-password" element={<Header><Recovery /></Header> }/>
                <Route path="/chat" element={<Chat /> }/>
                <Route path="/email-sent" element={<Header><EmailSent /></Header> }/>
                <Route path="/email-verification/success" element={<Header><Success /></Header> }/>
                <Route path="/page-not-found" element={<PageNotFound />}/>
                <Route path="/server-error" element={<ServerError />}/>
            </Routes>
        </Suspense>
    );
};

export default RouterController;
