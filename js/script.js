const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".input-field"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = 0,
mistakes = 0,
isTyping = false;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    
    paragraphs[randIndex].split("").forEach(char => {
        typingText.innerHTML += `<span>${char}</span>`;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inputField.focus());
    document.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            // user pressed backspace
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } 
        else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);

        wpm = (wpm < 0 || !wpm || wpm === Infinity) ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inputField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;

    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
