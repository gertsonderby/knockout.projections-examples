(function () {

function SimpleViewModel(data) {
    this.name = ko.observable(data.name);
    this.number = ko.observable(data.number);
    this.array = ko.observableArray(data.array);
}

var state = {
    models: ko.observableArray([]),
    results: ko.observableArray()
};

function randInt(from, to) {
    return Math.round(Math.random() * (to - from)) + from;
}

var NAMECHARS = "abcdefghijklmnopqrstuvxyz".split('');
function getChar() {
    return NAMECHARS[randInt(1, NAMECHARS.length) - 1];
}

function makeName(length) {
    var i, name = getChar().toUpperCase();
    for (i = 0; i < length; i += 1) {
        name += getChar();
    }
    return name;
}

function makeArray(length) {
    var i, array = [];
    for (i = 0; i < length; i += 1) {
        array.push(randInt(0,9));
    }
    return array;
}

function makeModel() {
    return {
        name: makeName(randInt(3, 6)),
        number: randInt(10, 99),
        array: makeArray(randInt(2, 5))
    };
}

function makeState(count) {
    if (!count) count = 10;
    var i, models = [];
    for (i = 0; i < count; i += 1) {
        models.push(makeModel());
    }
    state.models(models);
}

state.views = state.models.map(function (model) {
    return new SimpleViewModel(model);
});

window.state = state;

document.addEventListener("DOMContentLoaded", function() {
    ko.applyBindings(state);
});

function addResult(title, outcome) {
    state.results.push({
        title: title,
        result: outcome + ''
    });
}

function runTest(title, test) {
    var startTime = new Date();
    test();
    var endTime = new Date();
    addResult(title, endTime - startTime);
}

runTest("Simple viewmodel map, ten thousand items", function () {
    makeState(10000);
});

// runTest("Reverse", function() {
//     state.models.reverse();
// });

var array = state.models();
var iterations = 5;
var startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 5 elements in batch.", function () {
    state.models(array);
});

iterations = 50;
startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 50 elements in batch.", function () {
    state.models(array);
});

iterations = 250;
startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 250 elements in batch.", function () {
    state.models(array);
});

iterations = 500;
startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 500 elements in batch.", function () {
    state.models(array);
});

iterations = 1000;
startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 1000 elements in batch.", function () {
    state.models(array);
});

iterations = 3000;
startPoint = randInt(0,9999 - iterations);
while (iterations--) {
    array[startPoint + iterations] = makeModel();
}
runTest("Replace 3000 elements in batch.", function () {
    state.models(array);
});

runTest("Replace 5 elements individually.", function () {
    var iterations = 5;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});

runTest("Replace 50 elements individually.", function () {
    var iterations = 50;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});

runTest("Replace 250 elements individually.", function () {
    var iterations = 250;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});

runTest("Replace 500 elements individually.", function () {
    var iterations = 500;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});

runTest("Replace 1000 elements individually.", function () {
    var iterations = 1000;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});

runTest("Replace 3000 elements individually.", function () {
    var iterations = 3000;
    startPoint = randInt(0,9999 - iterations);
    while (iterations--) {
        state.models.replace(startPoint + iterations, makeModel());
    }
});



})();
