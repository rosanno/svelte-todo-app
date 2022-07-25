<script>
	// @ts-nocheck
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BsMoonFill from 'svelte-icons-pack/bs/BsMoonFill';
	import BsSunFill from 'svelte-icons-pack/bs/BsSunFill';
	import FormComponent from '../components/FormComponent.svelte';
	import TodosComponent from '../components/TodosComponent.svelte';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let todos = [];
	let title = '';
	let theme;

	onMount(async () => {
		if (localStorage.getItem('theme') === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		theme = localStorage.getItem('theme');

		const res = await fetch('http://localhost:3004/todos');
		todos = await res.json();
	});

	const addTodo = async (e) => {
		e.preventDefault();

		const newTodo = {
			id: uuidv4(),
			userId: 2,
			title: title,
			completed: false
		};

		title = '';

		const res = await fetch('http://localhost:3004/todos', {
			method: 'POST',
			body: JSON.stringify(newTodo),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await res.json();
		todos = [...todos, result];
	};

	const toggleDarkMode = () => {
		if (localStorage.getItem('theme') === 'dark') {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
			localStorage.setItem('theme', 'light');
			theme = localStorage.getItem('theme');
		} else {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			theme = localStorage.getItem('theme');
		}
	};

	const handleChange = (e) => {
		title = e.target.value;
	};
</script>

<div class="bg-img">
	<div class="h-[300px] max-w-lg mx-auto pt-10 relative z-10">
		<div class="flex justify-between items-center px-6 lg:px-0">
			<h2 class="text-xl md:text-2xl lg:text-3xl text-white font-bold uppercase">todo</h2>
			<div class="cursor-pointer">
				{#if theme === 'light'}
					<div on:click={toggleDarkMode}>
						<Icon src={BsSunFill} color="white" size="25px" />
					</div>
				{:else}
					<div on:click={toggleDarkMode}>
						<Icon src={BsMoonFill} color="white" size="25px" />
					</div>
				{/if}
			</div>
		</div>
		<FormComponent {addTodo} {handleChange} {title} />
		<div>
			<TodosComponent {todos} />
		</div>
	</div>
</div>
