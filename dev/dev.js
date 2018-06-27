import React from 'react'
import { render } from 'react-dom'
import Recaptcha from 'react-recaptcha'
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
				<p>{state.error}</p>
			}
			{state.success &&
				<p>We have received your message and will get back to you as soon as possible!</p>
			}
			{!state.success &&
				<div style={{
						display: state.loading ? 'none' : 'block'
					}}>
					<input type='text' name='email' />
					<Recaptcha sitekey='6Lcg9A4UAAAAAJt4z7SDzNIr-5bRQkZJa-q6d-LS' />
					<button>Submit</button>
				</div>
			}
		</div>
	)}</NetlifyForm>,
	containerEl
)