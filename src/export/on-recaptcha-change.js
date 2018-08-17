export default function onRecaptchaChange(recaptchaValue) {
	console.log(`Invisible reCAPTCHA value set`)
	this.setState({ recaptchaValue })
	if (this.props.recaptcha && this.props.recaptcha.size === `invisible`) {
		this.process()
	}
}