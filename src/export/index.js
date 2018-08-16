import React from 'react'
import Recaptcha from 'react-google-recaptcha'
import onSubmit from './on-submit'
import onSuccess from './on-success'
import onError from './on-error'
import onRecaptchaChange from './on-recaptcha-change'
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
		this.onRecaptchaChange = onRecaptchaChange.bind(this)
	}
	render(){
		const {
			name,
			action,
			honeypotName,
			recaptcha,
		} = this.props
		return (
			<form
				ref={el => this.form = el}
				onSubmit={this.onSubmit}
				name={name}
				action={action}
				data-netlify='true'
				data-netlify-honeypot={honeypotName}
				data-netlify-recaptcha={!!recaptcha}
			>
				<input
					type='hidden'
					name='form-name'
					value={name}
				/>
				<input
					ref={el => this.honeypot = el}
					type='text'
					name={honeypotName}
					style={{ display: `none` }}
				/>
				{this.props.children({
					...this.state,
					recaptcha:
						<Recaptcha
							{...recaptcha}
							ref={el => this.recaptchaEl = el}
							onChange={this.onRecaptchaChange}
						/>,
				})}
			</form>
		)
	}
}

NetlifyForm.defaultProps = defaultProps

export default NetlifyForm