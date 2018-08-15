import React, { Fragment } from 'react'
import Form from '../export'

export default class HomePage extends React.Component {
	render() {
		return (
			<Form>
				{({loading, error, success}) => (
					<div>
						{loading && `Loading...`}
						{error && `Error.`}
						{success && `Success.`}
						{!loading && !success && <Fragment>
							<div>
								<input type='text' name='Name' required />
							</div>
							<div>
								<textarea name='Message' required />
							</div>
							<div>
								<button>Submit</button>
							</div>
						</Fragment>}
					</div>
				)}
			</Form>
		)
	}
}
