import React from 'react'
import onSubmit from './on-submit'
import onSuccess from './on-success'
import onError from './on-error'
import defaultProps from './default-props'

class NetlifyForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
		}
		this.onSubmit = onSubmit.bind(this)
		this.onSuccess = onSuccess.bind(this)
		this.onError = onError.bind(this)
	}
	render(){
		return (
			<form
				ref={el => this.form = el}
				onSubmit={this.onSubmit}
				name={this.props.name}
				action={this.props.action}
				data-netlify='true'
				data-netlify-honeypot={this.props.honeypotName}
			>
				<input
					type='hidden'
					name='form-name'
					value={this.props.name}
				/>
				<input
					ref={el => this.honeypot = el}
					type='text'
					name={this.props.honeypotName}
					style={{
						display: `none`,
					}}
				/>
				{ this.props.children(this.state) }
			</form>
		)
	}
}

NetlifyForm.defaultProps = defaultProps

export default NetlifyForm