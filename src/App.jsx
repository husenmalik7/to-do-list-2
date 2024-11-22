import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ChecklistHome from './pages/ChecklistHome';


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/checklist-home' element={<ChecklistHome />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
