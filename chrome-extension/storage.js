const DISABLE_QUICK_TO_EDIT_KEY = 'DISABLE_QUICKTO_EDIT_SWITCH';
const AUTO_SELECT_KEY = 'AUTO_SELECT_KEY';

const localSetting = {
    disableQuickToEditIsOn: true,
    // 自动选中
    autoSelect: true,
    // 单选过滤器开关
    switchIsOn: false,

    // 单选过滤器开关 on or off
    switchStatusString: null
}

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

function readDisableQuickToEdit() {
    return readStorage(DISABLE_QUICK_TO_EDIT_KEY)
}

function setDisableQuickToEdit(value) {
    return writeStorage(DISABLE_QUICK_TO_EDIT_KEY, value)
}

function readAutoSelect() {
    return readStorage(AUTO_SELECT_KEY)
}

function setAutoSelect(value) {
    return writeStorage(AUTO_SELECT_KEY, value)
}

function readSingleFilter() {
    return readStorage(SINGLE_FILTER_SWITCH_KEY).then(res => {
        localSetting.switchIsOn = res;
        localSetting.switchStatusString = localSetting.switchIsOn ? 'on' : 'off';
    })
}

function turnOnSingleFilter() {
    return writeStorage(SINGLE_FILTER_SWITCH_KEY, true).then(res => {
        localSetting.switchIsOn = res;
        localSetting.switchStatusString = 'on';
    })
}

function turnOffSingleFilter() {
    return writeStorage(SINGLE_FILTER_SWITCH_KEY, false).then(res => {
        localSetting.switchIsOn = res;
        localSetting.switchStatusString = 'off';
    })
}
