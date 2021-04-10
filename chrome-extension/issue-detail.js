const intervalId = window.setInterval(async () => {
    if (window['description-val']) {
        window.clearInterval(intervalId);
        disableQuickToEdit();
    }
}, 500);

function disableQuickToEdit() {
    const descriptionEl = window['description-val'];
    descriptionEl.removeAttribute('title');
    descriptionEl.getElementsByClassName('user-content-block')[0].addEventListener('click', function (e) {
        e.preventDefault();
        return false;
    })
}