import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ChecklistHome from './pages/ChecklistHome';
import ChecklistDetail from './pages/ChecklistDetail';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/checklist-home' element={<ChecklistHome />} />
					<Route path='/checklist-detail/:id' element={<ChecklistDetail />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
