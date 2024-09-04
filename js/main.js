import { /*modalHandlings,*/ offCanvasBtnHandling, closeModalOutsideClick } from "./modalHandlings.js"
import { thisYear } from "./thisYear.js"
import { loadInitialModal } from "./loadContent.js"
import { preloader } from "./preloader.js"

document.addEventListener("DOMContentLoaded", function () {
    preloader()
    loadInitialModal()
    thisYear()
    offCanvasBtnHandling()
    closeModalOutsideClick()
})
