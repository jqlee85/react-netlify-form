/*global FormData:true*/
/*eslint no-undef: "error"*/
import fetch from 'isomorphic-fetch'

async function onSubmit(e) {

	e.preventDefault()
	if (!this.props.canSubmit) return
	if(this.honeypot.value){
		console.error(`Honeypot value is set. Cannot submit form.`)
		return
	}

	let body = new FormData(this.form)

	this.setState({
		loading: true,
		error: false,
		success: false,
		recaptchaError: false,
	})

	if (this.props.recaptcha) {
		if (this.props.recaptcha.size === `invisible`) {
			console.log(`Executing invisible reCAPTCHA...`)
			this.recaptchaEl.execute()
			await this.awaitRecaptchaValue()
			body.append(`g-recaptcha-response`, this.state.recaptchaValue)
		}
		if (!this.state.recaptchaValue) {
			const msg = `reCAPTCHA value not set`
			console.error(msg)
			this.props.onError(msg)
			return this.setState({
				loading: false,
				error: false,
				success: false,
				recaptchaError: true,
			})
		}
	}

	let notValid = await this.props.validate(body)
	if (notValid) {
		return this.setState({
			loading: false,
			error: false,
			success: false,
			recaptchaError: false,
		})
	}

	this.props.onSubmit(body)

	let { status } = await fetch(this.props.action, {
		method: `POST`,
		body,
	})
	if (status !== 200) {
		const msg = `Status code: ${status}`
		console.error(msg)
		this.props.onError(msg)
		return this.setState({
			loading: false,
			error: true,
			success: false,
			recaptchaError: false,
		})
	}
	this.onSuccess(body)
}

export default onSubmit