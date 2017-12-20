module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/cookie-clicker/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "6Bxh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"stats":"stats__3OCC8","quantity":"quantity__2mZHu","cps":"cps__bJB71","github":"github__3lkF-","trash":"trash__1wpx7"};

/***/ }),

/***/ "C19U":
/***/ (function(module, exports, __webpack_require__) {

if (typeof indexedDB != 'undefined') {
  module.exports = __webpack_require__("enoJ");
} else {
  module.exports = {
    open: function open() {
      return Promise.reject('IDB requires a browser environment');
    },
    delete: function _delete() {
      return Promise.reject('IDB requires a browser environment');
    }
  };
}

/***/ }),

/***/ "GJKC":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"cookieContainer":"cookieContainer__3Mmp9","cookieWrapper":"cookieWrapper__1kii-"};

/***/ }),

/***/ "JDcw":
/***/ (function(module, exports) {

// http://stackoverflow.com/a/33268326/786644 - works in browser, worker, and Node.js
var globalVar = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' ? self : typeof global !== 'undefined' ? global : Function('return this;')();

(function (window) {
    "use strict";

    var Event, IDBIndex, IDBObjectStore, IDBRequest, getAll, getAllFactory, getAllKeys;

    IDBObjectStore = window.IDBObjectStore || window.webkitIDBObjectStore || window.mozIDBObjectStore || window.msIDBObjectStore;
    IDBIndex = window.IDBIndex || window.webkitIDBIndex || window.mozIDBIndex || window.msIDBIndex;

    if (typeof IDBObjectStore === "undefined" || typeof IDBIndex === "undefined" || IDBObjectStore.prototype.getAll !== undefined && IDBIndex.prototype.getAll !== undefined && IDBObjectStore.prototype.getAllKeys !== undefined && IDBIndex.prototype.getAllKeys !== undefined) {
        return;
    }

    if (IDBObjectStore.prototype.mozGetAll !== undefined && IDBIndex.prototype.mozGetAll !== undefined) {
        IDBObjectStore.prototype.getAll = IDBObjectStore.prototype.mozGetAll;
        IDBIndex.prototype.getAll = IDBIndex.prototype.mozGetAll;
        return;
    }

    // IDBRequest and Event objects mostly from https://github.com/dumbmatter/fakeIndexedDB
    IDBRequest = function IDBRequest() {
        this.result = null;
        this.error = null;
        this.source = null;
        this.transaction = null;
        this.readyState = 'pending';
        this.onsuccess = null;
        this.onerror = null;

        this.toString = function () {
            return '[object IDBRequest]';
        };
    };
    Event = function Event(type) {
        this.type = type;
        this.target = null;
        this.currentTarget = null;

        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        this.eventPhase = this.NONE;

        this.stopPropagation = function () {
            console.log('stopPropagation not implemented in IndexedDB-getAll-shim');
        };
        this.stopImmediatePropagation = function () {
            console.log('stopImmediatePropagation not implemented in IndexedDB-getAll-shim');
        };

        this.bubbles = false;
        this.cancelable = false;
        this.preventDefault = function () {
            console.log('preventDefault not implemented in IndexedDB-getAll-shim');
        };
        this.defaultPrevented = false;

        this.isTrusted = false;
        this.timestamp = Date.now();
    };

    // Based on spec draft https://w3c.github.io/IndexedDB/#dom-idbobjectstore-getall
    getAllFactory = function getAllFactory(type) {
        return function (key, count) {
            var request, result;

            key = key !== undefined ? key : null;

            request = new IDBRequest();
            result = [];

            // this is either an IDBObjectStore or an IDBIndex, depending on the context.
            var cursorRequest = this.openCursor(key);

            cursorRequest.onsuccess = function (event) {
                var cursor, e;

                cursor = event.target.result;
                if (cursor) {
                    result.push(cursor[type]);
                    if (count === undefined || result.length < count) {
                        cursor.continue();
                        return;
                    }
                }

                if (typeof request.onsuccess === "function") {
                    e = new Event("success");
                    e.target = {
                        readyState: "done",
                        result: result
                    };
                    request.result = result;
                    request.onsuccess(e);
                }
            };

            cursorRequest.onerror = function (event) {
                console.log('IndexedDB-getAll-shim error when getting data:', event.target.error);
                request.onerror(event);
            };

            return request;
        };
    };

    getAll = getAllFactory('value');
    getAllKeys = getAllFactory('key');

    if (IDBObjectStore.prototype.getAll === undefined) {
        IDBObjectStore.prototype.getAll = getAll;
    }

    if (IDBIndex.prototype.getAll === undefined) {
        IDBIndex.prototype.getAll = getAll;
    }

    if (IDBObjectStore.prototype.getAllKeys === undefined) {
        IDBObjectStore.prototype.getAllKeys = getAllKeys;
    }

    if (IDBIndex.prototype.getAllKeys === undefined) {
        IDBIndex.prototype.getAllKeys = getAllKeys;
    }
})(globalVar);

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ./components/cookie-container/style.css
var cookie_container_style = __webpack_require__("GJKC");
var cookie_container_style_default = /*#__PURE__*/__webpack_require__.n(cookie_container_style);

// CONCATENATED MODULE: ./components/common/subscribe.jsx


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// Subscribe is a higher order component that will inject some data to it's children whenever a specific event occurs
// Could be used to listen to any event, not necessarily to one that involves global app state

// You can subscribe to events by `to` prop from any obseravable passed to 'from' prop
// Data published from observable is accesible in children by `props.sub`

var subscribe_Subscribe = function (_Component) {
	_inherits(Subscribe, _Component);

	function Subscribe(props) {
		_classCallCheck(this, Subscribe);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onAppStateChange = function (subData) {
			return _this.setState({ subData: subData });
		};

		_this.state = {};
		_this.observable = props.from;
		return _this;
	}

	Subscribe.prototype.componentDidMount = function componentDidMount() {
		var event = this.props.to;

		if (event) {
			this.observable.addObserver(event, this, this.onAppStateChange);
		}
	};

	Subscribe.prototype.componentWillUnmount = function componentWillUnmount() {
		var event = this.props.to;

		if (event) {
			this.observable.removeObserver(event, this);
		}
	};

	Subscribe.prototype.render = function render(_ref, _ref2) {
		var children = _ref.children;
		var subData = _ref2.subData;

		if (children.length > 1) {
			return Object(preact_min["h"])(
				'div',
				null,
				children.map(function (child) {
					return preact_min_default.a.cloneElement(child, { sub: subData });
				})
			);
		}

		return preact_min_default.a.cloneElement(children[0], { sub: subData });
	};

	return Subscribe;
}(preact_min["Component"]);

/* harmony default export */ var subscribe = (subscribe_Subscribe);
// EXTERNAL MODULE: ../node_modules/indexeddb-getall-shim/IndexedDB-getAll-shim.js
var IndexedDB_getAll_shim = __webpack_require__("JDcw");
var IndexedDB_getAll_shim_default = /*#__PURE__*/__webpack_require__.n(IndexedDB_getAll_shim);

// EXTERNAL MODULE: ../node_modules/idb/lib/node.js
var node = __webpack_require__("C19U");
var node_default = /*#__PURE__*/__webpack_require__.n(node);

// CONCATENATED MODULE: ./services/observable/observable.js
function observable__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ObservableService is a class that implements observer pattern
// it will run callbacks registered to specific events upon calling `emitEvent`.
// Do not use it directly when dealing with global app state. Use `GameService`s methods instead.
// It could be helpful with other actions though.
var ObservableService = function () {
	function ObservableService() {
		observable__classCallCheck(this, ObservableService);

		this.observers = {};
	}

	ObservableService.prototype.addObserver = function addObserver(eventType, observer, callback) {
		this.observers[eventType] = this.observers[eventType] ? [].concat(this.observers[eventType], [{ observer: observer, callback: callback }]) : [{ observer: observer, callback: callback }];
	};

	ObservableService.prototype.removeObserver = function removeObserver(eventType, observer) {
		this.observers[eventType] = this.observers[eventType].filter(function (current) {
			return current.observer !== observer;
		});
	};

	ObservableService.prototype.emitEvent = function emitEvent(eventType, data) {
		var eventObs = this.observers[eventType];
		if (!eventObs || eventObs.length < 0) {
			return;
		}
		eventObs.forEach(function (current) {
			return current.callback(data);
		});
	};

	ObservableService.prototype.emitEvents = function emitEvents(events) {
		var _this = this;

		events.forEach(function (_ref) {
			var type = _ref.type,
			    data = _ref.data;
			return _this.emitEvent(type, data);
		});
	};

	return ObservableService;
}();


// CONCATENATED MODULE: ./services/buildings/structure.js
function structure__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Structure = function () {
	function Structure(_ref) {
		var desc = _ref.desc,
		    picture = _ref.picture,
		    baseCost = _ref.baseCost,
		    _ref$owned = _ref.owned,
		    owned = _ref$owned === undefined ? 0 : _ref$owned,
		    name = _ref.name,
		    refreshRate = _ref.refreshRate,
		    incrQuantity = _ref.incrQuantity;

		structure__classCallCheck(this, Structure);

		this.baseCost = baseCost;
		this.owned = owned;
		this.picture = picture;
		this.desc = desc;
		this.name = name;
		this.refreshRate = refreshRate ? refreshRate : 1;
		this.incrQuantity = incrQuantity;

		this.affordable = false;
		this.cookiesPerSecond = 0;
		this.price = this.getPrice(1);
	}

	Structure.prototype.getPrice = function getPrice() {
		var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

		// magic numbers and formulas acquired from:
		// http://cookieclicker.wikia.com/wiki/Buildings
		var powBase = 1.15;
		var denominator = 0.15;

		if (quantity >= 1) {
			return Math.ceil(this.baseCost * (Math.pow(powBase, quantity + this.owned) - Math.pow(powBase, this.owned)) / denominator);
		}

		throw new Error('quantity can\'t be lower than 1');
	};

	Structure.prototype.calculateCookiesPerSecond = function calculateCookiesPerSecond() {
		var cps = Math.floor(10 * (this.owned * this.refreshRate * this.incrQuantity)) / 10;
		this.cookiesPerSecond = cps;
		return cps;
	};

	Structure.prototype.checkIfAffordable = function checkIfAffordable(cookies) {
		var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var price = this.getPrice(quantity);
		this.affordable = cookies >= price;

		return [this.affordable, price];
	};

	Structure.prototype.buy = function buy(cookies) {
		var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var _checkIfAffordable = this.checkIfAffordable(cookies, quantity),
		    affordable = _checkIfAffordable[0],
		    price = _checkIfAffordable[1];

		// buy structure


		if (affordable) {
			this.owned += quantity;

			// calculate next price of structure
			this.price = this.getPrice();

			// return current price
			return price;
		}

		// structure can't be bought
		return false;
	};

	return Structure;
}();


// CONCATENATED MODULE: ./services/buildings/buildings.js
function buildings__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function buildings__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function buildings__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// buildings descriptions and stats acquired from cookie clicker wiki:
// http://cookieclicker.wikia.com/wiki/Buildings

var Cursor = function (_Structure) {
	buildings__inherits(Cursor, _Structure);

	function Cursor(owned) {
		buildings__classCallCheck(this, Cursor);

		return buildings__possibleConstructorReturn(this, _Structure.call(this, {
			owned: owned,
			baseCost: 15,
			refreshRate: 0.1,
			incrQuantity: 1,
			name: 'Cursor',
			picture: 'cursor.svg',
			desc: 'Autoclicks once every 10 seconds.'
		}));
	}

	return Cursor;
}(Structure);

var Grandma = function (_Structure2) {
	buildings__inherits(Grandma, _Structure2);

	function Grandma(owned) {
		buildings__classCallCheck(this, Grandma);

		return buildings__possibleConstructorReturn(this, _Structure2.call(this, {
			owned: owned,
			baseCost: 100,
			incrQuantity: 1,
			name: 'Grandma',
			picture: 'grandma.svg',
			desc: 'A nice grandma to bake more cookies.'
		}));
	}

	return Grandma;
}(Structure);

var Farm = function (_Structure3) {
	buildings__inherits(Farm, _Structure3);

	function Farm(owned) {
		buildings__classCallCheck(this, Farm);

		return buildings__possibleConstructorReturn(this, _Structure3.call(this, {
			owned: owned,
			baseCost: 1100,
			incrQuantity: 8,
			name: 'Farm',
			picture: 'farm.svg',
			desc: 'Grows cookie plants from cookie seeds.'
		}));
	}

	return Farm;
}(Structure);

var Mine = function (_Structure4) {
	buildings__inherits(Mine, _Structure4);

	function Mine(owned) {
		buildings__classCallCheck(this, Mine);

		return buildings__possibleConstructorReturn(this, _Structure4.call(this, {
			owned: owned,
			baseCost: 12000,
			incrQuantity: 47,
			name: 'Mine',
			picture: 'mine.svg',
			desc: 'Mines out cookie dough and chocolate chips.'
		}));
	}

	return Mine;
}(Structure);

var Factory = function (_Structure5) {
	buildings__inherits(Factory, _Structure5);

	function Factory(owned) {
		buildings__classCallCheck(this, Factory);

		return buildings__possibleConstructorReturn(this, _Structure5.call(this, {
			owned: owned,
			baseCost: 130000,
			incrQuantity: 260,
			name: 'Factory',
			picture: 'factory.svg',
			desc: 'Produces large quantities of cookies.'
		}));
	}

	return Factory;
}(Structure);

/* harmony default export */ var buildings = ({ Cursor: Cursor, Grandma: Grandma, Farm: Farm, Mine: Mine, Factory: Factory });
// CONCATENATED MODULE: ./services/game/util.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var util_getInitialState = function getInitialState() {
	var Structures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : buildings;
	return {
		name: 'Bakery',
		cookiesQuantity: 0,
		cookiesDisplay: 0,
		cookiesPerClick: 1,
		buildings: Object.keys(Structures).map(function (key) {
			return new Structures[key]();
		})
	};
};

var util_transformDbState = function transformDbState(state) {
	var Structures = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : buildings;
	return _extends({}, state, { buildings: state.buildings.map(function (dbBuilding) {
			var CurrentStructure = Structures[dbBuilding.name];
			if (CurrentStructure) {
				return _extends(new CurrentStructure(), dbBuilding);
			}
		}) });
};
// CONCATENATED MODULE: ./services/observable/events.js
// events that could be observed

// get whole app state
var APP_STATE_CHANGED = 'app_state_changed';
// CONCATENATED MODULE: ./services/game/game.js
function game__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




// GameService encapsulates game logic and serves as data store for whole app
// By using it's methods you are changing global state
// which is then automatically injected into `sub` prop
// to all components that are inside SubscribeToState HOC

var game_GameService = function () {
	function GameService(_ref) {
		var observable = _ref.observable,
		    state = _ref.state,
		    stateService = _ref.stateService,
		    dbService = _ref.dbService,
		    saveInterval = _ref.saveInterval;

		game__classCallCheck(this, GameService);

		// dependencies
		this.observable = observable;
		this.state = state;
		this.dbService = dbService;

		// init
		this.calculateCookiesPerSecond();
		this.startGame();
		this.autoSave(saveInterval);
	}

	// save state to the Db on regular basis


	GameService.prototype.autoSave = function autoSave(seconds) {
		var _this = this;

		setInterval(function () {
			return _this.dbService.write('state', _this.state);
		}, seconds * 1000);
	};

	// resetGame removes all saved data from db store and restores initial values


	GameService.prototype.resetGame = function resetGame() {
		this.dbService.clear('state');
		this.state = util_getInitialState();
		this.calculateCookiesPerSecond();
	};

	// get cookies per second from every currently owned building and calculate global CpS.


	GameService.prototype.calculateCookiesPerSecond = function calculateCookiesPerSecond() {
		this.state.cookiesPerSecond = this.state.buildings.map(function (building) {
			return building.calculateCookiesPerSecond();
		}).reduce(function (acc, curr) {
			return acc + curr;
		});
	};

	// start game loop


	GameService.prototype.startGame = function startGame() {
		var _this2 = this;

		// `requestAnimationFrame` will stop it's execution after tab is blurred
		// but thanks to `delta` the right amount of cookies will be calculated
		// according to seconds passed since last frame
		var timestamp = function timestamp() {
			return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
		};
		var now = void 0;
		var delta = void 0;
		var last = timestamp();

		var frame = function frame() {
			now = timestamp();
			delta = (now - last) / 1000;
			_this2.update(delta);
			_this2.render();
			last = now;

			requestAnimationFrame(frame);
		};

		// start loop
		requestAnimationFrame(frame);
	};

	// game logic
	// runs on every frame and on a request


	GameService.prototype.update = function update() {
		var _this3 = this;

		var secondsPassed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		// if seconds are passed in then add cookies for passed second
		if (secondsPassed) {
			this.state.cookiesQuantity += this.state.cookiesPerSecond * secondsPassed;
		}

		// show whole cookies
		this.state.cookiesDisplay = Math.floor(this.state.cookiesQuantity);

		// get current price of buildings
		// use whole cookies for calculcation to make it more sane for user
		this.state.buildings.forEach(function (building) {
			return building.checkIfAffordable(_this3.state.cookiesDisplay);
		});
	};

	// emit events that will instruct Preact to re-render DOM


	GameService.prototype.render = function render() {
		// inject new state into 'sub' prop of SubscribeToState's HOC children
		this.observable.emitEvent(APP_STATE_CHANGED, this.state);
	};

	// if building is affordable then buy it, recalculate CpS and request update


	GameService.prototype.buyBuilding = function buyBuilding(name) {
		var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var building = this.state.buildings.find(function (building) {
			return building.name === name;
		});
		var price = building.buy(this.state.cookiesQuantity, quantity);

		if (price) {
			this.state.cookiesQuantity = Math.ceil(10 * (this.state.cookiesQuantity - price)) / 10;
			this.calculateCookiesPerSecond();
			this.requestRefresh();
		}
	};

	// click on a cookie


	GameService.prototype.click = function click() {
		var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.cookiesPerClick;

		this.state.cookiesQuantity += num;
		this.requestRefresh();
	};

	GameService.prototype.requestRefresh = function requestRefresh() {
		this.update();
		this.render();
	};

	return GameService;
}();


// CONCATENATED MODULE: ./services/database/db.js
function db__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DbService takes care of DB operations on state
var DbService = function () {
	function DbService(_ref) {
		var driver = _ref.driver,
		    name = _ref.name,
		    stores = _ref.stores,
		    version = _ref.version;

		db__classCallCheck(this, DbService);

		this.driver = driver;

		if ('indexedDB' in window || "production") {
			this.dbPromise = this.createDatabase(name, stores, version = 1);
		} else {
			//eslint-disable-next-line
			window.alert('To save your cookies you need to use newer browser!');
		}
	}

	DbService.prototype.createDatabase = function createDatabase(name, stores) {
		var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

		return this.driver.open(name, version, function (db) {
			stores.forEach(function (_ref2) {
				var store = _ref2.store,
				    key = _ref2.key;

				!db.objectStoreNames.contains(store) && db.createObjectStore(store, { keyPath: key });
			});
		});
	};

	DbService.prototype.write = function write(store, data) {
		return this.dbPromise.then(function (db) {
			var transaction = db.transaction(store, 'readwrite').objectStore(store).put(data);

			return transaction.complete;
		});
	};

	DbService.prototype.readAll = function readAll(store) {
		return this.dbPromise.then(function (db) {
			return db.transaction(store, 'readonly').objectStore(store).getAll();
		});
	};

	DbService.prototype.clear = function clear(store) {
		return this.dbPromise.then(function (db) {
			var transaction = db.transaction(store, 'readwrite').objectStore(store).clear();

			return transaction.complete;
		});
	};

	return DbService;
}();


// CONCATENATED MODULE: ./services/index.js








var app = void 0;
var observable = void 0;

// run only in browser
if (typeof window !== 'undefined') {
	// inject dependencies and initialize the app

	observable = new ObservableService();

	var dbService = new DbService({
		driver: node_default.a,
		name: 'cookie-clicker-db',
		stores: [{ store: 'state', key: 'name' }]
	});

	dbService.readAll('state').then(function (state) {
		app = new game_GameService({
			observable: observable,
			dbService: dbService,
			saveInterval: 2,
			state: !state || state.length <= 0 ? util_getInitialState() : util_transformDbState(state[0])
		});
	});
}
// CONCATENATED MODULE: ./components/common/subscribe-to.jsx






// SubscribeToState is a higher order component that injects global app state into props of it's children
// It is triggered by APP_STATE_CHANGED event
var subscribe_to_SubscribeToState = function SubscribeToState(_ref) {
	var children = _ref.children;
	return Object(preact_min["h"])(
		subscribe,
		{ to: APP_STATE_CHANGED, from: observable },
		children
	);
};
// EXTERNAL MODULE: ./components/cookie-container/stats/style.css
var stats_style = __webpack_require__("6Bxh");
var stats_style_default = /*#__PURE__*/__webpack_require__.n(stats_style);

// EXTERNAL MODULE: ./assets/images/github.svg
var github = __webpack_require__("rDYn");
var github_default = /*#__PURE__*/__webpack_require__.n(github);

// EXTERNAL MODULE: ./assets/images/trash.svg
var trash = __webpack_require__("dV/7");
var trash_default = /*#__PURE__*/__webpack_require__.n(trash);

// CONCATENATED MODULE: ./components/cookie-container/stats/index.jsx


function stats__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }









