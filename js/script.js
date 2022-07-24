window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    //  Tabs

    let tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        info = document.querySelector('.info-header');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (event.target === tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

                                               // Timer

    let deadLine = '2022-06-10';


    function getTime(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }
    }
    function setClock(id, endTimer){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 10);



        function updateClock(){
            let t = getTime(endTimer);
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0){
                    hours.innerHTML = '00';
                    minutes.innerHTML = '00';
                    seconds.innerHTML = '00';
                clearInterval(timeInterval);
            }
        }

    }
    setClock('timer', deadLine);

                                // Modal

    let close = document.querySelector('.popup-close'),
        overlay = document.querySelector('.overlay'),
        more = document.querySelector('.more');

    more.addEventListener('click', function (){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });


    close.addEventListener('click', function (){
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
    });

    // class Options {
    //     constructor(height, width, bg, fontSize, textAlign) {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize =fontSize;
    //         this.textAlign = textAlign;
    //     }
    // createDiv () {
    //         let elem = document.createElement('div');
    //         document.body.appendChild(elem);
    //         let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
    //         elem.style.cssText = param;
    //  }
    // }


                               // Form

    let message = {
        loading: 'loading...',
        success: 'thank you',
        failure: 'sam thing wrong',
    }
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem){
        elem.addEventListener('submit', function (event){
            event.preventDefault();
               elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postDate(date){
                return new Promise(function (resolve, reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    request.send(date);
                    request.onreadystatechange = function (){
                        if (request.readyState < 4){
                            resolve()
                        }else if (request.readyState === 4){
                            if (request.status === 200){
                                resolve()
                            }else {
                                reject()
                            }
                        }
                    }
                });
            }  // end postData
            function clearInput (){
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postDate(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    statusMessage.innerHTML = message.success
                })
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)


        });
    }
    sendForm(form)

    {
        // let request = new XMLHttpRequest();
        // request.open('POST', 'server.php');
        // // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //
        // let obj = {};
        // formData.forEach((value, key) => obj[key] = value)
        // let json = JSON.stringify(obj)
        //
        // request.send(json);
        // // request.send(formData);
        //
        // request.addEventListener('readystatechange', function (){
        //     if (request.readyState < 4){
        //         statusMessage.textContent = message.loading;
        //     }else if (request.readyState === 4 && request.status === 200){
        //         statusMessage.textContent = message.success;
        //     }else {
        //         statusMessage.textContent = message.failure;
        //     }
        // })  ;
        // for (let i = 0; i < input.length; i++) {
        //     input[i].value = '';
        // }
        // let contactForm = document.querySelector('.contact-form'),
        //     inputsContactForm = contactForm.getElementsByTagName('input'),
        //     statusMessageForContactForm = document.createElement('div');
        // statusMessageForContactForm.classList.add('status');
        //
        //
        // contactForm.addEventListener('submit', function (event){
        //     event.preventDefault();
        //     contactForm.appendChild(statusMessageForContactForm);
        //     let request = new XMLHttpRequest();
        //     request.open('POST', 'server.php');
        //     // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        //
        //     let formData = new FormData(contactForm);
        //
        //     let obj = {};
        //     formData.forEach((value, key) => obj[key] = value)
        //     let json = JSON.stringify(obj)
        //
        //     request.send(json);
        //     // request.send(formData);
        //
        //     request.addEventListener('readystatechange', function (){
        //         if (request.readyState < 4){
        //             statusMessageForContactForm.innerHTML = message.loading;
        //         }else if (request.readyState === 4 && request.status === 200){
        //             statusMessageForContactForm.innerHTML = message.success;
        //         }else {
        //             statusMessageForContactForm.innerHTML = message.failure;
        //         }
        //     });
        //     for (let i = 0; i < inputsContactForm.length; i++) {
        //      inputsContactForm[i].value = '';
        //     }
        // });
        // const item = new Options(300, 350, "red", 14, "center");
        // item.createDiv();
    }

                 // Slides

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlider(slideIndex);
    function showSlider(n){
        if (n > slides.length){
            slideIndex = 1;
        }else if (n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    }

    function plusSlides (n){
        showSlider(slideIndex += n);
    }
    function currentSlid (n) {
        showSlider(slideIndex = n);
    }
    prev.addEventListener('click', function (){
        plusSlides(-1);
    });
    next.addEventListener('click', function (){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event){
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target === dots[i - 1]){
                currentSlid(i);
            }
        }
    });

                 // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function (){
        personsSum = +this.value;
        total = (personsSum + daysSum) * 1000;

        if (restDays.value === '' || this.value === ''){
            totalValue.innerHTML = 0;
        }else {
            totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('input', function (){
        daysSum = +this.value;
        total = (personsSum + daysSum) * 1000;

        if (persons.value === '' || this.value === ''){
            totalValue.innerHTML = 0;
        }else {
            totalValue.innerHTML = total;
        }
    });
    place.addEventListener('change', function (){
        if (persons.value === '' || restDays.value === ''){
            totalValue.innerHTML = 0;
        }else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});


