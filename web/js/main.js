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

function run() {

}

run();