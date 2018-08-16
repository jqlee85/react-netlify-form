import noop from './noop'

const defaultProps = {
	name: `Form`,
	action: `/`,
	canSubmit: true,
	onSubmit: noop,
	onSuccess: noop,
	onError: noop,
	validate: noop,
	honeypotName: `__bf`,
	recaptchaTimeout: 3000,
	recatpchaError: `Please complete reCAPTCHA to submit this form.`,
	statusError: `The form data was not sent. Please try again later.`,
}

export default defaultProps