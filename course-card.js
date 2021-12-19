import {html, define, store} from 'https://unpkg.com/hybrids@^7';

let buttonsStyle = html`
    <style>
        .button-disabled:active {
            background-color: var(--pink);
            color: white;
            pointer-events: none;
            cursor: pointer;
        }

        .button-disable-active {
            display: none;
        }

        .button-disabled:hover .button-disable-active {
            display: initial;
        }

        .button-disabled:active .button-disable-active {
            display: initial;
        }

        .button-disabled:hover .button-disable-default {
            display: none;
        }

        .button-disabled:active .button-disable-default {
            display: none;
        }
    </style>
`

let style = html`
    <style>

        .course-img {
            height: 12.5em;
            margin-left: 50%;
            transform: translateX(-50%);
        }

        .course-title {
            font-family: "Inter Regular";
            font-size: 1.75em;
            padding: 0 0.5em;
            text-align: center;
            margin: 0.5em 0 0.2em 0;
        }

        .course-bottom {
            display: flex;
        }

        .course-bottom-half {
            width: 8.75em;
        }

        .course-bottom-left {
            padding-left: 0.75em;
            text-align: left;
        }

        .course-bottom-right {
            padding-right: 0.75em;
            text-align: right;
        }

        .course-bottom-icon {
            color: var(--pink);
            font-size: 1.1em;
            padding-right: 0.2em;
        }

        .course-bottom h4 {
            font-family: "Quicksand Regular";
            font-size: 1.25em;
        }

        .course-button-cont {
            padding: 1em;
            padding-top: 0.25em;
            text-align: center;
        }

        .course-button {
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

        .course-button-anim {
            display: inline-block;
        }

        .course-button-anim:hover > .course-button {
            background-color: var(--pink);
            color: white;
            cursor: pointer;
        }

    </style>
`

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

function openModal(code) {
    let modal = document.createElement("course-modal")
    modal.course = code
    modal.desc = code
    document.body.appendChild(modal)

}

export default define({
    tag: "course-card",
    course: store(CourseInfo),
    content: ({slide, course}) => html`
        ${style}
        ${buttonsStyle}
        ${store.ready(course) && html`
            <a onclick="${() => openModal(course.code)}">
                <img src="${course.meta.thumbnail}" class="course-img" alt="python">
                <h2 class="course-title">${course.title}</h2>
                <div class="course-bottom">
                    <div class="course-bottom-half course-bottom-left">
                        <h4><span
                                class="far fa-smile course-bottom-icon"></span>${course.difficulty}</h4>
                    </div>
                    <div class="course-bottom-half course-bottom-right">
                        <h4><span
                                class="far fa-hourglass course-bottom-icon"></span>${course.length}
                        </h4>
                    </div>
                </div>

                ${course.active ? html`
                    <form class="course-button-cont" action="${course.meta.signupLink}" target="_blank">
                        <div class="course-button-anim">
                            <button class="course-button"><span
                                    class="button-disable-default">Sign Up Now &rarr;</span><span
                                    class="button-disable-active">Sign Up Now<span
                                    class="fas fa-clock"></span></span></button>
                        </div>
                    </form>
                ` : html`


                    <form class="course-button-cont" action="">
                        <div class="course-button-anim">
                            <button class="course-button button-disabled"><span
                                    class="button-disable-default">Returning Soon</span><span
                                    class="button-disable-active">Returning Soon<span
                                    class="fas fa-clock"></span></span>
                            </button>
                        </div>
                    </form>
                `}

        `}
        </a>
    `
})
