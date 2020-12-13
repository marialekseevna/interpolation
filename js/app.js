class App {
    constructor(options) {
        this.data = {
            method: 'NewtonMethod',
            grid: null,
            flags: {
                isGrid: false
            },
            methodList: [
                { 
                    name: 'LagrangeMethod',
                    additionalElem: [{ type: 'input', name: 'x', text: 'X'}]
                },
                {
                    name: 'NewtonMethod',
                    additionalElem: [{ type: 'input', name: 'x', text: 'X'}]
                },
                {
                    name: 'NewtonNodesMethod',
                    additionalElem: [{ type: 'input', name: 'h', text: 'h'}, { type: 'input', name: 'x', text: 'X'}]
                },
                {
                    name: 'SplineMethod',
                    additionalElem: [{ type: 'input', name: 'x', text: 'X'}]
                },
                {
                    name: 'MinimumSquares',
                    additionalElem: [{ type: 'input', name: 'x', text: 'X'}]
                }
                
            ]
        }
        this.UI = new UI({ data: this.data });
        this.LagrangeMethod = new LagrangeMethod({ data: this.data });
        this.NewtonMethod = new NewtonMethod({ data: this.data });
        this.NewtonNodesMethod = new NewtonNodesMethod({ data: this.data });
        this.SplineMethod = new SplineMethod({ data: this.data });
        this.MinimumSquares = new MinimumSquares({ data: this.data });
        
        document.getElementById('calculateBut').addEventListener('click', () => {
            this.toCalculate();
        });
    }

    toCalculate() {
        this.getGrid();
        const results = this[this.data.method].doMethod({ additionals: this.getAdditionalElem() });
        if (results.results == null) {
            //console.log(result.error);
        } else {
            alert("Ответ: " + results.results);
            //console.log(results.results);
        }
    }

    getGrid () {
        if (this.data.flags.isGrid) {
            let grid = { X: [], Y: [] };
            const xVal = document.getElementsByClassName('X');
            const yVal = document.getElementsByClassName('Y');
            for (let i = 0; i < xVal.length; i++) {
                if (!xVal[i].value) {
                    grid.X.push(0);
                } else {
                    grid.X.push(parseFloat(xVal[i].value));
                }
                if (!yVal[i].value) {
                    grid.Y.push(0);
                } else {
                    grid.Y.push(parseFloat(yVal[i].value));
                }
            }
            this.data.grid = grid;
        }
    }

    getAdditionalElem() {
        const additionalElems = document.getElementsByClassName('additionalElems');
        if (additionalElems) {
            let additionals = {};
            for (let i = 0; i < additionalElems.length; i++) {
                additionals[additionalElems[i].name] = parseFloat(additionalElems[i].value);
            }
            return additionals;
        }
    }
}
