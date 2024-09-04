export function thisYear() {
    const copyrightSpan = document.getElementById('year')
    copyrightSpan.innerHTML = new Date().getFullYear()
}