var stats__ref2 = Object(preact_min["h"])('img', { 'aria-hidden': 'true', src: github_default.a, alt: '' });

var _ref3 = Object(preact_min["h"])('img', { 'aria-hidden': 'true', src: trash_default.a });

var stats_Stats = function () {
	function Stats() {
		var _this = this;

		stats__classCallCheck(this, Stats);

		this.resetHandler = function () {
			return _this.props.app ? _this.props.app.resetGame() : app.resetGame();
		};
	}

	Stats.prototype.render = function render(_ref) {
		var sub = _ref.sub;

		return Object(preact_min["h"])(
			'header',
			{ 'class': stats_style_default.a.stats },
			Object(preact_min["h"])(
				'h1',
				null,
				sub && sub.name
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': stats_style_default.a.cps },
				'cookies baked so far:'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': stats_style_default.a.quantity },
				sub && sub.cookiesDisplay
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': stats_style_default.a.cps },
				'per second: ',
				sub && sub.cookiesPerSecond
			),
			Object(preact_min["h"])(
				'a',
				{
					'class': stats_style_default.a.github,
					title: 'Checkout my github!',
					'aria-label': 'Checkout my github!',
					target: '_blank',
					rel: 'noopener noreferrer',
					href: 'https://github.com/Pesiok/cookie-clicker'
				},
				stats__ref2
			),
			Object(preact_min["h"])(
				'button',
				{
					'class': stats_style_default.a.trash,
					title: 'Throw away all cookies and recipes',
					'aria-label': 'Throw away all cookies and recipes!',
					onClick: this.resetHandler
				},
				_ref3
			)
		);
	};

	return Stats;
}();


