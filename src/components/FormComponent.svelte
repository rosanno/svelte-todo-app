<script>
	// @ts-nocheck
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BsCircle from 'svelte-icons-pack/bs/BsCircle';

	export let addTodo;
	export let handleChange;
	export let title;
</script>

<form on:submit={addTodo} class="mt-10 px-6 lg:px-0">
	<div class="w-full bg-white dark:bg-slate-800 px-4 py-2 flex items-center space-x-4 rounded-sm">
		<div class="text-gray-600">
			<Icon src={BsCircle} size="20px" />
		</div>
		<input
			type="text"
			name="addTodo"
			value={title}
			on:change={handleChange}
			placeholder="Create a new todo..."
			class="w-full outline-none border-0 py-1 text-black dark:bg-transparent dark:text-white"
		/>
	</div>
</form>
