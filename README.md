# react-netlify-form

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
<NetlifyForm>{formState => (
		<div>
			{ formState.loading && 'Loading...' }
			{ formState.error && 'Error.' }
			{ formState.success && 'Success.' }
			<input type='text' name='Name' required />
			<textarea name='Message' required />
			<button>Submit</button>
		</div>
)}</NetlifyForm>
```

**Note:** In order for Netlify to find your forms, [they must be server-side rendered](https://www.netlify.com/docs/form-handling/) somewhere. If you use react-netlify-form on the client side accidently, it will display a warning in the console, but the form will still render. You can work around this by adding a hidden form that renders on the server somewhere.

## Optional properties

- `name`: The form name that will show up in your Netlify dashboard. Default: `"Form"`
- `canSubmit`: Set this to false to disable the form. Useful for things like live validation. Default: `true`
- `onSubmit`: A function that runs as soon as the form is submit.
- `onSuccess`: A function that runs as soon as the data has successfully posted to Netlify.
- `onError`: A function that runs if there are errors posting to Netlify.
- `validate`: A promise function that runs before form submission. Return `true` to prevent the form from submitting.
- `honeypotName`: The name of the honeypot field. Default: `"__bf"`
- `silent`: Silence console warnings. Default: `false`