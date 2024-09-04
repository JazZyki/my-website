export function loadModalContent(type) {
    const modal = document.querySelector('#onlyModal')
    const modalContent = modal.querySelector('.modal-wrapper')
    modalContent.innerHTML = "<p>Loading...</p>"

    modal.style.display = "flex"
    modal.classList.add('show')
    fetch(`${type}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then(data => {
            modalContent.innerHTML = data
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
            modalContent.innerHTML = "<p>Failed to load content.</p>"
        });
}

export function loadInitialModal() {
    const externalButton = document.querySelector('#offcanvasWithBackdrop .btn[data-type="firstModal"]')
    setTimeout(() => {
        externalButton.click()
    }, 4000)
}