const SINGLE_FILTER_SWITCH_KEY = 'single_filter_switch';
let filterElements;

function readStorage() {
    return new Promise(function (resolve) {
        chrome.storage.local.get([SINGLE_FILTER_SWITCH_KEY], function (result) {
            localSetting.switchIsOn = result[SINGLE_FILTER_SWITCH_KEY] === 'true';
            localSetting.switchStatusString = localSetting.switchIsOn ? 'on' : 'off';
            resolve();
        });
    })
}

window.onload = async function () {
    await readStorage();
    appendFilterBtn();
}

const localSetting = {
    switchIsOn: false,
    switchStatusString: null,
    turnOn: () => new Promise(function (resolve) {
        chrome.storage.local.set({[SINGLE_FILTER_SWITCH_KEY]: 'true'}, () => {
            readStorage().then(resolve);
        });
    }),
    turnOff: () => new Promise(function (resolve) {
        chrome.storage.local.set({[SINGLE_FILTER_SWITCH_KEY]: 'false'}, () => {
            readStorage().then(resolve);
        });
    }),
}

function getBtnTextContent() {
    return `Single Filter(${localSetting.switchStatusString})`;
}

function appendFilterBtn() {
    const navs = document.getElementsByClassName('subnav-container');
    if (navs.length) {
        const btn = document.createElement('button');
        btn.id = 'jira-single-filter';
        btn.textContent = getBtnTextContent();
        navs[0].appendChild(btn);
        btn.addEventListener('click', async function (e) {
                if (localSetting.switchIsOn) {
                    await localSetting.turnOff();
                    closeSingleFilter();
                } else {
                    await localSetting.turnOn();
                    applySingleFilter();
                }
                btn.textContent = getBtnTextContent();
            },
            {
                capture: true
            }
        );
    }
    filterElements = window['js-work-quickfilters'];
    if (localSetting.switchIsOn) {
        applySingleFilter();
    }
}


function filterInteceptor(e) {
    if (e.target.dataset.filterId) {
        const href = window.location.href.replace(/(rapidView=\d+)(\s|\S)+$/, (_, g1) => {
            return `${g1}&quickFilter=${e.target.dataset.filterId}`;
        });
        console.log(href);
        e.stopPropagation();
        window.location.href = href;
    }
}


function applySingleFilter() {
    filterElements.addEventListener('click', filterInteceptor, {capture: true})
}

function closeSingleFilter() {
    filterElements.removeEventListener('click', filterInteceptor, {capture: true})
}