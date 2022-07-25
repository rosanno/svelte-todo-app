/** @type {import('./__types/todos').RequestHandler} */
export async function GET() {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos');
	const todos = await res.json();

	if (todos) {
		return {
			status: 200,
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			},
			body: { todos }
		};
	}

	return {
		status: 404
	};
}
