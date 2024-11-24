import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BASE_URL from '../services/baseUrl';
import axios from 'axios';

const ChecklistDetail = () => {
	const navigate = useNavigate();
	const params = useParams();
	const token = localStorage.getItem('token');
	const url = `${BASE_URL}/checklist/${params.id}/item`;

	const [checklistItemData, setChecklistItemData] = useState([]);
	const [checklistItemInput, setChecklistItemInput] = useState('');
	const [isShowRenameBox, setIsShowRenameBox] = useState(false);
	const [activeItemId, setActiveItemId] = useState('');
	const [activeItemName, setActiveItemName] = useState('');
	const [checklistItemRename, setChecklistItemRename] = useState('');
	const [isShowDetailBox, setIsShowDetailBox] = useState(false);
	const [detailData, setDetailData] = useState({});

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
				setChecklistItemData(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [url, auth]);

	useEffect(() => {
		handleSession();
		fetchData();
	}, [fetchData, handleSession]);

	function handleDeleteItem(id) {
		const deleteUrl = `${url}/${id}`;

		axios
			.delete(deleteUrl, auth)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.log(error);
			});

		setIsShowRenameBox(false);
		setIsShowDetailBox(false);
	}

	function handleUpdateStatus(id) {
		const updateStatusUrl = `${url}/${id}`;

		axios
			.put(updateStatusUrl, {}, auth)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.log(error);
			});

		setIsShowRenameBox(false);
		setIsShowDetailBox(false);
	}

	function showRenameBox(id, name) {
		setActiveItemId(id);
		setActiveItemName(name);
		setIsShowRenameBox(true);
		setIsShowDetailBox(false);
	}

	function handleRename(e) {
		e.preventDefault();

		const renameUrl = `${url}/rename/${activeItemId}`;

		axios
			.put(renameUrl, { itemName: checklistItemRename }, auth)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				console.log(error);
			});

		setActiveItemName('');
		setActiveItemId('');
		setChecklistItemRename('');
		setIsShowRenameBox(false);
	}

	function showDetailBox(id) {
		setIsShowDetailBox(true);
		setIsShowRenameBox(false);

		const detailUrl = `${url}/${id}`;

		axios
			.get(detailUrl, auth)
			.then((response) => {
				setDetailData(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handlePostChecklistItem(e) {
		e.preventDefault();

		axios
			.post(url, { itemName: checklistItemInput }, auth)
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
							<button
								onClick={() => navigate('/checklist-home')}
								className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2 mb-8'
							>
								Kembali ke Checklist
							</button>

							<form
								onSubmit={(e) => handlePostChecklistItem(e)}
								className='flex flex-col'
							>
								<input
									type='text'
									placeholder='Add Checklist Item'
									className='px-3 py-2 rounded'
									onChange={(e) => {
										setChecklistItemInput(e.target.value);
									}}
									required
								/>
								<button className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'>
									Submit
								</button>
							</form>
						</div>

						{isShowRenameBox ? (
							<form onSubmit={(e) => handleRename(e)} className='flex flex-col'>
								<input
									type='text'
									placeholder={`Rename For Item ${activeItemName}`}
									value={checklistItemRename}
									className='px-3 py-2 rounded'
									onChange={(e) => {
										setChecklistItemRename(e.target.value);
									}}
									required
								/>
								<button className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2 mb-2'>
									Submit
								</button>
							</form>
						) : (
							<></>
						)}

						{isShowDetailBox ? (
							<>
								Detail Item
								<table className='border-collapse border border-slate-500 mb-8'>
									<thead>
										<tr>
											<th className='border border-slate-600'>Attribute</th>
											<th className='border border-slate-600'>Content</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className='border border-slate-700'>id</td>
											<td className='border border-slate-700'>
												{detailData.id}
											</td>
										</tr>
										<tr>
											<td className='border border-slate-700'>name</td>
											<td className='border border-slate-700'>
												{detailData.name}
											</td>
										</tr>
										<tr>
											<td className='border border-slate-700'>status</td>
											<td className='border border-slate-700'>
												{detailData.itemCompletionStatus ? 'true' : 'false'}
											</td>
										</tr>
									</tbody>
								</table>
							</>
						) : (
							<></>
						)}

						{checklistItemData?.length > 0 ? (
							<table className='border-collapse border border-slate-500 mb-8'>
								<thead>
									<tr>
										<th className='border border-slate-600'>Checklist Item</th>
										<th className='border border-slate-600'>Status</th>
										<th className='border border-slate-600' colSpan={4}>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{checklistItemData?.map((item, index) => (
										<tr key={index}>
											<td className='border border-slate-700'>{item?.name}</td>
											<td className='border border-slate-700'>
												{item?.itemCompletionStatus === true
													? 'completed'
													: 'not completed'}
											</td>
											<td className='border border-slate-700'>
												<button
													className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'
													onClick={() => handleUpdateStatus(item.id)}
												>
													Update Status
												</button>
											</td>
											<td className='border border-slate-700'>
												<button
													className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'
													onClick={() => showRenameBox(item.id, item.name)}
												>
													Rename
												</button>
											</td>
											<td className='border border-slate-700'>
												<button
													className='py-2 px-2 bg-blue-900 hover:bg-blue-800 rounded text-white mt-2'
													onClick={() => showDetailBox(item.id)}
												>
													Detail
												</button>
											</td>
											<td className='border border-slate-700'>
												<button
													onClick={() => handleDeleteItem(item.id)}
													className='py-2 px-2 bg-red-900 hover:bg-red-800 rounded text-white mt-2'
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

export default ChecklistDetail;
