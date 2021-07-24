export const postData = async (url, body) => {
	const response = await fetch(url, {
		method: 'POST',
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`,
			'Content-Type':'application/json'
		},
		body: JSON.stringify(body)
	})
	const data = await response.json();
	return data
}

export const deleteRequest = async (url) => {
	await fetch(url, {
		method: 'DELETE',
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`,
		},
	})
}