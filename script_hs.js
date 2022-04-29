// variables
let data = [[], []];
let fileElems = [[], []];
let dataType = 0; // 0 = notes, 1 = diary
let count = [0, 0];
let newBool = false;
let newElem;
let index = -1;
let txtTtl = "";
let txtCont = "";
let txtDte = "";
let cnfrm;

// animated text
let animIndex = 0;
let animTxtElem = document.getElementById('animTxt');
let animTxt = `THE ELEPHANT ROPE\n
As a man was passing the elephants, he suddenly stopped, confused by the fact that these huge creatures were being held by only a small rope tied to their front leg. No chains, no cages. It was obvious that the elephants could, at anytime, break away from their bonds but for some reason, they did not.\n
He saw a trainer nearby and asked why these animals just stood there and made no attempt to get away. “Well,” trainer said, “when they are very young and much smaller we use the same size rope to tie them and, at that age, it’s enough to hold them. As they grow up, they are conditioned to believe they cannot break away. They believe the rope can still hold them, so they never try to break free.”\n
The man was amazed. These animals could at any time break free from their bonds but because they believed they couldn’t, they were stuck right where they were.\n
Like the elephants, how many of us go through life hanging onto a belief that we cannot do something, simply because we failed at it once before?\n
Failure is part of learning; we should never give up the struggle in life.`;
let animLen = animTxt.length;
let loopBool = true;

// section elements
let sectMainElem = document.getElementById('section');
let sectElem = document.getElementById('sect');

// workspace elements
let workspaceElem = document.getElementById('workspace');
let dteElem = document.getElementById('dte');
let headElem = document.getElementById('ttl');
let contElem = document.getElementById('txt');
let edtDteElem = document.getElementById('edtDte');
let edtTtlElem = document.getElementById('edtTtl');
let edtTxtElem = document.getElementById('edtTxt');

// file handling elements
let fileHandlingElem = document.getElementById('fileHandling')
let srchBoxElem = document.getElementById('srchBox');
let nteEntElem = document.getElementById('noteEntries');
let dryEntElem = document.getElementById('diaryEntries');
let dataEntElems = [nteEntElem, dryEntElem];

// ad elements
let adElem = document.getElementById('ads');

// button elements
let hmeBtnElem = document.getElementById('hmeBtn');
let myNteBtnElem = document.getElementById('myNteBtn');
let myDryBtnElem = document.getElementById('myDryBtn');
let newBtnElem = document.getElementById('newBtn');
let btnsElem = document.getElementById('btns');
let clrBtnElem = document.getElementById('clrBtn');
let sveBtnElem = document.getElementById('sveBtn');
let delBtnElem = document.getElementById('delBtn');