// EXTERNAL MODULE: ./components/cookie-container/cookie/style.css
var cookie_style = __webpack_require__("x9nH");
var cookie_style_default = /*#__PURE__*/__webpack_require__.n(cookie_style);

// EXTERNAL MODULE: ./assets/images/cookie.svg
var cookie = __webpack_require__("osaz");
var cookie_default = /*#__PURE__*/__webpack_require__.n(cookie);

// CONCATENATED MODULE: ./components/cookie-container/cookie/index.jsx


function cookie__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var cookie__ref = Object(preact_min["h"])('img', { src: cookie_default.a, alt: 'cookie' });

var cookie_Cookie = function () {
	function Cookie() {
		var _this = this;

		cookie__classCallCheck(this, Cookie);

		this.clickHandler = function () {
			return _this.props.app ? _this.props.app.click() : app.click();
		};
	}

	Cookie.prototype.render = function render() {
		return Object(preact_min["h"])(
			'button',
			{ 'class': cookie_style_default.a.cookie, onClick: this.clickHandler, 'aria-label': 'get cookie' },
			cookie__ref
		);
	};

	return Cookie;
}();


// CONCATENATED MODULE: ./components/cookie-container/index.jsx








var cookie_container__ref = Object(preact_min["h"])(
	subscribe_to_SubscribeToState,
	null,
	Object(preact_min["h"])(stats_Stats, null)
);

