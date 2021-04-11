const DESCRIPTION_EL_ID = 'description-val';
const intervalId = window.setInterval(async () => {
    if (window[DESCRIPTION_EL_ID]) {
        window.clearInterval(intervalId);
        disableQuickToEdit();
    }
}, 500);

function disableEvent(e) {
    e.preventDefault();
}

async function disableQuickToEdit() {
    if (!await readDisableQuickToEdit()) {
        return;
    }
    toggleDisableEvent(true);
}

async function toggleDisableEvent(off) {
    if (off === undefined) {
        off = await readDisableQuickToEdit();
    }
    const descriptionEl = window[DESCRIPTION_EL_ID];
    if (off) {
        descriptionEl.getElementsByClassName('user-content-block')[0].removeEventListener('click', disableEvent)
        descriptionEl.setAttribute('title', 'Click to edit');
    } else {
        descriptionEl.removeAttribute('title');
        descriptionEl.getElementsByClassName('user-content-block')[0].addEventListener('click', disableEvent)
    }
}