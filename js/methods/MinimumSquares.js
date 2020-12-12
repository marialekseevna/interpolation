class MinimumSquares {
    constructor(options) {
        this.data = options.data;
    }

    doMethod(options) {
        let grid = this.data.grid;
        grid.Y = [];
        let b = [];
        let a = [];
        const x = options.additionals.x;
        for (let i = 0; i < grid.X.length; i++) {
            grid.Y[i] = Math.exp(grid.X[i]);
        }
        const m = 3;
        let matrixC = [];
        for (let i = 0; i < m; i++) {
            matrixC[i] = [];
        }
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                let sum = 0;
                for (let k = 0; k < grid.X.length; k++) {
                    sum += Math.pow(grid.X[k], i) * Math.pow(grid.X[k], j);
                }
            matrixC[i][j] = sum;
            }
        }
        for (let i = 0; i < m; i++) {
            let sum = 0;
            for (let j = 0; j < grid.X.length; j++) {
                sum += Math.pow(grid.X[j], i) * grid.Y[j];
            }
            b[i] = sum;
        }
        let invertedMatrix = math.inv(matrixC);
        a = math.multiply(invertedMatrix, b);
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result += a[i] * Math.pow(x, i);
        }
        return { results: result };
    }

    toValid() {

    }
}