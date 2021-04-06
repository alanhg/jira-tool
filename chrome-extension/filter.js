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

/**
 * js-work-quickfilters出现时进行按钮追加
 */
const intervalId = window.setInterval(async () => {
    if (window['js-work-quickfilters']) {
        window.clearInterval(intervalId);
        await readStorage();
        appendFilterBtn();
    }

}, 500);

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

function getLeftElement() {
    if (window['subnav-trigger-work']) {
        return window['subnav-trigger-work']
    }
    if (window['subnav-title']) {
        return window['subnav-title'].children[0]
    }
    return window['js-work-quickfilters'];
}

function appendFilterBtn() {
    const btn = document.createElement('div');
    btn.id = 'jira-single-filter';
    btn.innerHTML = `
    Single Filter
    <label class="switch">
    <input type="checkbox" ${localSetting.switchIsOn ? 'checked' : ''}>
    <span class="slider round"></span>
    </label>
    `;
    const leftEl = getLeftElement();
    btn.style.left = leftEl.getBoundingClientRect().left + leftEl.offsetWidth + 10 + 'px';
    btn.style.top = leftEl.getBoundingClientRect().top + 6 + 'px';
    document.body.appendChild(btn);
    btn.addEventListener('click', async function (e) {
            if (localSetting.switchIsOn) {
                await localSetting.turnOff();
                closeSingleFilter();
            } else {
                await localSetting.turnOn();
                applySingleFilter();
            }
        },
        {
            capture: true
        }
    );
    filterElements = window['js-work-quickfilters'];
    if (localSetting.switchIsOn) {
        applySingleFilter();
    }
}


function filterInterceptor(e) {
    if (e.target.dataset.filterId) {
        Array.prototype.forEach.call(filterElements.getElementsByClassName('ghx-active'), function (item) {
            if (item !== e.target) {
                item.click();
            }
        });
    }
}


function applySingleFilter() {
    filterElements.addEventListener('click', filterInterceptor, {capture: true})
}

function closeSingleFilter() {
    filterElements.removeEventListener('click', filterInterceptor, {capture: true})
}