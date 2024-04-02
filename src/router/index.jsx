import Header from '$/component/Header'
import Chat from '$/pages/Chat'
import Home from '$/pages/Home'
import { Route, Routes } from 'react-router-dom'
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
        </Routes>
    )
}

export default RouterController
