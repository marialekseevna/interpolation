class LagrangeMethod {
    constructor(options) {
        this.data = options.data;
    }

    doMethod(options) {
        const grid = this.data.grid;
        const x = options.additionals.x;
        let results = [];
        let equations = [];
        for (let i = 0; i < grid.X.length; i++) {
            let parentheses = [];
            let currentParentheses = [];
            let denominator = 1;
            for (let j = 0; j < grid.X.length; j++) {
                if (i != j) {
                    parentheses.push([new Num({ degree: 1, multiplier: 1 }), new Num({ degree: 0, multiplier: (-1) * grid.X[j] })]);
                    denominator *= grid.X[i] - grid.X[j];
                }
            }
            for (let j = 1; j < parentheses.length; j++) {
                for (let k = 0; k < parentheses[j].length; k++) {
                    for (let y = 0; y < parentheses[0].length; y++) {
                        currentParentheses.push(new Num({ degree: parentheses[j][k].degree + parentheses[0][y].degree, multiplier: parentheses[j][k].multiplier * parentheses[0][y].multiplier }));
                    }
                }
                parentheses[0] = currentParentheses;
                currentParentheses = [];
            }
            for (let j = 0; j < parentheses[0].length; j++) {
                for (let k = 0; k < parentheses[0].length; k++) {
                    if (j != k) {
                        if (parentheses[0][j].degree == parentheses[0][k].degree) {
                            parentheses[0][j].multiplier = parentheses[0][j].multiplier + parentheses[0][k].multiplier;
                            parentheses[0].splice(k, 1);
                        }
                    }
                }
            }
            for (let j = 0; j < parentheses[0].length; j++) {
                parentheses[0][j].multiplier *= grid.Y[i] / denominator;
            }
            equations.push(parentheses[0]);
        }
        for (let i = 0; i < equations[0].length; i++) {
            const num = equations[0][i];
            for (let j = 1; j < equations.length; j++) {
                for (let k = 0; k < equations[j].length; k++) {
                    if (num.degree == equations[j][k].degree) {
                        num.multiplier += equations[j][k].multiplier;
                    }
                }
            }
            results.push(num);
        }
        let res = 0;
        if ($.isNumeric(x)) {
            for (let i = 0; i < results.length; i++) {
                res += Math.pow(x, results[i].degree) * results[i].multiplier;
            }
            return { results: res };
        }
        return { results: results };
    }

    toValid() {

    }

}