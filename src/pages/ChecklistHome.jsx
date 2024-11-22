import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChecklistHome = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(() => {
		handleSession();
	}, []);

	function handleSession() {
		console.log(token);
		if (!token) {
			navigate('/login');
		}
	}

	return (
		<>
			<div className='bg-gray-200 w-screen h-screen justify-center items-center flex'>
				<div>
					<h2>Dashboard</h2>
					<p>localStorage = {token}</p>
				</div>
			</div>
		</>
	);
};

export default ChecklistHome;
