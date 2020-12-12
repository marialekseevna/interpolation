class NewtonMethod {
    constructor(options) {
        this.data = options.data;
    }

    doMethod(options) {
        const grid = this.data.grid;
        const x = options.additionals.x;
        let results = [];
        let parentheses = [];
        let equations = [];
        let p = [ [] ];
        for (let i = 0; i < grid.X.length - 1; i++) {
            p[0].push((grid.Y[i + 1] - grid.Y[i]) / (grid.X[i + 1] - grid.X[i]));
        }
        let n = 0;
        for (let i = p[0].length - 2; i >= 0; i--) {
            p.push([]);
            for (let j = 0; j < i + 1; j++) {
                p[n + 1].push((p[n][j + 1] - p[n][j]) / (grid.X[j + 2 + n] - grid.X[j]));
            }
            n++;
        }
        for (let i = 0; i < grid.X.length - 1; i++) {
            parentheses.push([]);
            for (let j = 0; j < i + 1; j++) {
                parentheses[i].push([]);
                parentheses[i][j].push(new Num({ degree: 1, multiplier: 1 }));
                parentheses[i][j].push(new Num({ degree: 0, multiplier: -(grid.X[j]) }));
            }
        }
        for (let i = 1; i < parentheses.length; i++) {
            let currentParentheses = [];
            for (let j = 1; j < parentheses[i].length; j++) {
                for (let k = 0; k < parentheses[i][0].length; k++) {
                    for (let l = 0; l < parentheses[i][j].length; l++) {
                        currentParentheses.push(new Num({ degree: parentheses[i][0][k].degree + parentheses[i][j][l].degree, multiplier: parentheses[i][0][k].multiplier * parentheses[i][j][l].multiplier }));
                    }
                }
                parentheses[i][0] = currentParentheses;
                currentParentheses = [];
            }
        }
        equations.push(new Num({ degree: 0, multiplier: grid.Y[0]}));
        for (let i = 0; i < parentheses.length; i++) {
            for (let j = 0; j < parentheses[i][0].length; j++) {
                parentheses[i][0][j].multiplier *= p[i][0];
                equations.push(parentheses[i][0][j]);
            }
        }
        for (let i = 0; i < equations.length; i++) {
            if (equations[i] != null) {
                for (let j = 0; j < equations.length; j++) {
                    if (i != j && equations[j] != null && equations[i].degree == equations[j].degree) {
                        equations[i].multiplier += equations[j].multiplier;
                        equations[j]= null;
                    }
                }
                results.push(equations[i])
            }
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