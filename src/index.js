import React from 'react'
import fetch from 'isomorphic-fetch'
import isClientSide from './is-client-side'
import noop from './noop'

class NetlifyForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onSuccess = this.onSuccess.bind(this)
		this.onError = this.onError.bind(this)
	}
	async onSubmit(e){
		e.preventDefault()
		if(!this.props.canSubmit) return

		this.setState({
			loading: true,
			error: false,
			success: false,
		})

		let body = new FormData(this.form)

		let notValid = await this.props.validate(body)
		if (notValid){
			return this.setState({
				loading: false,
				error: false,
				success: false,
			})
		}

		this.props.onSubmit(body)

		let res = await fetch(this.props.action, {
			method: 'POST',
			body,
		})
		if (res.status !== 200) {
			return this.onError(res.statusText)
		}
		this.onSuccess(body)
	}
	onSuccess(body) {
		this.props.onSuccess(body)
		this.setState({
			loading: false,
			success: body,
			error: false,
		})
	}
	onError(err) {
		this.props.onError(err)
		return this.setState({
			loading: false,
			error: err,
			success: false,
		})
	}
	render(){
		if(!this.props.silent && isClientSide()){
			console.warn(`Netlify form rendered on client side. This form may not submit properly unless rendered server-side.`)
		}
		return (
			<form
				ref={form => this.form = form}
				onSubmit={this.onSubmit}
				name={this.props.name}
				action={this.props.action}
				data-netlify='true'
				data-netlify-honeypot={this.props.honeypotName}
				>
				<input type='hidden' name='form-name' value={this.props.name} />
				<input type='text' name={this.props.honeypotName} style={{
					display: 'none'
				}} />
				{ this.props.children(this.state) }
			</form>
		)
	}
}

NetlifyForm.defaultProps = {
	name: 'Form',
	action: 'thank-you',
	canSubmit: true,
	onSubmit: noop,
	onSuccess: noop,
	onError: noop,
	validate: noop,
	silent: false,
	honeypotName: '__bf',
}

export default NetlifyForm