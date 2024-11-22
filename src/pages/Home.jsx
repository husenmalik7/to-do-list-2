import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className='bg-gray-200 w-screen h-screen justify-center items-center flex'>
				<div>
					<h2>Welcome to to do list</h2>
					<div className='mt-4 flex flex-col'>
						<button
							className='py-2 bg-blue-900 rounded text-white mt-2'
							onClick={() => navigate('/register')}
						>
							Register
						</button>
						<button
							className='py-2 bg-blue-900 rounded text-white mt-2'
							onClick={() => navigate('/login')}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
