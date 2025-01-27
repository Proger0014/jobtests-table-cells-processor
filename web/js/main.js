function getSwitchRandom() {
    const generatedNumber = Math.floor(Math.random() * 11);

    return generatedNumber > 5
        ? 1
        : 0;
}

function run() {

}

run();