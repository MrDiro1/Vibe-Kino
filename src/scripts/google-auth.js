export function initGoogleAuth(clientId) {
	waitForGoogle(() => {
		google.accounts.id.initialize({
			client_id: clientId,
			callback: handleCredentialResponse,
		})

		const triggerBtn = document.getElementById('google-signin-trigger')
		if (triggerBtn) {
			triggerBtn.addEventListener('click', () => {
				google.accounts.id.prompt() // Покажет окно входа
			})
		}
	})

	function handleCredentialResponse(response) {
		console.log('Encoded JWT ID token:', response.credential)
	}

	function waitForGoogle(callback) {
		if (window.google && window.google.accounts && window.google.accounts.id) {
			callback()
		} else {
			setTimeout(() => waitForGoogle(callback), 50)
		}
	}
}
