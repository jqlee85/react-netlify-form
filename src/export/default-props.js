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
}

export default defaultProps