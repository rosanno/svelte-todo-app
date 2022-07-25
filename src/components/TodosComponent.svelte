<script>
	// @ts-nocheck
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BsCircle from 'svelte-icons-pack/bs/BsCircle';
	import CgTrash from 'svelte-icons-pack/cg/CgTrash';
	import BsCheckCircleFill from 'svelte-icons-pack/bs/BsCheckCircleFill';

	export let todos;

	const handleCompleteTodos = async (todo) => {
		const res = await fetch(`http://localhost:3004/todos/${todo.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title: todo.title,
				userId: todo.userId,
				completed: !todo.completed
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const completedTodo = await res.json();
		const todoIndex = todos.findIndex((todo) => todo.id === completedTodo.id);
		todos[todoIndex].completed = completedTodo.completed;
	};

	const deleteTodo = async (todo) => {
		await fetch(`http://localhost:3004/todos/${todo.id}`, {
			method: 'DELETE'
		});
		todos = todos.filter((t) => t.id !== todo.id);
	};
</script>

{#if todos}
	<div class="mt-7 px-6  lg:px-0">
		<ul class="bg-white dark:bg-slate-800 shadow-xl">
			{#each todos as todo}
				<li
					class={`
                        border-b
                      border-slate-400/10 
                        py-3 px-5 text-black dark:text-white 
                        last:border-b-0 flex 
						w-full
						relative
                        items-center space-x-4 cursor-pointer
                    `}
				>
					<div on:click={handleCompleteTodos(todo)} class="text-gray-600 hover:text-green-600">
						{#if todo.completed}
							<Icon src={BsCheckCircleFill} />
						{:else}
							<Icon src={BsCircle} />
						{/if}
					</div>
					<span class={`${todo.completed && 'line-through text-gray-600'} transition duration-500`}
						>{todo.title}</span
					>
					<div
						class="absolute right-5 text-gray-600 hover:text-red-500"
						on:click={deleteTodo(todo)}
					>
						<Icon src={CgTrash} />
					</div>
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<p>loading...</p>
{/if}
