import axios from 'axios';
import { useState } from 'react';
import BASE_URL from '../services/baseUrl';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [result, setResult] = useState('');
	const [isLoginSuccess, setIsLoginSuccess] = useState(false);

	function handleRegister(e) {
		e.preventDefault();

		const url = `${BASE_URL}/register`;

		axios
			.post(url, {
				email: email,
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.status === 200) {
					setResult('Register berhasil');
					setIsLoginSuccess(true);
				} else {
					setIsLoginSuccess(false);
					setResult('Terjadi kesalahan');
				}
			})
			.catch((error) => {
				setIsLoginSuccess(false);
				setResult('Terjadi kesalahan');
				console.log(error);
			});
	}

	return (
		<div className='bg-gray-200 w-screen h-screen justify-center items-center flex'>
			<form className='flex flex-col' onSubmit={(e) => handleRegister(e)}>
				<h2 className='my-2 text-xl justify-center flex'>Register</h2>
				<input
					type='email'
					placeholder='email'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					className='mb-4 px-3 py-2 rounded'
					required
				/>
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
				<button className='py-2 bg-blue-900 rounded text-white'>Submit</button>
				{isLoginSuccess ? (
					<p className='text-green-500'>{result}</p>
				) : (
					<p className='text-red-500'>{result}</p>
				)}

				<div className='flex mt-2'>
					<p>Punya akun?</p>
					<button
						className='mx-1 text-blue-800'
						onClick={() => navigate('/login')}
					>
						Masuk
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
