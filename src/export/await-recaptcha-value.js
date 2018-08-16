export default function awaitRecaptchaValue(){
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (this.state.recaptchaValue){
				resolve()
			}
		}, 1)
		setTimeout(() => {
			clearInterval(interval)
			reject()
		}, this.props.recaptchaTimeout)
	})
}