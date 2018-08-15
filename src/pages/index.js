import React, { Fragment } from 'react'
import Form from '../export'

export default class HomePage extends React.Component {
	render() {
		return (
			<Form
				name='test'
				recaptcha={{
					size: `normal`,
					sitekey: `6LeJKWoUAAAAAMDOdGVWk8gjYv9AUb1emJHkOmP0`,
				}}
			>
				{({loading, error, success, recaptcha}) => (
					<div>
						{loading && `Loading...`}
						{error && `Error.`}
						{success && `Success.`}
						{!loading && !success &&
							<Fragment>
								<div>
									<input type='text' name='Name' required />
								</div>
								<div>
									<textarea name='Message' required />
								</div>
								<div>
									{recaptcha}
								</div>
								<div>
									<button>Submit</button>
								</div>
							</Fragment>
						}
					</div>
				)}
			</Form>
		)
	}
}
