import { Route, Routes } from 'react-router-dom'
import Chat from '../pages/Chat/index.jsx'
import Home from '../pages/Home/index.jsx'
import Profile from '../pages/Profile/index.jsx'
function RouterLink() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chat' element={<Chat />}  />
                <Route path='/profile' element={<Profile />}  />
            </Routes>
        </>
    )
}

export default RouterLink