// button events
hmeBtnElem.addEventListener('click', function () {
    refresh(0);
    hmeBtnElem.style.color = 'lightskyblue';
    myNteBtnElem.style.color = 'white';
    myDryBtnElem.style.color = 'white';
    animTxtElem.style.display = 'initial';
    sectMainElem.style.backgroundColor = 'white';
    sectElem.style.display = 'none';
    animTxtElem.style.display = 'initial';
    loopBool = true;
    loop1();
})
myNteBtnElem.addEventListener('click', function () {
    dataType = 0;
    refresh(1);
    nteEntElem.style.display = 'initial'
    dryEntElem.style.display = 'none';
    hmeBtnElem.style.color = 'white';
    myNteBtnElem.style.color = 'lightskyblue';
    myDryBtnElem.style.color = 'white';
    sectMainElem.style.backgroundColor = 'initial';
    sectElem.style.display = 'flex';
    animTxtElem.style.display = 'none';
    loopBool = false;
})
myDryBtnElem.addEventListener('click', function () {
    dataType = 1;
    refresh(1);
    nteEntElem.style.display = 'none';
    dryEntElem.style.display = 'initial'
    hmeBtnElem.style.color = 'white';
    myNteBtnElem.style.color = 'white';
    myDryBtnElem.style.color = 'lightskyblue';
    sectMainElem.style.backgroundColor = 'initial';
    sectElem.style.display = 'flex';
    animTxtElem.style.display = 'none';
    loopBool = false;
})
newBtnElem.addEventListener('click', function () {
    newBool = true;
    clrValues();
    defaultList();
    dataType === 0 ? refresh(2) : refresh(3);
})
clrBtnElem.addEventListener('click', function () {
    clrValues();
})
sveBtnElem.addEventListener('click', function () {
    txtTtl = edtTtlElem.value;
    txtCont = edtTxtElem.value;
    txtDte = edtDteElem.value;

    if (txtTtl === "") {
        alert(`Title is missing`);
        return;
    }
    else if (txtDte === "" && dataType === 1) {
        alert(`Date is missing`);
        return;
    }

    (dataType === 0) ? cnfrm = confirm(`save changes to "${txtTtl}"?`) : cnfrm = confirm(`save changes to "${txtDte}"?`);
    if (cnfrm) {
        if (newBool) {
            if (findArrayIndex(data[dataType], txtTtl, txtDte) !== -1) {
                (dataType === 0) ? alert(`Title already exists`) : alert(`Date already exists`);
                return;
            }
            count[dataType]++;
            addData(txtTtl, txtCont, txtDte);
            refresh(1);
            newBool = false;
        }
        else {
            if ((findArrayIndex(data[dataType], txtTtl, txtDte) !== -1) && (index !== findArrayIndex(data[dataType], txtTtl, txtDte))) {
                (dataType === 0) ? alert(`Title already exists`) : alert(`Date already exists`);
                return;
            }
            data[dataType][index][0] = txtTtl;
            data[dataType][index][1] = txtCont;
            headElem.innerText = txtTtl;
            contElem.innerText = txtCont;
            if (dataType == 0) {
                fileElems[dataType][count[dataType] - index - 1].innerText = txtTtl;
                refresh(4);
            }
            else {
                fileElems[dataType][count[dataType] - index - 1].innerText = txtDte;
                dteElem.innerText = txtDte;
                data[dataType][index][2] = txtDte;
                refresh(5);
            }

        }
        localStorage.setItem('data', JSON.stringify(data));
    }
})

delBtnElem.addEventListener('click', function () {
    if (newBool)
        clrValues();
    else {
        cnfrm = confirm(`"${fileElems[dataType][count[dataType] - index - 1].innerText}" will be permanently deleted.\nAre you sure?`);
        if (cnfrm) {
            fileElems[dataType][count[dataType] - index - 1].remove();
            fileElems[dataType].splice(count[dataType] - index - 1, 1);
            data[dataType].splice(index, 1);
            count[dataType]--;
            refresh(6);
            defaultList();
            localStorage.setItem('data', JSON.stringify(data));
        }
    }
})

// editable
dteElem.addEventListener('click', function () {
    if (!newBool) {
        (dataType === 0) ? refresh(2) : refresh(3);
        edtDteElem.value = dteElem.innerText;
        edtTtlElem.value = headElem.innerText;
        edtTxtElem.value = contElem.innerText;
    }
})
headElem.addEventListener('click', function () {
    if (!newBool) {
        (dataType === 0) ? refresh(2) : refresh(3);
        edtDteElem.value = dteElem.innerText;
        edtTtlElem.value = headElem.innerText;
        edtTxtElem.value = contElem.innerText;
    }
})
contElem.addEventListener('click', function () {
    if (!newBool) {
        (dataType === 0) ? refresh(2) : refresh(3);
        edtDteElem.value = dteElem.innerText;
        edtTtlElem.value = headElem.innerText;
        edtTxtElem.value = contElem.innerText;
    }
})
// searching
srchBoxElem.addEventListener('keyup', function () {
    find(srchBoxElem.value);
})
srchBoxElem.addEventListener('blur', function () {
    if (srchBoxElem.value === "")
        defaultList();
})

