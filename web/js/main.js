/**
 * generate 0 or 1 number
 */
function getSwitchRandom() {
    const generatedNumber = Math.floor(Math.random() * 11);

    return generatedNumber > 5
        ? 1
        : 0;
}

/**
 * generate array for table in format [
 *     [0, 1, 0, 1],
 *     [0, 1, 0, 1]
 * ]
 */
function generateStructure(width, height) {
    const structure = [];

    for (let i = 0; i < height; i++) {
        if (!structure[i]) {
            structure[i] = [];
        }

        for (let j = 0; j < width; j++) {
            structure[i][j] = getSwitchRandom();
        }
    }

    return structure;
}

/**
 * calculate how much cells 0 have cells 1 in count more or equals 2
 *
 * in structure [
 *     [0, 1, 0, 0],
 *     [0, 0, 1, 0]
 * ]
 *
 * 2 cells satisfy that condition [0, 2] cell and [1, 1] cell
 *
 * @returns count of cells, that satisfy that condition
 */
function calculateCells(structure) {
    let count = 0;

    for (let i = 0; i < structure.length; i++) {
        const lengthOfInner = structure[i].length;

        for (let j = 0; j < lengthOfInner; j++) {
            if (predicate(structure, i, j)) {
                count++;
            }
        }
    }

    return count;
}

/**
 * performs role of condition for calculateCells
 */
function predicate(structure, x, y) {
    const value = structure[x][y];

    if (value !== 0) return false;

    const peripheralValues = [];

    peripheralValues.push(
        getValue(structure, x, y - 1),
        getValue(structure, x, y + 1),
        getValue(structure, x - 1, y),
        getValue(structure, x + 1, y)
    );

    return peripheralValues.filter(i => i === 1).length >= 2;
}

/**
 * if value doesn't have, return -1, else value
 */
function getValue(structure, x, y) {
    if (!structure[x] || !structure[x][y]) {
        return -1;
    }

    return structure[x][y];
}


/**
 * create view of structure in html table
 */
function renderTable(structure) {
    const tableRoot = document.createElement('table');
    tableRoot.classList.add('table');
    const tableBody = document.createElement('tbody');
    tableRoot.appendChild(tableBody);

    for (let i = 0; i < structure.length; i++) {
        const innerLength = structure[i].length;

        const tableRow = document.createElement('tr');

        for (let j = 0; j < innerLength; j++) {
            const tableData = document.createElement('td');
            tableData.textContent = structure[i][j];
            tableRow.appendChild(tableData);
        }

        tableBody.appendChild(tableRow);
    }

    return tableRoot;
}

/**
 * alert message of count cells that satisfy condition
 */
function alertCount(count, width, height) {
    alert(`count of cells with value 0 with peripheral cells with value 1 count equals or more than 2 in table ${width}x${height}\ncount: ${count}`);
}

/**
 * change table style with yellow cells
 */
function tableToWarning(tableNode) {
    if (!Array.from(tableNode.classList).includes('table-warning')) {
        tableNode.classList.add('table-warning');
    }
}

function setupEventListenersToButtons(btnArray, btnForAlert, dto) {
    btnArray.forEach(btn => {
        const button = document.getElementById(btn);

        if (btn === btnForAlert) {
            button.addEventListener('click', () => {
                alertCount(dto.count, dto.width, dto.height);
                tableToWarning(dto.tableNode);
            });
        } else {
            button.addEventListener('click', () => {
                tableToWarning(dto.tableNode);
            });
        }
    });
}

function run() {
    const root = document.getElementById('root');

    const tableSize = 5;
    const buttons = ['btn1', 'btn2', 'btn3'];
    const buttonForAlert = 'btn2';

    const structure = generateStructure(tableSize, tableSize);
    const countOfCells = calculateCells(structure);

    const tableNode = renderTable(structure);

    setupEventListenersToButtons(buttons, buttonForAlert, {
        count: countOfCells,
        width: tableSize,
        height: tableSize,
        tableNode: tableNode
    });

    root.appendChild(tableNode);
}

run();