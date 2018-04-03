const loadScript = Symbol('loadScript');

class googleCharts {
    [loadScript]() {
        if (!this.scriptPromise) {
            this.scriptPromise = new Promise((resolve) => {
                const body = document.getElementsByTagName('body')[0]
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.onload = function () {
                    GoogleCharts.api = window.google
                    GoogleCharts.api.charts.load('current', {'packages': ['corechart', 'table']});
                    GoogleCharts.api.charts.setOnLoadCallback(() => {
                        resolve()
                    })
                }
                script.src = 'https://www.gstatic.com/charts/loader.js'
                body.appendChild(script)
            })
        }
        return this.scriptPromise
    }

    load(callback, type) {
        return this[loadScript]().then(() => {
            if (type) {
                if(!Array.isArray(type)) {
                    type=[type]
                }
                this.api.charts.load('current', {'packages': type})
                this.api.charts.setOnLoadCallback(callback)
            } else {
                callback()
            }
        })
    }
}

export let GoogleCharts = new googleCharts();

if (module.hot) {
    module.hot.accept();
}