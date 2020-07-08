/* googleCharts.js Version: 2.0.0 Built On: 2020-07-08 */
const loadScript = Symbol('loadScript');
const instance = Symbol('instance');
let _instance;

class GoogleChartsManager {
    get [instance]() {
        return _instance
    }

    set [instance](value) {
        _instance = value;
    }

    constructor() {
        if (this[instance]) {
            return this[instance]
        }

        this[instance] = this;
    }

    reset() {
        _instance = null;
    }

    [loadScript](version = 'current') {
        if (!this.scriptPromise) {
            this.scriptPromise = new Promise(resolve => {
                const body = document.getElementsByTagName('body')[0];
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.onload = function() {
                    GoogleCharts.api = window.google;
                    GoogleCharts.api.charts.load(version, {
                        packages: ['corechart', 'table'],
                    });
                    GoogleCharts.api.charts.setOnLoadCallback(() => {
                        resolve();
                    });
                };
                script.src = 'https://www.gstatic.com/charts/loader.js';
                body.appendChild(script);
            });
        }
        return this.scriptPromise
    }

    load(callback, type, version = 'current') {
        return this[loadScript](version).then(() => {
            if (type) {
                let config = {};
                if (type instanceof Object) {
                    config = type;
                } else if (Array.isArray(type)) {
                    config = { packages: type };
                } else {
                    config = { packages: [type] };
                }
                this.api.charts.load(version, config);
                this.api.charts.setOnLoadCallback(callback);
            } else {
                if(typeof callback != 'function') {
                    throw('callback must be a function');
                } else {
                    callback();
                }
            }
        })
    }
}

const GoogleCharts = new GoogleChartsManager();

export default GoogleChartsManager;
export { GoogleCharts };
