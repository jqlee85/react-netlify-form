export default function isClientSide(){
	return !!(
		(typeof window !== 'undefined' &&
			window.document && window.document.createElement)
	)
}