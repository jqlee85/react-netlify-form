/*eslint no-undef: "error"*/
import fetch from 'isomorphic-fetch'
import qs from 'qs'

export default async function process(){

	let body = qs.stringify(this.form)

	if (this.props.recaptcha) {
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
		body.append(`g-recaptcha-response`, this.state.recaptchaValue)
	}

	this.setState({
		loading: true,
		error: false,
		success: false,
		recaptchaError: false,
	})

	let notValid = await this.props.validate(body)
	if (notValid) {
		return this.setState({
			loading: false,
			error: true,
			success: false,
			recaptchaError: false,
		})
	}

	this.props.onSubmit(body)

	let { status } = await fetch(this.props.action, {
		method: `POST`,
		headers: {
			"Content-Type": `application/x-www-form-urlencoded`,
		},
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