var dynamic_text = document.querySelector(".reveal-text")

var reveal_text_list = ["Software Developer", "Frontend Developer", "Backend Developer", "UX Designer", "Full Stack Developer", "Web Developer", "Game Designer and Developer"]

let wordIndex = 0
let charIndex = 1
let isDeleting = false

const typeEffect = () => {
    const currentWord = reveal_text_list[wordIndex]
    const currentChar = currentWord.substring(0, charIndex)
    dynamic_text.textContent = currentChar
    dynamic_text.classList.add('stop-blinking')
    //we check if we have iterate all the char or not
    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++
        setTimeout(typeEffect, (150));//200 is the delay
    } else if (isDeleting && charIndex > 0) {
        //we are deleting the chat
        charIndex--;
        setTimeout(typeEffect, (100));
    } else {
        isDeleting = !isDeleting
        dynamic_text.classList.remove('stop-blinking')
        wordIndex = !isDeleting ? (wordIndex + 1) % reveal_text_list.length : wordIndex
        //the time is the delay for earsing / typing for the words
        setTimeout(typeEffect, (1200));
    }
}

// --------------bounce effect---------------
function link_bounce(element) {
    element.addEventListener('mouseover', () => {
        element.classList.add('fa-bounce')
    })
    element.addEventListener('mouseout', () => {
        element.classList.remove('fa-bounce')
    })
}

var bounce_effect = () => {
    const ins = document.querySelector('.instagram')
    const git = document.querySelector('.github')
    const linkin = document.querySelector('.linkedin')
    link_bounce(ins)
    link_bounce(git)
    link_bounce(linkin)
}

//------------reveal effect--------------------

var reveal_effect = () => {
    var text = document.querySelector('.self-introduce')
    var window_height = window.innerHeight
    var reveal_top = text.getBoundingClientRect().top
    var reveal_point = 150

    if (reveal_top < window_height - reveal_point) {
        text.classList.add('reveal-active')
    } else {
        text.classList.remove('reveal-active')
    }

}

//-------------- skill bar moving effect------------
function skill_bar_moving() {
    var skills_element = document.querySelector('.moving-bar').children
    var window_width = window.innerWidth
    var element_width = Math.floor(window_width / skills_element.length)
    setInterval(() => {
        Array.from(skills_element).map(
            (e, i) => {
                if (!e.style.left) {
                    e.style.left = i * element_width + "px"
                } else {
                    let current_width = parseInt(e.style.left) + 1 + "px"
                    if (parseInt(e.style.left) >= window_width) {
                        e.style.left = '0px'
                    } else {
                        e.style.left = current_width
                    }
                }

            }
        )
    }, 50);
}
var nav = document.querySelector(".nav-wrapper")
var nav_height = nav.offsetHeight
var sections = document.getElementsByTagName('section')
var links = document.querySelectorAll('.nav-right a')
function nav_active() {
    let top = window.scrollY
    Array.from(sections).forEach(element => {
        let offset = element.offsetTop - nav_height
        let height = element.offsetHeight
        let id = element.getAttribute('id')
        if (top >= offset && height + offset > top) {
            links.forEach(link => {
                link.classList.remove("active")
                document.querySelector(".nav-right a[href*=" + id + "]").classList.add("active")
            })
        }
    });
}

window.onscroll = () => {
    reveal_effect()
    nav_active()
}

window.onload = () => {
    bounce_effect()
    typeEffect()
    skill_bar_moving()
}