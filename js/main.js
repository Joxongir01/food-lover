window.addEventListener('DOMContentLoaded', () => {


    const loader = document.querySelector('.loader')

    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none'
        }, 2000)
    }

    const headerNav = document.querySelectorAll('.header__nav-link')

    headerNav.forEach(link => {
        link.addEventListener('click', () => {

            headerNav.forEach(item => {

                item.classList.remove('active')
            })
            link.classList.add('active')
        })
    })


    const tabs = document.querySelectorAll('.about__tabs-btn'),
        tabContents = document.querySelectorAll('.about__tabs-content'),
        tabParents = document.querySelector('.about__tabs-list')

    function hideTabContents() {
        tabContents.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabs.forEach(item => {
            item.classList.remove('about__tabs-btn--active')
        })
    }

    function showTabContents(index = 0) {
        tabContents[index].classList.add('show', 'fade')
        tabContents[index].classList.remove('hide')

        tabs[index].classList.add('about__tabs-btn--active')
    }

    hideTabContents()
    showTabContents()

    tabParents.addEventListener('click', (evt) => {

        const target = evt.target

        if (target && target.classList.contains('about__tabs-btn')) {
            tabs.forEach((item, index) => {
                if (target === item) {
                    hideTabContents()
                    showTabContents(index)
                }
            })
        }
    })


    const deadLine = '2025-07-01'

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds

        const time = Date.parse(endtime) - Date.parse(new Date())


        if (time <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24))
            hours = Math.floor((time / (1000 * 60 * 60)) % 24)
            minutes = Math.floor(time / (1000 * 60) % 24)
            seconds = Math.floor((time / 1000) % 60)
        }

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)


        updateClock()

        function updateClock() {
            const time = getTimeRemaining(endtime)

            days.textContent = getZero(time.days)
            hours.textContent = getZero(time.hours)
            minutes.textContent = getZero(time.minutes)
            seconds.textContent = getZero(time.seconds)

            if (time.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadLine)



    const modal = document.querySelector('.modal'),
        modalOpenBtns = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('.modal__close')
    modalTimerId = setTimeout(openModal, 5000)

    function openModal() {
        modal.classList.add('show', 'modal-fade')
        modal.classList.remove('hide')

        document.body.style.overflow = 'hidden'

        clearInterval(modalTimerId)
    }

    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', openModal)

    })


    function closeMOdal() {
        modal.classList.add('hide')
        modal.classList.remove('show')

        document.body.style.overflow = ''
    }

    modalCloseBtn.addEventListener('click', closeMOdal)

    modal.addEventListener('click', evt => {
        if (evt.target === modal) {
            closeMOdal()
        }
    })

    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            closeMOdal()
        }
    })
    
    
    
  const slides = document.querySelectorAll('.gallery__slider-item'),
    sliderList = document.querySelector('.gallery__slider-list'),
    sliderInner = document.querySelector('.gallery__slider-inner'),
    prevSlideBtn = document.querySelector('.gallery__slider-prev'),
    nextSlideBtn = document.querySelector('.gallery__slider-next'),
    currentSlide = document.querySelector('#current'),
    totalSlide = document.querySelector('#total'),
    width = window.getComputedStyle(sliderList).width
    
    let slideIndex = 1
    let offset = 0
    let autoSlideInterval
    
if (slides.length < 10) {
totalSlide.textContent = `0${slides.length}`
currentSlide.textContent = `0${slideIndex}`
} else {
    totalSlide.textContent = slides.length
    currentSlide.textContent = slideIndex
}

sliderList.style.width = 100 * slides.length + '%'
sliderList.style.display = 'flex'
sliderInner.style.overflow = 'hidden'

slides.forEach(item => {
    item.style.width = width
})

function prevSlide() {
if (offset == 0) {
    offset = +width.slice(0, width.length - 2) * (slides.length - 1)
} else {
    offset -= +width.slice(0, width.length - 2)
}

sliderList.style.transform = `translateX(-${offset}px)`

if (slideIndex == 1) {
    slideIndex = slides.length
} else {
    slideIndex--
}

if (slides.length < 10) {
    currentSlide.textContent = `0${slideIndex}`
} else {
    currentSlide.textContent = slideIndex
}
}

function nextSlide() {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0
    } else {
        offset += +width.slice(0, width.length - 2)
    }
    
    sliderList.style.transform = `translateX(-${offset}px)`
    
    if (slideIndex == slides.length) {
        slideIndex = 1
    } else {
        slideIndex++
    }
    
    if (slides.length < 10) {
        currentSlide.textContent = `0${slideIndex}`
    } else {
        currentSlide.textContent = slideIndex
    }
}

function startAutoSlide () {
autoSlideInterval = setInterval(nextSlide,3000)
}


prevSlideBtn.addEventListener('click', prevSlide)
nextSlideBtn.addEventListener('click', nextSlide)


startAutoSlide()


})