import React from 'react'
import { render } from 'react-dom'
import NetlifyForm from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<NetlifyForm silent>{state => (
		<div>
			{state.loading &&
				<p>Loading...</p>
			}
			{state.error &&
				<p>There was an error processing your request. Please try again later</p>
			}
			{state.success &&
				<p>We have received your message and will get back to you as soon as possible!</p>
			}
			{!state.success &&
				<div style={{
						display: state.loading ? 'none' : 'block'
					}}>
					<input type='text' name='email' />
					<button>Submit</button>
				</div>
			}
		</div>
	)}</NetlifyForm>,
	containerEl
)