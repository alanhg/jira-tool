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
    await readDisableQuickToEdit();
    toggleDisableEvent(localSetting.disableQuickToEditIsOn);
}

async function toggleDisableEvent(disabled) {
    const descriptionEl = window[DESCRIPTION_EL_ID];
    if (disabled) {
        descriptionEl.removeAttribute('title');
        descriptionEl.classList.add('j-not-allowed');
        descriptionEl.getElementsByClassName('user-content-block')[0].addEventListener('click', disableEvent)
    } else {
        descriptionEl.setAttribute('title', 'Click to edit');
        descriptionEl.classList.remove('j-not-allowed');
        descriptionEl.getElementsByClassName('user-content-block')[0].removeEventListener('click', disableEvent)
    }
}
