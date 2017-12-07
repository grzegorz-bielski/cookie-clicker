// DISCLAIMER START
// this file wasn't written by me
// it's a part of soon to be merged (probably) default template for preact-cli with Jest and preact-render-spy integration
// made by @fokusferit - https://github.com/fokusferit/default
// DISCLAIMER END

// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
/**
 * An example how to mock localStorage is given below 👇
 */

/*
// Mocks localStorage
const localStorageMock = (function() {
	let store = {};

	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => store[key] = value.toString(),
		clear: () => store = {}
	};

})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
}); */
