import { useEffect, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { checklistData } from '../data/dummyResponse';
import BASE_URL from '../services/baseUrl';
import axios from 'axios';

const ChecklistHome = () => {
	const [checklistData, setChecklistData] = useState([]);
	const [checklistInput, setChecklistInput] = useState('');

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const url = `${BASE_URL}/checklist`;

	const auth = useMemo(() => {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	}, [token]);

	const handleSession = useCallback(() => {
		if (!token) {
			navigate('/login');
		}
	}, [navigate, token]);

	const fetchData = useCallback(() => {
		axios
			.get(url, auth)
			.then((response) => {
				setChecklistData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [url, auth]);

	useEffect(() => {
		handleSession();
		fetchData();
	}, [fetchData, handleSession]);

	function handleDelete(id) {
		const deleteUrl = `${url}/${id}`;

		axios
			.delete(deleteUrl, auth)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleDetail(id) {
		navigate(`/checklist-detail/${id}`);
	}

	function handlePostChecklist(e) {
		e.preventDefault();

		axios
			.post(url, { name: checklistInput }, auth)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			<div className='bg-gray-200 h-screen'>
				<div className='bg-gray-200 justify-center items-center flex pt-8'>
					<div>
						<div className='justify-center items-center flex flex-col mb-8'>
							<form
								onSubmit={(e) => handlePostChecklist(e)}
								className='flex flex-col'
							>
								<input
									type='text'
									placeholder='Add Checklist'
									className='px-3 py-2 rounded'
									onChange={(e) => {
										setChecklistInput(e.target.value);
									}}
									required
								/>
								<button className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'>
									Submit
								</button>
							</form>
						</div>

						{checklistData?.data?.length > 0 ? (
							<table className='border-collapse border border-slate-500 mb-8'>
								<thead>
									<tr>
										<th className='border border-slate-600'>Checklist</th>
										<th className='border border-slate-600' colSpan={2}>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{checklistData?.data?.map((item, index) => (
										<tr key={index}>
											<td className='border border-slate-700'>{item?.name}</td>
											<td className='border border-slate-700'>
												<button
													className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'
													onClick={() => handleDetail(item.id)}
												>
													Detail
												</button>
											</td>
											<td className='border border-slate-700'>
												<button
													className='py-2 px-2 bg-red-900 hover:bg-red-800 rounded text-white mt-2'
													onClick={() => handleDelete(item.id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>no data found</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChecklistHome;