var cookie_container__ref2 = Object(preact_min["h"])(cookie_Cookie, null);

var cookie_container_CookieContainer = function CookieContainer() {
	return Object(preact_min["h"])(
		'div',
		{ 'class': cookie_container_style_default.a.cookieContainer },
		cookie_container__ref,
		Object(preact_min["h"])(
			'div',
			{ 'class': cookie_container_style_default.a.cookieWrapper },
			cookie_container__ref2
		)
	);
};

/* harmony default export */ var cookie_container = (cookie_container_CookieContainer);
// EXTERNAL MODULE: ./components/store-container/store/style.css
var store_style = __webpack_require__("WAls");
var store_style_default = /*#__PURE__*/__webpack_require__.n(store_style);

// EXTERNAL MODULE: ./components/store-container/store-item/style.css
var store_item_style = __webpack_require__("zRiD");
var store_item_style_default = /*#__PURE__*/__webpack_require__.n(store_item_style);

// CONCATENATED MODULE: ./components/store-container/store-item/index.jsx


function store_item__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var store_item_StoreItem = function () {
	function StoreItem() {
		var _this = this;

		store_item__classCallCheck(this, StoreItem);

		this.buy = function () {
			var _props = _this.props,
			    propApp = _props.app,
			    name = _props.name;

			propApp ? propApp.buyBuilding(name, 1) : app.buyBuilding(name, 1);
		};
	}

	StoreItem.prototype.render = function render(props) {
		return Object(preact_min["h"])(
			'li',
			{
				'class': store_item_style_default.a.storeListItem + ' ' + (props.affordable ? store_item_style_default.a.storeListItemActive : store_item_style_default.a.storeListItemBlocked),
				onClick: this.buy,
				key: props.name,
				role: 'button',
				tabIndex: '0'
			},
			Object(preact_min["h"])('span', { 'class': store_item_style_default.a.foldedCorner, 'aria-hidden': 'true' }),
			Object(preact_min["h"])(
				'h3',
				null,
				props.name
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': store_item_style_default.a.storeListItemInfo },
				Object(preact_min["h"])('img', { 'class': store_item_style_default.a.icon, src: __webpack_require__("t0pj")("./" + props.picture), alt: props.name }),
				Object(preact_min["h"])(
					'span',
					null,
					'Owned: ',
					Object(preact_min["h"])(
						'b',
						null,
						props.owned
					)
				),
				Object(preact_min["h"])(
					'span',
					null,
					'Price: ',
					Object(preact_min["h"])(
						'b',
						null,
						props.price,
						' c'
					)
				),
				Object(preact_min["h"])(
					'span',
					null,
					'Production: ',
					Object(preact_min["h"])(
						'b',
						null,
						props.incrQuantity * props.refreshRate,
						' c/s'
					)
				),
				Object(preact_min["h"])(
					'span',
					null,
					'Total production: ',
					Object(preact_min["h"])(
						'b',
						null,
						props.cookiesPerSecond,
						' c/s'
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': store_item_style_default.a.storeListItemDesc },
				props.desc
			)
		);
	};

	return StoreItem;
}();


// CONCATENATED MODULE: ./components/store-container/store/index.jsx






var store_Store = function Store(_ref) {
	var sub = _ref.sub;
	return Object(preact_min["h"])(
		'div',
		{ 'class': store_style_default.a.store },
		Object(preact_min["h"])(
			'h2',
			{ 'class': store_style_default.a.storeRibbon },
			'Recipes for more cookies'
		),
		Object(preact_min["h"])(
			'ul',
			{ 'class': store_style_default.a.storeList },
			sub && sub.buildings.map(function (building) {
				return Object(preact_min["h"])(store_item_StoreItem, building);
			})
		)
	);
};

/* harmony default export */ var store = (store_Store);
// CONCATENATED MODULE: ./components/store-container/index.jsx






var store_container__ref = Object(preact_min["h"])(
	subscribe_to_SubscribeToState,
	null,
	Object(preact_min["h"])(store, null)
);

var StoreContainer = function StoreContainer() {
	return store_container__ref;
};

/* harmony default export */ var store_container = (StoreContainer);
// CONCATENATED MODULE: ./components/app.jsx



// components



var app__ref = Object(preact_min["h"])(
	'div',
	{ id: 'app' },
	Object(preact_min["h"])(cookie_container, null),
	Object(preact_min["h"])(store_container, null)
);

var App = function App() {
	return app__ref;
};

/* harmony default export */ var components_app = (App);
// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (components_app);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "La2c":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "baffd8e5debad62df4b0a4560b2773d3.svg";

/***/ }),

