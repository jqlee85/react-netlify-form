import fetch from 'isomorphic-fetch'

async function onSubmit(e) {
	e.preventDefault()
	if (!this.props.canSubmit) return
	if(this.honeypot.value){
		console.error(`Honeypot value is set. Cannot submit form.`)
		return
	}

	this.setState({
		loading: true,
		error: false,
		success: false,
	})

	let body = new FormData(this.form)
	for (let pair of body.entries()) {
		if (pair[0] === `g-recaptcha-response` && !pair[1]){
			return this.onError(this.props.recatpchaError)
		}
	}

	let notValid = await this.props.validate(body)
	if (notValid) {
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
		return this.onError(this.props.statusError)
	}
	this.onSuccess(body)
}

export default onSubmit