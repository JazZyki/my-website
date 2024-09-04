export function preloader() {
    const preloader = document.getElementById('preloader')
    setTimeout(() => {
        preloader.classList.add('hide')
    }, 3000 )
    setTimeout(() => {
        preloader.classList.add('hidden')
        localStorage.setItem('preloader', 1)
    }, 3500 )
}