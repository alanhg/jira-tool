const DISABLE_QUICK_TO_EDIT_KEY = 'DISABLE_QUICKTO_EDIT_SWITCH';

function readStorage(key) {
    return new Promise(function (resolve) {
        chrome.storage.local.get([key], function (result) {
            resolve(result[key]);
        });
    })
}

function writeStorage(key, value) {
    return new Promise(function (resolve) {
        chrome.storage.local.set({
            [key]: value
        }, function () {
            resolve(value);
        });
    })
}

async function readDisableQuickToEdit() {
    return await readStorage(DISABLE_QUICK_TO_EDIT_KEY) === 'true'
}

async function setDisableQuickToEdit(value) {
    return await writeStorage(DISABLE_QUICK_TO_EDIT_KEY, String(value))
}