// text animation
function loop1() {
    if (loopBool) {
        if (animTxt[animIndex] === " ")
            animTxtElem.innerText += ` ${animTxt[++animIndex]}`;
        else
            animTxtElem.innerText += animTxt[animIndex];
        animIndex++;
        if (animIndex >= animLen) {
            animIndex = 0;
            animTxtElem.innerText = "";
        }
        setTimeout(function () {
            loop2();
        }, 70);
    }
}
function loop2() {
    if (loopBool) {
        if (animTxt[animIndex] === " ")
            animTxtElem.innerText += ` ${animTxt[++animIndex]}`;
        else
            animTxtElem.innerText += animTxt[animIndex];
        animIndex++;
        if (animIndex >= animLen) {
            animIndex = 0;
            animTxtElem.innerText = "";
        }
        setTimeout(function () {
            loop1();
        }, 70);
    }
}

// utility functions
function clrValues() {
    edtDteElem.value = "";
    edtTtlElem.value = "";
    edtTxtElem.value = "";
}

function findArrayIndex(arr, ttl, dte) {
    if (dataType === 0) {
        for (let i = 0; i < count[dataType]; i++)
            if (arr[i][0] === ttl)
                return i;
    }
    else {
        for (let i = 0; i < count[dataType]; i++)
            if (arr[i][2] === dte)
                return i;
    }
    return -1;
}

function updateNote() {
    let updateBool = false;
    for (let i = 0; i < count[dataType]; i++) {
        if (fileElems[dataType][count[dataType] - i - 1].style.display !== 'none') {
            updateBool = true;
            headElem.innerText = data[dataType][i][0];
            contElem.innerText = data[dataType][i][1];
            if (dataType === 0)
                dteElem.innerText = data[dataType][i][2]
            break;
        }
    }
    if (!updateBool) {
        dteElem.innerText = "";
        headElem.innerText = "";
        contElem.innerText = "------------";
    }
}

function find(textStr) {
    for (let i = 0; i < count[dataType]; i++) {
        if (dataType === 0) {
            if (!data[dataType][count[dataType] - i - 1][0].includes(textStr) && !data[dataType][count[dataType] - i - 1][1].includes(textStr))
                fileElems[dataType][i].style.display = 'none';
            else
                fileElems[dataType][i].style.display = 'block';
        }
        else {
            if (!data[dataType][count[dataType] - i - 1][0].includes(textStr) && !data[dataType][count[dataType] - i - 1][1].includes(textStr) && !data[dataType][count[dataType] - i - 1][2].includes(textStr))
                fileElems[dataType][i].style.display = 'none';
            else
                fileElems[dataType][i].style.display = 'block';
        }
        updateNote();
    }
}

function defaultList() {
    fileElems[dataType].forEach(element => {
        if (srchBoxElem.value === "")
            element.style.display = 'block';
        element.style.color = 'black';
    })
}

// adding event listener to new file item element created
function addFileEventListener(newElement) {
    newElement.addEventListener('click', function () {
        index = findArrayIndex(data[dataType], newElement.innerText, newElement.innerText);
        headElem.innerText = data[dataType][index][0];
        contElem.innerText = data[dataType][index][1];
        if (dataType === 0)
            refresh(4);
        else {
            dteElem.innerText = data[dataType][index][2];
            refresh(5);
        }
        defaultList();
        newElement.style.color = 'lightseagreen';
        newBool = false;
    })
}

function addData(titleStr, textStr, dateStr) {
    let newElem = document.createElement('li');
    newElem.id = `${dataType}file${count[dataType]}`;
    if (dataType === 0) {
        newElem.innerText = titleStr;
        data[dataType].unshift([titleStr, textStr]);
    }
    else {
        newElem.innerText = dateStr;
        data[dataType].unshift([titleStr, textStr, dateStr]);
    }
    fileElems[dataType].push(newElem);
    dataEntElems[dataType].insertBefore(newElem, dataEntElems[dataType].firstElementChild) // adding to html list
    addFileEventListener(newElem);
    console.log(fileElems);
}

