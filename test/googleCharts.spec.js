const assert = require('assert')
const describe = require('mocha').describe
const beforeEach = require('mocha').beforeEach
const afterEach = require('mocha').afterEach

const before = require('mocha').before
const after= require('mocha').after

const sinon = require('sinon')

const expect = require('chai').expect

var it = require('mocha').it

const mockBody = {
    appendChild: function(child) {
        child.onload()
        return true
    },
}

const mockGoogle = {
    charts: {
        load: function() {},
        setOnLoadCallback: function(callback) {
            callback()
        },
    },
}

const mockDocument = {
    getElementsByTagName: function(tag) {
        if (tag != 'body') {
            return null
        }

        return [mockBody]
    },

    createElement: function(type) {
        if (type != 'script') {
            return null
        }

        return {}
    },
}

const mockWindow = {
    document: mockDocument,
    google: mockGoogle,
}

module.exports = (function() {
    describe('Library', function() {
        describe('Module Loading', function() {
            it('should initaliize successfully', function(done) {
                const actual = require('../src/googleCharts')
                assert.notEqual(actual, undefined, 'and not be undefined')
                assert.notEqual(actual, null, 'and not be null')
                assert.notEqual(actual, {}, 'and not be empty')
                done()
            })

            it('should have a default export', function(done) {
                const actual = require('../src/googleCharts').default
                assert.notEqual(actual, undefined, 'and not be undefined')
                assert.notEqual(actual, null, 'and not be null')
                assert.notEqual(actual, {}, 'and not be empty')
                done()
            })

            it('should export the GoogleChartsManager object by default', function(done) {
                const GoogleChartsManager = require('../src/googleCharts')
                const googleChartsManager = new GoogleChartsManager.default()

                assert.equal(
                    googleChartsManager.constructor.name,
                    'GoogleChartsManager',
                    'type of default export is incorrect'
                )
                done()
            })
        })

        describe('Singleton Functionality', function() {
            it('should be a singleton', function(done) {
                const GoogleChartsManager = require('../src/googleCharts')
                    .default
                const googleChartsManager = new GoogleChartsManager()
                const googleChartsManager_2 = new GoogleChartsManager()
                assert.equal(
                    googleChartsManager,
                    googleChartsManager_2,
                    'the class is not a singleton'
                )
                done()
            })

            it('should be a resetable', function(done) {
                const GoogleChartsManager = require('../src/googleCharts')
                    .default
                const googleChartsManager = new GoogleChartsManager()
                googleChartsManager.reset()
                const googleChartsManager_2 = new GoogleChartsManager()

                assert.notEqual(
                    googleChartsManager,
                    googleChartsManager_2,
                    'the class does not reset properly'
                )
                done()
            })
        })

        describe('API', function() {

            before(function(){
                const GoogleChartsManager = require('../src/googleCharts').default
                const googleChartsManager = new GoogleChartsManager()
                googleChartsManager.reset()

                global.document = mockDocument
                global.window = mockWindow       
                global.googleChartsManager = googleChartsManager
            })

            after(function(){
                sinon.restore()

                delete global.document
                delete global.window
                delete global.googleChartsManager
            })

            beforeEach(function() {
                const GoogleChartsManager = require('../src/googleCharts').default
                const googleChartsManager = new GoogleChartsManager()
                global.googleChartsManager = googleChartsManager
            })

            afterEach(function() {
               
            })

            it('should have a load function', function(done) {
                expect(global.googleChartsManager.load)
                    .to.exist
                    .to.be.a('function', 'load must be a function')
                done()
            })

            it('should call a callback on load', function() {
                const test_callback= sinon.spy()
                global.googleChartsManager.load(test_callback).then(
                    function() {
                        assert(test_callback.called, 'the callback must be called')
                    }
                )
            })

            // sinon.spy(mockDocument, "getElementsByTagName")
            // console.log(googleChartsManager.constructor.name)
            // console.log(GoogleChartsManager.GoogleCharts)
            // console.log(googleChartsManager)
            // console.log(GoogleChartsManager.GoogleCharts === googleChartsManager)
            // googleChartsManager.reset();
            // googleChartsManager = new GoogleChartsManager.default()
            // console.log(GoogleChartsManager.GoogleCharts === googleChartsManager)
        })
    })
})()
