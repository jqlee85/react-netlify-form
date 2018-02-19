import React from 'react'
import { render } from 'react-dom'
import NetlifyForm from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<NetlifyForm
		silent
		render={state => (
			<div>
				{state.loading && 'Loading...'}
				{state.error && 'Error.'}
				{state.success && 'Success.'}
				<input type='text' name='email' />
				<button>Submit</button>
			</div>
		)}
		/>,
	containerEl
)