function getData() {
    let lclData = localStorage.getItem('data');
    let newElement;
    if (lclData !== null) {
        data = JSON.parse(lclData);
        for (let i = 0; i <= 1; i++) {
            count[i] = Object.keys(data[i]).length;
            for (let j = 0; j < count[i]; j++) {
                newElement = document.createElement('li');
                newElement.id = `${i}file${count[i] - j}`;
                (i === 0) ? newElement.innerText = data[i][j][0] : newElement.innerText = data[i][j][2];
                dataEntElems[i].appendChild(newElement, dataEntElems[i].firstElementChild);
                fileElems[i].unshift(newElement);
            }
            // generating file events
            fileElems[i].forEach(element => {
                element.addEventListener('click', function () {
                    index = findArrayIndex(data[i], element.innerText, element.innerText);
                    headElem.innerText = data[i][index][0];
                    contElem.innerText = data[i][index][1];
                    if (i === 1)
                        dteElem.innerText = data[i][index][2];
                    if (dataType === 0)
                        refresh(4);
                    else {
                        dteElem.innerText = data[dataType][index][2];
                        refresh(5);
                    }
                    defaultList();
                    element.style.color = 'lightseagreen';
                    newBool = false;
                })
            })
        }
    }
}

function refresh(mode) {
    switch (mode) {
        case 0:
            workspaceElem.style.display = 'none';
            fileHandlingElem.style.display = 'none';
            break;
        case 1:
            workspaceElem.style.display = 'flex';
            fileHandlingElem.style.display = 'flex';
            dteElem.style.display = 'none';
            headElem.style.display = 'none';
            contElem.style.display = 'none';
            edtDteElem.style.display = 'none';
            edtTtlElem.style.display = 'none';
            edtTxtElem.style.display = 'none';
            newBtnElem.style.display = 'initial';
            btnsElem.style.display = 'none';
            break;
        case 2:
            dteElem.style.display = 'none';
            headElem.style.display = 'none';
            contElem.style.display = 'none';
            edtDteElem.style.display = 'none';
            edtTtlElem.style.display = 'initial';
            edtTxtElem.style.display = 'initial';
            newBtnElem.style.display = 'none';
            btnsElem.style.display = 'flex';
            break;

        case 3:
            dteElem.style.display = 'none';
            headElem.style.display = 'none';
            contElem.style.display = 'none';
            edtDteElem.style.display = 'initial';
            edtTtlElem.style.display = 'initial';
            edtTxtElem.style.display = 'initial';
            newBtnElem.style.display = 'none';
            btnsElem.style.display = 'flex';
            break;

        case 4:
            dteElem.style.display = 'none';
            headElem.style.display = 'initial';
            contElem.style.display = 'initial';
            edtDteElem.style.display = 'none';
            edtTtlElem.style.display = 'none';
            edtTxtElem.style.display = 'none';
            newBtnElem.style.display = 'initial';
            btnsElem.style.display = 'none';
            break;

        case 5:
            dteElem.style.display = 'initial';
            headElem.style.display = 'initial';
            contElem.style.display = 'initial';
            edtDteElem.style.display = 'none';
            edtTtlElem.style.display = 'none';
            edtTxtElem.style.display = 'none';
            newBtnElem.style.display = 'initial';
            btnsElem.style.display = 'none';
            break;

        case 6:
            dteElem.style.display = 'none';
            headElem.style.display = 'none';
            contElem.style.display = 'none';
            edtDteElem.style.display = 'none';
            edtTtlElem.style.display = 'none';
            edtTxtElem.style.display = 'none';
            newBtnElem.style.display = 'initial';
            btnsElem.style.display = 'none';
            break;
    }
}

// getting ready
sectMainElem.style.backgroundColor = 'white';
sectElem.style.display = 'none';
animTxtElem.style.display = 'initial';
hmeBtnElem.style.color = 'lightskyblue';
refresh(0);
getData();
loop1();