/***/ "PUFR":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "85b1777ba767a88605d9cfd9acda8455.svg";

/***/ }),

/***/ "Rts4":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e20a4d9b92a07d26d50a01a5c3ba0430.svg";

/***/ }),

/***/ "WAls":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"store":"store__2WXUr","storeRibbon":"storeRibbon__2aXUM","storeList":"storeList__3u1kc"};

/***/ }),

/***/ "dV/7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "248d43dda2e2f708230f9b1c8eb6d659.svg";

/***/ }),

/***/ "enoJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function (resolve, reject) {
      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function (resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function (value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function (prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function get() {
          return this[targetProp][prop];
        },
        set: function set(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function (prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function () {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function (prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function () {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function (prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function () {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', ['name', 'keyPath', 'multiEntry', 'unique']);

  proxyRequestMethods(Index, '_index', IDBIndex, ['get', 'getKey', 'getAll', 'getAllKeys', 'count']);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, ['openCursor', 'openKeyCursor']);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', ['direction', 'key', 'primaryKey', 'value']);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, ['update', 'delete']);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function (methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function () {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function () {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function (value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function () {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function () {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', ['name', 'keyPath', 'indexNames', 'autoIncrement']);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, ['put', 'add', 'delete', 'clear', 'get', 'getAll', 'getKey', 'getAllKeys', 'count']);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, ['openCursor', 'openKeyCursor']);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, ['deleteIndex']);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function (resolve, reject) {
      idbTransaction.oncomplete = function () {
        resolve();
      };
      idbTransaction.onerror = function () {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function () {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function () {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', ['objectStoreNames', 'mode']);

  proxyMethods(Transaction, '_tx', IDBTransaction, ['abort']);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function () {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', ['name', 'version', 'objectStoreNames']);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, ['deleteObjectStore', 'close']);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function () {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', ['name', 'version', 'objectStoreNames']);

  proxyMethods(DB, '_db', IDBDatabase, ['close']);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function (funcName) {
    [ObjectStore, Index].forEach(function (Constructor) {
      Constructor.prototype[funcName.replace('open', 'iterate')] = function () {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function () {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function (Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function (query, count) {
      var instance = this;
      var items = [];

      return new Promise(function (resolve) {
        instance.iterateCursor(query, function (cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function open(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      request.onupgradeneeded = function (event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };

      return p.then(function (db) {
        return new DB(db);
      });
    },
    delete: function _delete(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  } else {
    self.idb = exp;
  }
})();

/***/ }),

/***/ "l6RX":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "55121e8287c1d4e86ea8109851a1e5d8.svg";

/***/ }),

/***/ "oN5R":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "577f6bd6aeca6b201145f111de7ab28b.svg";

/***/ }),

/***/ "osaz":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aa073a0fc198609c3d41a4991b6f127b.svg";

/***/ }),

/***/ "rDYn":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b70dd1fd28e8741745a24cbe43f85078.svg";

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "t0pj":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cursor.svg": "oN5R",
	"./factory.svg": "La2c",
	"./farm.svg": "l6RX",
	"./grandma.svg": "Rts4",
	"./mine.svg": "PUFR"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "t0pj";

/***/ }),

/***/ "x9nH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"cookie":"cookie__2JblY"};

/***/ }),

/***/ "zRiD":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"storeListItem":"storeListItem__3pGHY","foldedCorner":"foldedCorner__bt0bX","storeListItemBlocked":"storeListItemBlocked__1ALoQ","storeListItemActive":"storeListItemActive__2ksJa","storeListItemInfo":"storeListItemInfo__AqmTv","storeListItemDesc":"storeListItemDesc__1Ios-","icon":"icon__2rZGi"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map