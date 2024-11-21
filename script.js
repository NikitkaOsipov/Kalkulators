const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const historyContainer = document.getElementById('historyContainer');
const STORAGE_NAME = 'calculatorHistory';

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '=') {
            calculate();
        } else if (value === 'AC') {
            clearInput();
        } else if (value === 'DEL') {
            deleteLastSymbol();
        } else {
            inputEl.value += value;
        }
    });
});

document.getElementById('clearHistory').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_NAME);
    refreshHistory();
});

function calculate() {
    try {
        const result = eval(inputEl.value);
        if (result !== undefined) {
            outputEl.value = result;
            addToHistory(inputEl.value + ' = ' + result);
            inputEl.value = '';
        }
    } catch (e) {
        outputEl.value = 'Error';
    }
}

function clearInput() {
    inputEl.value = '';
    outputEl.value = '';
}

function deleteLastSymbol() {
    inputEl.value = inputEl.value.slice(0, -1);
}

function addToHistory(entry) {
    let history = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
    history.push(entry);
    localStorage.setItem(STORAGE_NAME, JSON.stringify(history));
    refreshHistory();
}

function refreshHistory() {
    historyContainer.innerHTML = '';
    let history = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
    history.forEach((entry, index) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = entry;
        div.appendChild(label);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            history.splice(index, 1);
            localStorage.setItem(STORAGE_NAME, JSON.stringify(history));
            refreshHistory();
        });
        div.appendChild(deleteBtn);
        historyContainer.appendChild(div);
    });
}

refreshHistory();