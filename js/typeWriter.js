localStorage.setItem('isTyping', false)
localStorage.setItem('stopRequested', false)
//let isTyping = false; // Flag to control the typewriter effect
//let stopRequested = false; // Flag to track if stop is requested

let istTyp = localStorage.getItem('isTyping')
let stopReq = localStorage.getItem('stopRequested')

export function typeWriter() {
    let dataText = ["Front-end coder.", "Web designer.", "Graphic designer.", "DTP operator."];

    function typeWriter(text, i, fnCallback) {
        if (stopReq === 'true') {
            localStorage.setItem('isTyping', 'false');
            return; // Exit the function if stop is requested
        }
        
        localStorage.setItem('isTyping', 'true');
        localStorage.setItem('isWriting', true);
        
        if (i < (text.length)) {
            document.getElementById("typeWriterPlaceholder").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback);
            }, 200);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] === 'undefined') {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 700);
        }
        
        if (i < dataText.length) {
            typeWriter(dataText[i], 0, function () {
                StartTextAnimation(i + 1);
            });
        }
    }

    StartTextAnimation(0);
}

// Function to stop the typewriter
export function stopTypeWriter() {
    localStorage.setItem('stopRequested', 'true'); // Request to stop
}
