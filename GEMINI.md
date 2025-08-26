# Armstrong Pullup Trainer

## Project Overview

This is a SvelteKit-based cross-platform application for the Armstrong Pullup Program. It is designed to be a progressive web app (PWA) and a native mobile app using Capacitor. The application uses IndexedDB to store user workout data and is built with Svelte and TypeScript.

## Building and Running

### Development

To run the application in development mode, use the following command:

```bash
npm run dev
```

### Building

To build the application for production, use the following command:

```bash
npm run build
```

### Testing

To run the unit tests, use the following command:

```bash
npm run test:unit
```

To run the end-to-end tests, use the following command:

```bash
npm run test:e2e
```

To run all tests, use the following command:

```bash
npm run test
```

## Development Conventions

### Code Style

The project uses Prettier for code formatting and ESLint for linting. To format the code, run:

```bash
npm run format
```

To check for linting errors, run:

```bash
npm run lint
```

### Testing

The project uses Vitest for unit tests and Playwright for end-to-end tests. Test files are located alongside the source files with the `.test.ts` or `.spec.ts` extension.

### Git Hooks

The project uses Husky for Git hooks. A pre-commit hook is configured to run `lint-staged`, which formats the code before committing.

---

Svelte is a JavaScript framework for building user interfaces. It's known for its compiler-based approach, which results in highly efficient vanilla JavaScript code at build time. This means smaller bundle sizes and faster runtime performance compared to traditional frameworks that rely on a virtual DOM.

Svelte 5, the latest version, introduces runes, a new reactivity model that provides more granular control over component updates. This makes it even more powerful and flexible for building complex applications.

This document provides a brief overview of Svelte and its core concepts, which should be helpful for an LLM tasked with writing Svelte components.

## Core Concepts

### Components

Svelte applications are built from components, which are reusable blocks of HTML, CSS, and JavaScript. A component is defined in a `.svelte` file.

```svelte
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>

<style>
	h1 {
		color: blue;
	}
</style>
```

### Reactivity

In Svelte 5, reactivity is powered by runes. Runes are special symbols that tell the Svelte compiler how to handle state changes.

- `$state`: Declares a reactive variable.
- `$derived`: Creates a computed value that depends on other reactive variables.
- `$effect`: Runs a side effect whenever a reactive variable changes.

```svelte
<script>
	let count = $state(0);
	let double = $derived(count * 2);

	$effect(() => {
		console.log(`The count is ${count}`);
	});

	function increment() {
		count++;
	}
</script>

<button on:click={increment}>
	Clicks: {count}
</button>

<p>{count} * 2 = {double}</p>
```

### Props

Components can receive data from their parents through props. In Svelte 5, props are declared using the `$props` rune.

```svelte
<!-- Child.svelte -->
<script>
	let { name } = $props();
</script>

<h2>Hello {name}!</h2>
```

```svelte
<!-- Parent.svelte -->
<script>
	import Child from './Child.svelte';
</script>

<Child name="Alice" />
```

### Dynamic Components

Svelte provides a special `<svelte:component>` tag that allows you to render a component dynamically.

```svelte
<script>
	import Foo from './Foo.svelte';
	import Bar from './Bar.svelte';

	let selected = $state(Foo);
</script>

<select bind:value={selected}>
	<option value={Foo}>Foo</option>
	<option value={Bar}>Bar</option>
</select>

<svelte:component this={selected} />
```

This should be enough to get you started with writing Svelte 5 components. For more information, refer to the official Svelte documentation.
