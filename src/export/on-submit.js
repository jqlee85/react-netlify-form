async function onSubmit(e) {
	console.log(`Netlify form submit...`)
	e.preventDefault()

	// If submition is disabled
	if (!this.props.canSubmit) return
	if(this.honeypot.value){
		console.error(`Honeypot value is set. Cannot submit form.`)
		return
	}

	// Check invisible recaptcha
	if (this.props.recaptcha && this.props.recaptcha.size === `invisible`) {
		if (this.props.recaptcha.size === `invisible`) {
			console.log(`Executing invisible reCAPTCHA...`)
			try {
				let res = await this.recaptchaEl.execute()
				console.log(`reCAPTCHA response: ${res}`)
				return
			}
			catch (err) {
				console.log(`reCAPTCHA execution error`)
				console.error(err)
				return this.setState({
					loading: false,
					error: false,
					success: false,
					recaptchaError: true,
				})
			}
		}
	}

	await this.process()

}

export default onSubmit