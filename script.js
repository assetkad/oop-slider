
console.clear();
const settings = {
    slider: 'slider',
    slide: 'slide',
    longline: 'longline',
    arrowLeft: 'arrowLeft',
    arrowRight: 'arrowRight',
    speed: 350,
    displayedSlides: 4
}

class Slider {
    #pos = 0;
    #def = {
        slider: 'slider',
        slide: 'slide',
        longline: 'longline',
        arrowLeft: 'arrowLeft',
        arrowRight: 'arrowRight',
        speed: 400,
        displayedSlides: 3
    }

    constructor(settings) {
        this.#def = Object.assign(this.#def, settings);

        this.slider = document.getElementById(this.#def.slider);
        this.slides = document.getElementsByClassName(this.#def.slide);
        this.longline = document.getElementById(this.#def.longline);
        this.arrowLeft = document.getElementById(this.#def.arrowLeft);
        this.arrowRight = document.getElementById(this.#def.arrowRight);
        this.speed = this.#def.speed;
        this.displayedSlides = this.#def.displayedSlides;

        this.#setDisplayWidth();
        this.#initialClones();

        this.arrowLeft.onclick = () => this.moveLeft()
        this.arrowRight.onclick = () => this.moveRight();


        console.log(this.#def);
    }

    #setDisplayWidth() {
        this.slidesSize = this.slides[0].offsetWidth;
        this.longline.style.width = this.slidesSize * (this.slides.length + 2) + "px";

        if (this.displayedSlides % 2 === 0) {
            this.slider.style.width = (this.slidesSize * this.displayedSlides) + "px";
            this.longline.style.marginRight = (this.slidesSize) + "px";
        }
        else {
            this.slider.style.width = (this.slidesSize * this.displayedSlides) + "px";
        }
    }


    #initialClones() {
        let cloneFirst = this.slides[0].cloneNode(true);
        let cloneLast = this.slides[this.slides.length - 1].cloneNode(true);
        this.longline.append(cloneFirst);
        this.longline.prepend(cloneLast);
    }

    #translationMoves() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = this.speed + "ms";
            this.slides[i].style.left = `${this.#pos}px`;
            setTimeout(() => this.slides[i].style.transition = "0s", this.speed);
        }
    }

    #removeAndPaste(leftClick, clone) {
        setTimeout(() => {
            if (leftClick) {
                this.longline.append(clone);
                this.slides[0].remove();
                this.arrowLeft.onclick = () => slider.moveLeft()
            }
            else {
                this.longline.prepend(clone);
                this.slides[this.slides.length - 1].remove();
                this.arrowRight.onclick = () => this.moveRight();
            }

            this.#pos += this.slidesSize * ((leftClick) ? 1 : -1);

            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].style.left = `${this.#pos}px`;
            }
        }, this.speed);
    }

    moveLeft() {
        this.arrowLeft.onclick = null;
        this.#pos -= this.slidesSize;

        this.#translationMoves();

        let clone = this.slides[2].cloneNode(true);

        this.#removeAndPaste(true, clone);
    }

    moveRight() {
        this.arrowRight.onclick = null;
        this.#pos += this.slidesSize;

        this.#translationMoves();

        let clone = this.slides[this.slides.length - 3].cloneNode(true);

        this.#removeAndPaste(false, clone);
    }
}

const slider = new Slider(settings);
