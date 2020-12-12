class SplineMethod {
    constructor(options) {
        this.data = options.data;
    }

    doMethod(options) {ц
        const x = options.additionals.x;
        let a = [];
        let b = [];
        b[0] = 0;
        for (let i = 0; i < grid.X.length - 1; i++) {
            b[i + 1] = 2 * (grid.Y[i + 1] - grid.Y[i]) / (grid.X[i + 1] - grid.X[i]) - b[i];
        }
        for (let i = 0; i < grid.X.length - 1; i++) {
            a[i] = (b[i + 1] - b[i]) / 2 / (grid.X[i + 1] - grid.X[i]);
        }

        let result = -1;
        for (let i = 1; i < grid.X.length; i++) {
            if (x >= grid.X[i - 1] && x <= grid.X[i]) {
                result = a[i - 1] * (x - grid.X[i - 1]) * (x - grid.X[i - 1]) + b[i - 1] * (x - grid.X[i - 1]) + grid.Y[i - 1];
            }
        }
        return { results: result };
    }

    factorial(n) {
        return (n != 1) ? n * this.factorial(n - 1) : 1;
    }
}