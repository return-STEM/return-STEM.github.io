import {html, define, store} from 'https://unpkg.com/hybrids@^7';


let style = html`
    <style>


        .popup-content {
            width: var(--popup-width);
            height: var(--popup-height);
            display: flex;
            overflow-x: hidden;
        }

        .popup-content-int {
            display: flex;
            background-color: white;
            width: var(--popup-width);
            height: var(--popup-height);
            flex-shrink: 0;
            position: relative;
        }

        .popup-cont-left {
            flex-basis: 50%;
            flex-shrink: 0;
        }

        .popup-cont-left-one {
            background-color: #64bdfa;
        }

        .popup-cont-left-two {
            background-color: #DAF6D7;
        }

        .popup-img {
            height: 50%;
            width: 100%;
            transform: translateY(50%);
        }

        .popup-cont-right {
            flex-basis: 40%;
            flex-shrink: 0;
            padding: 1.5% 5%;
        }

        .popup-title {
            font-family: "Inter Bold";
            font-size: 2.25em;
        }

        .popup-content-two {
            display: flex;
        }

        .popup-navigate-left {
            left: 0.25em;
        }

        .popup-navigate-right {
            right: 0.25em;
        }

        .popup-navigate {
            position: absolute;
            font-size: 2.25em;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            transition: color 0.2s ease-in;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        .popup-navigate:hover {
            color: var(--pink);
        }

        .popup-x {
            position: absolute;
            right: 0.5em;
            top: 0.5em;
            font-size: 2.25em;
            transition: color 0.2s ease-in;
        }

        .popup-x:hover {
            color: var(--pink);
        }

        .popup-button {
            background-color: transparent;
            border-style: solid;
            border-color: var(--pink);
            border-width: 0.1em;
            padding: 0.4em 0.7em;
            font-family: "Quicksand Regular";
            font-size: 1.25em;
            transition: 0.25s ease-in;
            width: max-content;
        }

        .popup-button:hover {
            background-color: var(--pink);
            color: white;
            cursor: pointer;
        }

        .popup-list {
            font-family: "Quicksand Regular";
            font-size: 1em;
        }

        .popup-display-none {
            display: none;
        }

        .popup-list li {
            margin-top: 0.75em;
        }

        .popup-link {
            text-decoration: underline;
            transition: 0.2s ease;
        }

        .popup-link:visited, .popup-link:active, .popup-link:focus {
            text-decoration: underline;
        }

        .popup-link:hover {
            color: var(--pink);
            text-decoration: underline;
        }
    </style>

`

function lockScrolling() {
    document.documentElement.classList.add("overflow-hidden");
}

function unlockScrolling() {

    document.documentElement.classList.remove("overflow-hidden");
}

const CourseInfo = {
    code: "",
    id: true,
    title: "",
    difficulty: "",
    length: "",
    meta: {
        thumbnail: "",
        signupLink: ""
    },
    active: false,
    [store.connect]:
        {
            get: id => fetch(`courses/${id}/info.json`).then(res => res.json())
        }
}

const CourseDescription = {
    id: true,
    slides: [{
        title: "",
        image: "",
        background: "",
        points: [""],
        button: {
            trueText: "",
            falseText: "",
            state: false,
            action: ""
        },
    }],
    [store.connect]:
        {
            get: id => fetch(`courses/${id}/description.json`).then(res => res.json())
        },

}

function prevSlide(host) {
    host.slide--
    host.slide += host.desc.slides.length
    host.slide %= host.desc.slides.length
}

function nextSlide(host) {
    host.slide++
    host.slide %= host.desc.slides.length
}

function close(host) {
    Array.from(document.body.getElementsByTagName("course-modal")).forEach((c) => document.body.removeChild(c))
    unlockScrolling()
}

function onOpen(host) {
    lockScrolling()
}

export default define({

    tag: "course-modal",
    slide: 0,
    course: store(CourseInfo),
    desc: store(CourseDescription),

    content: ({slide, course, desc}) => {
        lockScrolling()
        return html`
            ${style}
            ${store.ready(course) && html`
                <div class="course-popup">
                    <div class="popup-content">
                        <div class="popup-content-int">
                            <div class="popup-navigate-left popup-navigate" onclick="${prevSlide}"><span
                                    class="fas fa-chevron-left"></span></div>
                            <div class="popup-navigate-right popup-navigate" onclick="${nextSlide}"><span
                                    class="fas fa-chevron-right"></span></div>

                            <div class="popup-cont-left" style="background-color: ${desc.slides[slide].background}">
                                <img src="${desc.slides[slide].image}" alt="python" class="popup-img">
                            </div>
                            <div class="popup-cont-right">
                                ${((c) => console.log(c))(desc.slides[slide])}
                                <div class="popup-x" onclick="${close}"><span class="fas fa-times"></span></div>
                                <h4 class="popup-title">${desc.slides[slide].title}</h4>
                                <ul class="popup-list">
                                    ${desc.slides[slide].points.map((p) => html`
                                        <li>${p}</li>`)}
                                </ul>
                                ${desc.slides[slide].button.trueText ?
                                        desc.slides[slide].button.state ? html`

                                            ${((c) => console.log(c))("button")}
                                            <div class="popup-button"><a href="${desc.slides[slide].button.action}"
                                                                         target="_blank">
                                                ${desc.slides[slide].button.trueText}</a></div>
                                        ` : html`
                                            ${((c) => console.log(c))("button")}
                                            <div class="popup-button">
                                                ${desc.slides[slide].button.falseText}
                                            </div>
                                        ` : html``
                                }
                            </div>

                        </div>
                    </div>
                </div>
            `
            }
        `
    }
})
