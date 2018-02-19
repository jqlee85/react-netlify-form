import React from 'react'
import fetch from 'fetch-retry'
import serialize from 'form-serialize'

function isClientSide(){
	return !!(
		(typeof window !== 'undefined' &&
			window.document && window.document.createElement)
	)
}

class ReactNetlifyForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
	}
	async onSubmit(e){
		e.preventDefault()

		this.setState({
			loading: true,
			error: false,
			success: false,
		})

		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With': 'XMLHttpRequest',
		}
		let body = serialize(this.form)
		console.log(body)

		let res = await fetch(this.props.action, {
			method: 'POST',
			body,
			headers,
		})
		if(res.status !== 200){
			return this.setState({
				loading: false,
				error: res.statusText,
				success: false,
			})
		}
		this.setState({
			loading: false,
			success: res,
			error: false,
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
				data-netlify-honeypot='bf'
			>
				{this.props.render(this.state)}
				<input type='hidden' name='form-name' value={this.props.name} />
				<input type='text' name='bf' style={{
					display: 'none'
				}} />
			</form>
		)
	}
}

ReactNetlifyForm.defaultProps = {
	name: 'Form',
	action: 'thank-you',
}

export default ReactNetlifyForm