const DISABLE_QUICK_TO_EDIT_KEY = 'DISABLE_QUICKTO_EDIT_SWITCH';
const AUTO_SELECT_KEY = 'AUTO_SELECT_KEY';
const SINGLE_FILTER_SWITCH_KEY = 'single_filter_switch';

const localSetting = {
    disableQuickToEditIsOn: true,
    // 自动选中
    autoSelect: true,
    // 单选过滤器开关
    switchIsOn: false,
}

function readStorage(key) {
    return new Promise(function (resolve) {
        chrome.storage.sync.get([key], function (result) {
            resolve(result[key]);
        });
    })
}

function writeStorage(key, value) {
    return new Promise(function (resolve) {
        chrome.storage.sync.set({
            [key]: value
        }, function () {
            resolve(value);
        });
    })
}

function readDisableQuickToEdit() {
    return readStorage(DISABLE_QUICK_TO_EDIT_KEY)
}

function setDisableQuickToEdit(value) {
    return writeStorage(DISABLE_QUICK_TO_EDIT_KEY, value).then(() => {
        localSetting.disableQuickToEditIsOn = value;
    })
}

function readAutoSelect() {
    return readStorage(AUTO_SELECT_KEY)
}

function setAutoSelect(value) {
    return writeStorage(AUTO_SELECT_KEY, value).then(() => {
        localSetting.autoSelect = value;
    })
}

function readSingleFilter() {
    return readStorage(SINGLE_FILTER_SWITCH_KEY).then(res => {
        if (res !== undefined) {
            localSetting.switchIsOn = res;
        }
    })
}

function turnOnSingleFilter() {
    return writeStorage(SINGLE_FILTER_SWITCH_KEY, true).then(res => {
        localSetting.switchIsOn = res;
    })
}

function turnOffSingleFilter() {
    return writeStorage(SINGLE_FILTER_SWITCH_KEY, false).then(res => {
        localSetting.switchIsOn = res;
    })
}
