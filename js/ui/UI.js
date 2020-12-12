class UI {
    constructor(options) {
        this.data = options.data;
        this.gridDiv = document.getElementById("grid");
        this.xDiv = document.getElementById("X");
        this.yDiv = document.getElementById("Y");
        this.methodList = document.getElementById("methodList");
        this.additionalElemDiv = document.getElementById("additionalElem");
        this.nodeSize = document.getElementById("nodeSize");
        this.createGridBut = document.getElementById('createGridBut');

        this.createGridBut.addEventListener('click', () => {
            this.toCreateGrid();
        });
        this.methodList.addEventListener('change', (event) => {
            this.toChoiceMethod(event);
        });
    }

    toCreateGrid() {
        this.data.flags.isGrid = true;
        while(this.xDiv.firstChild) this.xDiv.removeChild(this.xDiv.firstChild);
        while(this.yDiv.firstChild) this.yDiv.removeChild(this.yDiv.firstChild);
        const nodeSize = this.nodeSize.value;
        let spanX = document.createElement('span');
        let spanY = document.createElement('span');
        spanX.innerHTML = 'X: ';
        spanY.innerHTML = 'Y: ';
        this.xDiv.appendChild(spanX);
        this.yDiv.appendChild(spanY);
        for (let i = 1; i <= nodeSize; i++) {
            let inputX = document.createElement('input');
            let inputY = document.createElement('input');
            inputX.classList.add('X');
            inputY.classList.add('Y');
            inputX.classList.add('input');
            inputY.classList.add('input');
            this.xDiv.appendChild(inputX);
            this.yDiv.appendChild(inputY);
        }
    }

    toChoiceMethod(event) {
        const target = event.target.value;
        const methodList = this.data.methodList;
        let method;
        for (let i = 0; i < methodList.length; i++) {
            if (methodList[i].name == target) {
                this.data.method = methodList[i].name;
                method = methodList[i];
                break;
            }
        }
        while(this.additionalElemDiv.firstChild) this.additionalElemDiv.removeChild(this.additionalElemDiv.firstChild);
        if (method.additionalElem) {
            for (let i = 0; i < method.additionalElem.length; i++) {
                const elem = method.additionalElem[i];
                let span = document.createElement('span');
                let input = document.createElement('input');
                span.innerHTML = elem.text + ': ';
                input.classList.add('input');
                input.classList.add('additionalElems');
                input.setAttribute('name', elem.name);
                this.additionalElemDiv.append(span);
                this.additionalElemDiv.append(input);
                this.additionalElemDiv.append(document.createElement('br'));
            }
        }
    }
}