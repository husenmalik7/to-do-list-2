import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../services/baseUrl';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();

	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [result, setResult] = useState('');
	const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

	function handleLogin(e) {
		e.preventDefault();

		const url = `${BASE_URL}/login`;

		axios
			.post(url, {
				username: username,
				password: password,
			})
			.then((response) => {
				localStorage.setItem('token', response.data.data.token);
				setResult('Login berhasil, mengarahkan ke dashboard');
				setIsRegisterSuccess(true);

				navigate('/checklist-home');
			})
			.catch((error) => {
				console.log(error);
				setIsRegisterSuccess(false);
				setResult(error.response.data.errorMessage || 'terjadi kesalahan');
			});
	}

	return (
		<>
			<div className='bg-gray-200 w-screen h-screen justify-center items-center flex'>
				<form
					className='flex flex-col max-w-60'
					onSubmit={(e) => handleLogin(e)}
				>
					<h2 className='my-2 text-xl justify-center flex'>Login</h2>
					<input
						type='text'
						placeholder='username'
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						className='mb-4 px-3 py-2 rounded'
						required
					/>
					<input
						type='password'
						placeholder='password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className='mb-4 px-3 py-2 rounded'
						required
					/>
					<button className='py-2 bg-blue-900 rounded text-white'>
						Submit
					</button>
					{isRegisterSuccess ? (
						<p className='text-green-500'>{result}</p>
					) : (
						<p className='text-red-500'>{result}</p>
					)}

					<div className='flex mt-2'>
						<p>Belum punya akun?</p>
						<button
							className='mx-1 text-blue-800'
							onClick={() => navigate('/register')}
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
