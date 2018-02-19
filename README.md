# react-netlify-form

WIP

A React component to make using Netlify & React forms easier.

## Installation

With npm:

```bash
npm install --save react-netlify-form
```

With Yarn:

```bash
yarn add react-netlify-form
```

## Usage

```jsx
<NetlifyForm
	name='Contact'
	render={state => (
		<div>
			{ state.loading && 'Loading...' }
			{ state.error && 'Error.' }
			{ state.success && 'Success.' }
			<input type='text' name='Name' />
			<textarea name='Message' />
			<button>Submit</button>
		</div>
	)}
/>
```