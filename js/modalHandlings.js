import { typeWriter, stopTypeWriter } from "./typeWriter.js"
import { loadModalContent } from "./loadContent.js"

export function offCanvasBtnHandling() {
    const offCanvas = document.getElementById('offcanvasWithBackdrop')
    const buttons = offCanvas.querySelectorAll('.button-section .btn')
    buttons.forEach(function(button) {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-type')
            loadModalContent(target)
            if (target === 'firstModal') {
                setTimeout(() => {
                    localStorage.setItem('stopRequested', 'false')
                    typeWriter()
                }, 50)
            }
        })
    })
}

export function closeModalOutsideClick() {
    const modal = document.getElementById('onlyModal')
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show')
            setTimeout(() => {
                modal.style.display = 'none'
            }, 2000)
            stopTypeWriter()
            }
    })
}