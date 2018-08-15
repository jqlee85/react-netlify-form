async function onError(err) {
	this.props.onError(err)
	return this.setState({
		loading: false,
		error: err,
		success: false,
	})
}

export default onError