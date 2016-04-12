/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "aa0761db952105b2de9b"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(Object.defineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(Object.defineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	__webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "unit-test.html";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {module.exports = __webpack_require__(3);
	module.exports.boot = __webpack_require__(4);
	
	var path = __webpack_require__(6),
	    fs = __webpack_require__(8);
	
	var rootPath = path.join(__dirname, "jasmine-core"),
	    bootFiles = ['boot.js'],
	    nodeBootFiles = ['node_boot.js'],
	    cssFiles = [],
	    jsFiles = [],
	    jsFilesToSkip = ['jasmine.js'].concat(bootFiles, nodeBootFiles);
	
	fs.readdirSync(rootPath).forEach(function(file) {
	  if(fs.statSync(path.join(rootPath, file)).isFile()) {
	    switch(path.extname(file)) {
	      case '.css':
	        cssFiles.push(file);
	      break;
	      case '.js':
	        if (jsFilesToSkip.indexOf(file) < 0) {
	        jsFiles.push(file);
	      }
	      break;
	    }
	  }
	});
	
	module.exports.files = {
	  path: rootPath,
	  bootDir: rootPath,
	  bootFiles: bootFiles,
	  nodeBootFiles: nodeBootFiles,
	  cssFiles: cssFiles,
	  jsFiles: ['jasmine.js'].concat(jsFiles),
	  imagesDir: path.join(__dirname, '../images')
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	Copyright (c) 2008-2015 Pivotal Labs
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	var getJasmineRequireObj = (function (jasmineGlobal) {
	  var jasmineRequire;
	
	  if (typeof module !== 'undefined' && module.exports) {
	    if (typeof global !== 'undefined') {
	      jasmineGlobal = global;
	    } else {
	      jasmineGlobal = {};
	    }
	    jasmineRequire = exports;
	  } else {
	    if (typeof window !== 'undefined' && typeof window.toString === 'function' && window.toString() === '[object GjsGlobal]') {
	      jasmineGlobal = window;
	    }
	    jasmineRequire = jasmineGlobal.jasmineRequire = jasmineGlobal.jasmineRequire || {};
	  }
	
	  function getJasmineRequire() {
	    return jasmineRequire;
	  }
	
	  getJasmineRequire().core = function(jRequire) {
	    var j$ = {};
	
	    jRequire.base(j$, jasmineGlobal);
	    j$.util = jRequire.util();
	    j$.errors = jRequire.errors();
	    j$.Any = jRequire.Any(j$);
	    j$.Anything = jRequire.Anything(j$);
	    j$.CallTracker = jRequire.CallTracker();
	    j$.MockDate = jRequire.MockDate();
	    j$.Clock = jRequire.Clock();
	    j$.DelayedFunctionScheduler = jRequire.DelayedFunctionScheduler();
	    j$.Env = jRequire.Env(j$);
	    j$.ExceptionFormatter = jRequire.ExceptionFormatter();
	    j$.Expectation = jRequire.Expectation();
	    j$.buildExpectationResult = jRequire.buildExpectationResult();
	    j$.JsApiReporter = jRequire.JsApiReporter();
	    j$.matchersUtil = jRequire.matchersUtil(j$);
	    j$.ObjectContaining = jRequire.ObjectContaining(j$);
	    j$.ArrayContaining = jRequire.ArrayContaining(j$);
	    j$.pp = jRequire.pp(j$);
	    j$.QueueRunner = jRequire.QueueRunner(j$);
	    j$.ReportDispatcher = jRequire.ReportDispatcher();
	    j$.Spec = jRequire.Spec(j$);
	    j$.SpyRegistry = jRequire.SpyRegistry(j$);
	    j$.SpyStrategy = jRequire.SpyStrategy();
	    j$.StringMatching = jRequire.StringMatching(j$);
	    j$.Suite = jRequire.Suite(j$);
	    j$.Timer = jRequire.Timer();
	    j$.TreeProcessor = jRequire.TreeProcessor();
	    j$.version = jRequire.version();
	    j$.Order = jRequire.Order();
	
	    j$.matchers = jRequire.requireMatchers(jRequire, j$);
	
	    return j$;
	  };
	
	  return getJasmineRequire;
	})(this);
	
	getJasmineRequireObj().requireMatchers = function(jRequire, j$) {
	  var availableMatchers = [
	      'toBe',
	      'toBeCloseTo',
	      'toBeDefined',
	      'toBeFalsy',
	      'toBeGreaterThan',
	      'toBeLessThan',
	      'toBeNaN',
	      'toBeNull',
	      'toBeTruthy',
	      'toBeUndefined',
	      'toContain',
	      'toEqual',
	      'toHaveBeenCalled',
	      'toHaveBeenCalledWith',
	      'toHaveBeenCalledTimes',
	      'toMatch',
	      'toThrow',
	      'toThrowError'
	    ],
	    matchers = {};
	
	  for (var i = 0; i < availableMatchers.length; i++) {
	    var name = availableMatchers[i];
	    matchers[name] = jRequire[name](j$);
	  }
	
	  return matchers;
	};
	
	getJasmineRequireObj().base = function(j$, jasmineGlobal) {
	  j$.unimplementedMethod_ = function() {
	    throw new Error('unimplemented method');
	  };
	
	  j$.MAX_PRETTY_PRINT_DEPTH = 40;
	  j$.MAX_PRETTY_PRINT_ARRAY_LENGTH = 100;
	  j$.DEFAULT_TIMEOUT_INTERVAL = 5000;
	
	  j$.getGlobal = function() {
	    return jasmineGlobal;
	  };
	
	  j$.getEnv = function(options) {
	    var env = j$.currentEnv_ = j$.currentEnv_ || new j$.Env(options);
	    //jasmine. singletons in here (setTimeout blah blah).
	    return env;
	  };
	
	  j$.isArray_ = function(value) {
	    return j$.isA_('Array', value);
	  };
	
	  j$.isString_ = function(value) {
	    return j$.isA_('String', value);
	  };
	
	  j$.isNumber_ = function(value) {
	    return j$.isA_('Number', value);
	  };
	
	  j$.isA_ = function(typeName, value) {
	    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
	  };
	
	  j$.isDomNode = function(obj) {
	    return obj.nodeType > 0;
	  };
	
	  j$.fnNameFor = function(func) {
	    return func.name || func.toString().match(/^\s*function\s*(\w*)\s*\(/)[1];
	  };
	
	  j$.any = function(clazz) {
	    return new j$.Any(clazz);
	  };
	
	  j$.anything = function() {
	    return new j$.Anything();
	  };
	
	  j$.objectContaining = function(sample) {
	    return new j$.ObjectContaining(sample);
	  };
	
	  j$.stringMatching = function(expected) {
	    return new j$.StringMatching(expected);
	  };
	
	  j$.arrayContaining = function(sample) {
	    return new j$.ArrayContaining(sample);
	  };
	
	  j$.createSpy = function(name, originalFn) {
	
	    var spyStrategy = new j$.SpyStrategy({
	        name: name,
	        fn: originalFn,
	        getSpy: function() { return spy; }
	      }),
	      callTracker = new j$.CallTracker(),
	      spy = function() {
	        var callData = {
	          object: this,
	          args: Array.prototype.slice.apply(arguments)
	        };
	
	        callTracker.track(callData);
	        var returnValue = spyStrategy.exec.apply(this, arguments);
	        callData.returnValue = returnValue;
	
	        return returnValue;
	      };
	
	    for (var prop in originalFn) {
	      if (prop === 'and' || prop === 'calls') {
	        throw new Error('Jasmine spies would overwrite the \'and\' and \'calls\' properties on the object being spied upon');
	      }
	
	      spy[prop] = originalFn[prop];
	    }
	
	    spy.and = spyStrategy;
	    spy.calls = callTracker;
	
	    return spy;
	  };
	
	  j$.isSpy = function(putativeSpy) {
	    if (!putativeSpy) {
	      return false;
	    }
	    return putativeSpy.and instanceof j$.SpyStrategy &&
	      putativeSpy.calls instanceof j$.CallTracker;
	  };
	
	  j$.createSpyObj = function(baseName, methodNames) {
	    if (j$.isArray_(baseName) && j$.util.isUndefined(methodNames)) {
	      methodNames = baseName;
	      baseName = 'unknown';
	    }
	
	    if (!j$.isArray_(methodNames) || methodNames.length === 0) {
	      throw 'createSpyObj requires a non-empty array of method names to create spies for';
	    }
	    var obj = {};
	    for (var i = 0; i < methodNames.length; i++) {
	      obj[methodNames[i]] = j$.createSpy(baseName + '.' + methodNames[i]);
	    }
	    return obj;
	  };
	};
	
	getJasmineRequireObj().util = function() {
	
	  var util = {};
	
	  util.inherit = function(childClass, parentClass) {
	    var Subclass = function() {
	    };
	    Subclass.prototype = parentClass.prototype;
	    childClass.prototype = new Subclass();
	  };
	
	  util.htmlEscape = function(str) {
	    if (!str) {
	      return str;
	    }
	    return str.replace(/&/g, '&amp;')
	      .replace(/</g, '&lt;')
	      .replace(/>/g, '&gt;');
	  };
	
	  util.argsToArray = function(args) {
	    var arrayOfArgs = [];
	    for (var i = 0; i < args.length; i++) {
	      arrayOfArgs.push(args[i]);
	    }
	    return arrayOfArgs;
	  };
	
	  util.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  util.arrayContains = function(array, search) {
	    var i = array.length;
	    while (i--) {
	      if (array[i] === search) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  util.clone = function(obj) {
	    if (Object.prototype.toString.apply(obj) === '[object Array]') {
	      return obj.slice();
	    }
	
	    var cloned = {};
	    for (var prop in obj) {
	      if (obj.hasOwnProperty(prop)) {
	        cloned[prop] = obj[prop];
	      }
	    }
	
	    return cloned;
	  };
	
	  return util;
	};
	
	getJasmineRequireObj().Spec = function(j$) {
	  function Spec(attrs) {
	    this.expectationFactory = attrs.expectationFactory;
	    this.resultCallback = attrs.resultCallback || function() {};
	    this.id = attrs.id;
	    this.description = attrs.description || '';
	    this.queueableFn = attrs.queueableFn;
	    this.beforeAndAfterFns = attrs.beforeAndAfterFns || function() { return {befores: [], afters: []}; };
	    this.userContext = attrs.userContext || function() { return {}; };
	    this.onStart = attrs.onStart || function() {};
	    this.getSpecName = attrs.getSpecName || function() { return ''; };
	    this.expectationResultFactory = attrs.expectationResultFactory || function() { };
	    this.queueRunnerFactory = attrs.queueRunnerFactory || function() {};
	    this.catchingExceptions = attrs.catchingExceptions || function() { return true; };
	    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;
	
	    if (!this.queueableFn.fn) {
	      this.pend();
	    }
	
	    this.result = {
	      id: this.id,
	      description: this.description,
	      fullName: this.getFullName(),
	      failedExpectations: [],
	      passedExpectations: [],
	      pendingReason: ''
	    };
	  }
	
	  Spec.prototype.addExpectationResult = function(passed, data, isError) {
	    var expectationResult = this.expectationResultFactory(data);
	    if (passed) {
	      this.result.passedExpectations.push(expectationResult);
	    } else {
	      this.result.failedExpectations.push(expectationResult);
	
	      if (this.throwOnExpectationFailure && !isError) {
	        throw new j$.errors.ExpectationFailed();
	      }
	    }
	  };
	
	  Spec.prototype.expect = function(actual) {
	    return this.expectationFactory(actual, this);
	  };
	
	  Spec.prototype.execute = function(onComplete, enabled) {
	    var self = this;
	
	    this.onStart(this);
	
	    if (!this.isExecutable() || this.markedPending || enabled === false) {
	      complete(enabled);
	      return;
	    }
	
	    var fns = this.beforeAndAfterFns();
	    var allFns = fns.befores.concat(this.queueableFn).concat(fns.afters);
	
	    this.queueRunnerFactory({
	      queueableFns: allFns,
	      onException: function() { self.onException.apply(self, arguments); },
	      onComplete: complete,
	      userContext: this.userContext()
	    });
	
	    function complete(enabledAgain) {
	      self.result.status = self.status(enabledAgain);
	      self.resultCallback(self.result);
	
	      if (onComplete) {
	        onComplete();
	      }
	    }
	  };
	
	  Spec.prototype.onException = function onException(e) {
	    if (Spec.isPendingSpecException(e)) {
	      this.pend(extractCustomPendingMessage(e));
	      return;
	    }
	
	    if (e instanceof j$.errors.ExpectationFailed) {
	      return;
	    }
	
	    this.addExpectationResult(false, {
	      matcherName: '',
	      passed: false,
	      expected: '',
	      actual: '',
	      error: e
	    }, true);
	  };
	
	  Spec.prototype.disable = function() {
	    this.disabled = true;
	  };
	
	  Spec.prototype.pend = function(message) {
	    this.markedPending = true;
	    if (message) {
	      this.result.pendingReason = message;
	    }
	  };
	
	  Spec.prototype.getResult = function() {
	    this.result.status = this.status();
	    return this.result;
	  };
	
	  Spec.prototype.status = function(enabled) {
	    if (this.disabled || enabled === false) {
	      return 'disabled';
	    }
	
	    if (this.markedPending) {
	      return 'pending';
	    }
	
	    if (this.result.failedExpectations.length > 0) {
	      return 'failed';
	    } else {
	      return 'passed';
	    }
	  };
	
	  Spec.prototype.isExecutable = function() {
	    return !this.disabled;
	  };
	
	  Spec.prototype.getFullName = function() {
	    return this.getSpecName(this);
	  };
	
	  var extractCustomPendingMessage = function(e) {
	    var fullMessage = e.toString(),
	        boilerplateStart = fullMessage.indexOf(Spec.pendingSpecExceptionMessage),
	        boilerplateEnd = boilerplateStart + Spec.pendingSpecExceptionMessage.length;
	
	    return fullMessage.substr(boilerplateEnd);
	  };
	
	  Spec.pendingSpecExceptionMessage = '=> marked Pending';
	
	  Spec.isPendingSpecException = function(e) {
	    return !!(e && e.toString && e.toString().indexOf(Spec.pendingSpecExceptionMessage) !== -1);
	  };
	
	  return Spec;
	};
	
	if (typeof window == void 0 && typeof exports == 'object') {
	  exports.Spec = jasmineRequire.Spec;
	}
	
	/*jshint bitwise: false*/
	
	getJasmineRequireObj().Order = function() {
	  function Order(options) {
	    this.random = 'random' in options ? options.random : true;
	    var seed = this.seed = options.seed || generateSeed();
	    this.sort = this.random ? randomOrder : naturalOrder;
	
	    function naturalOrder(items) {
	      return items;
	    }
	
	    function randomOrder(items) {
	      var copy = items.slice();
	      copy.sort(function(a, b) {
	        return jenkinsHash(seed + a.id) - jenkinsHash(seed + b.id);
	      });
	      return copy;
	    }
	
	    function generateSeed() {
	      return String(Math.random()).slice(-5);
	    }
	
	    // Bob Jenkins One-at-a-Time Hash algorithm is a non-cryptographic hash function
	    // used to get a different output when the key changes slighly.
	    // We use your return to sort the children randomly in a consistent way when
	    // used in conjunction with a seed
	
	    function jenkinsHash(key) {
	      var hash, i;
	      for(hash = i = 0; i < key.length; ++i) {
	        hash += key.charCodeAt(i);
	        hash += (hash << 10);
	        hash ^= (hash >> 6);
	      }
	      hash += (hash << 3);
	      hash ^= (hash >> 11);
	      hash += (hash << 15);
	      return hash;
	    }
	
	  }
	
	  return Order;
	};
	
	getJasmineRequireObj().Env = function(j$) {
	  function Env(options) {
	    options = options || {};
	
	    var self = this;
	    var global = options.global || j$.getGlobal();
	
	    var totalSpecsDefined = 0;
	
	    var catchExceptions = true;
	
	    var realSetTimeout = j$.getGlobal().setTimeout;
	    var realClearTimeout = j$.getGlobal().clearTimeout;
	    this.clock = new j$.Clock(global, function () { return new j$.DelayedFunctionScheduler(); }, new j$.MockDate(global));
	
	    var runnableLookupTable = {};
	    var runnableResources = {};
	
	    var currentSpec = null;
	    var currentlyExecutingSuites = [];
	    var currentDeclarationSuite = null;
	    var throwOnExpectationFailure = false;
	    var random = false;
	    var seed = null;
	
	    var currentSuite = function() {
	      return currentlyExecutingSuites[currentlyExecutingSuites.length - 1];
	    };
	
	    var currentRunnable = function() {
	      return currentSpec || currentSuite();
	    };
	
	    var reporter = new j$.ReportDispatcher([
	      'jasmineStarted',
	      'jasmineDone',
	      'suiteStarted',
	      'suiteDone',
	      'specStarted',
	      'specDone'
	    ]);
	
	    this.specFilter = function() {
	      return true;
	    };
	
	    this.addCustomEqualityTester = function(tester) {
	      if(!currentRunnable()) {
	        throw new Error('Custom Equalities must be added in a before function or a spec');
	      }
	      runnableResources[currentRunnable().id].customEqualityTesters.push(tester);
	    };
	
	    this.addMatchers = function(matchersToAdd) {
	      if(!currentRunnable()) {
	        throw new Error('Matchers must be added in a before function or a spec');
	      }
	      var customMatchers = runnableResources[currentRunnable().id].customMatchers;
	      for (var matcherName in matchersToAdd) {
	        customMatchers[matcherName] = matchersToAdd[matcherName];
	      }
	    };
	
	    j$.Expectation.addCoreMatchers(j$.matchers);
	
	    var nextSpecId = 0;
	    var getNextSpecId = function() {
	      return 'spec' + nextSpecId++;
	    };
	
	    var nextSuiteId = 0;
	    var getNextSuiteId = function() {
	      return 'suite' + nextSuiteId++;
	    };
	
	    var expectationFactory = function(actual, spec) {
	      return j$.Expectation.Factory({
	        util: j$.matchersUtil,
	        customEqualityTesters: runnableResources[spec.id].customEqualityTesters,
	        customMatchers: runnableResources[spec.id].customMatchers,
	        actual: actual,
	        addExpectationResult: addExpectationResult
	      });
	
	      function addExpectationResult(passed, result) {
	        return spec.addExpectationResult(passed, result);
	      }
	    };
	
	    var defaultResourcesForRunnable = function(id, parentRunnableId) {
	      var resources = {spies: [], customEqualityTesters: [], customMatchers: {}};
	
	      if(runnableResources[parentRunnableId]){
	        resources.customEqualityTesters = j$.util.clone(runnableResources[parentRunnableId].customEqualityTesters);
	        resources.customMatchers = j$.util.clone(runnableResources[parentRunnableId].customMatchers);
	      }
	
	      runnableResources[id] = resources;
	    };
	
	    var clearResourcesForRunnable = function(id) {
	        spyRegistry.clearSpies();
	        delete runnableResources[id];
	    };
	
	    var beforeAndAfterFns = function(suite) {
	      return function() {
	        var befores = [],
	          afters = [];
	
	        while(suite) {
	          befores = befores.concat(suite.beforeFns);
	          afters = afters.concat(suite.afterFns);
	
	          suite = suite.parentSuite;
	        }
	
	        return {
	          befores: befores.reverse(),
	          afters: afters
	        };
	      };
	    };
	
	    var getSpecName = function(spec, suite) {
	      return suite.getFullName() + ' ' + spec.description;
	    };
	
	    // TODO: we may just be able to pass in the fn instead of wrapping here
	    var buildExpectationResult = j$.buildExpectationResult,
	        exceptionFormatter = new j$.ExceptionFormatter(),
	        expectationResultFactory = function(attrs) {
	          attrs.messageFormatter = exceptionFormatter.message;
	          attrs.stackFormatter = exceptionFormatter.stack;
	
	          return buildExpectationResult(attrs);
	        };
	
	    // TODO: fix this naming, and here's where the value comes in
	    this.catchExceptions = function(value) {
	      catchExceptions = !!value;
	      return catchExceptions;
	    };
	
	    this.catchingExceptions = function() {
	      return catchExceptions;
	    };
	
	    var maximumSpecCallbackDepth = 20;
	    var currentSpecCallbackDepth = 0;
	
	    function clearStack(fn) {
	      currentSpecCallbackDepth++;
	      if (currentSpecCallbackDepth >= maximumSpecCallbackDepth) {
	        currentSpecCallbackDepth = 0;
	        realSetTimeout(fn, 0);
	      } else {
	        fn();
	      }
	    }
	
	    var catchException = function(e) {
	      return j$.Spec.isPendingSpecException(e) || catchExceptions;
	    };
	
	    this.throwOnExpectationFailure = function(value) {
	      throwOnExpectationFailure = !!value;
	    };
	
	    this.throwingExpectationFailures = function() {
	      return throwOnExpectationFailure;
	    };
	
	    this.randomizeTests = function(value) {
	      random = !!value;
	    };
	
	    this.randomTests = function() {
	      return random;
	    };
	
	    this.seed = function(value) {
	      if (value) {
	        seed = value;
	      }
	      return seed;
	    };
	
	    var queueRunnerFactory = function(options) {
	      options.catchException = catchException;
	      options.clearStack = options.clearStack || clearStack;
	      options.timeout = {setTimeout: realSetTimeout, clearTimeout: realClearTimeout};
	      options.fail = self.fail;
	
	      new j$.QueueRunner(options).execute();
	    };
	
	    var topSuite = new j$.Suite({
	      env: this,
	      id: getNextSuiteId(),
	      description: 'Jasmine__TopLevel__Suite',
	      queueRunner: queueRunnerFactory
	    });
	    runnableLookupTable[topSuite.id] = topSuite;
	    defaultResourcesForRunnable(topSuite.id);
	    currentDeclarationSuite = topSuite;
	
	    this.topSuite = function() {
	      return topSuite;
	    };
	
	    this.execute = function(runnablesToRun) {
	      if(!runnablesToRun) {
	        if (focusedRunnables.length) {
	          runnablesToRun = focusedRunnables;
	        } else {
	          runnablesToRun = [topSuite.id];
	        }
	      }
	
	      var order = new j$.Order({
	        random: random,
	        seed: seed
	      });
	
	      var processor = new j$.TreeProcessor({
	        tree: topSuite,
	        runnableIds: runnablesToRun,
	        queueRunnerFactory: queueRunnerFactory,
	        nodeStart: function(suite) {
	          currentlyExecutingSuites.push(suite);
	          defaultResourcesForRunnable(suite.id, suite.parentSuite.id);
	          reporter.suiteStarted(suite.result);
	        },
	        nodeComplete: function(suite, result) {
	          if (!suite.disabled) {
	            clearResourcesForRunnable(suite.id);
	          }
	          currentlyExecutingSuites.pop();
	          reporter.suiteDone(result);
	        },
	        orderChildren: function(node) {
	          return order.sort(node.children);
	        }
	      });
	
	      if(!processor.processTree().valid) {
	        throw new Error('Invalid order: would cause a beforeAll or afterAll to be run multiple times');
	      }
	
	      reporter.jasmineStarted({
	        totalSpecsDefined: totalSpecsDefined
	      });
	
	      processor.execute(function() {
	        reporter.jasmineDone({
	          order: order
	        });
	      });
	    };
	
	    this.addReporter = function(reporterToAdd) {
	      reporter.addReporter(reporterToAdd);
	    };
	
	    var spyRegistry = new j$.SpyRegistry({currentSpies: function() {
	      if(!currentRunnable()) {
	        throw new Error('Spies must be created in a before function or a spec');
	      }
	      return runnableResources[currentRunnable().id].spies;
	    }});
	
	    this.spyOn = function() {
	      return spyRegistry.spyOn.apply(spyRegistry, arguments);
	    };
	
	    var suiteFactory = function(description) {
	      var suite = new j$.Suite({
	        env: self,
	        id: getNextSuiteId(),
	        description: description,
	        parentSuite: currentDeclarationSuite,
	        expectationFactory: expectationFactory,
	        expectationResultFactory: expectationResultFactory,
	        throwOnExpectationFailure: throwOnExpectationFailure
	      });
	
	      runnableLookupTable[suite.id] = suite;
	      return suite;
	    };
	
	    this.describe = function(description, specDefinitions) {
	      var suite = suiteFactory(description);
	      if (specDefinitions.length > 0) {
	        throw new Error('describe does not expect a done parameter');
	      }
	      if (currentDeclarationSuite.markedPending) {
	        suite.pend();
	      }
	      addSpecsToSuite(suite, specDefinitions);
	      return suite;
	    };
	
	    this.xdescribe = function(description, specDefinitions) {
	      var suite = suiteFactory(description);
	      suite.pend();
	      addSpecsToSuite(suite, specDefinitions);
	      return suite;
	    };
	
	    var focusedRunnables = [];
	
	    this.fdescribe = function(description, specDefinitions) {
	      var suite = suiteFactory(description);
	      suite.isFocused = true;
	
	      focusedRunnables.push(suite.id);
	      unfocusAncestor();
	      addSpecsToSuite(suite, specDefinitions);
	
	      return suite;
	    };
	
	    function addSpecsToSuite(suite, specDefinitions) {
	      var parentSuite = currentDeclarationSuite;
	      parentSuite.addChild(suite);
	      currentDeclarationSuite = suite;
	
	      var declarationError = null;
	      try {
	        specDefinitions.call(suite);
	      } catch (e) {
	        declarationError = e;
	      }
	
	      if (declarationError) {
	        self.it('encountered a declaration exception', function() {
	          throw declarationError;
	        });
	      }
	
	      currentDeclarationSuite = parentSuite;
	    }
	
	    function findFocusedAncestor(suite) {
	      while (suite) {
	        if (suite.isFocused) {
	          return suite.id;
	        }
	        suite = suite.parentSuite;
	      }
	
	      return null;
	    }
	
	    function unfocusAncestor() {
	      var focusedAncestor = findFocusedAncestor(currentDeclarationSuite);
	      if (focusedAncestor) {
	        for (var i = 0; i < focusedRunnables.length; i++) {
	          if (focusedRunnables[i] === focusedAncestor) {
	            focusedRunnables.splice(i, 1);
	            break;
	          }
	        }
	      }
	    }
	
	    var specFactory = function(description, fn, suite, timeout) {
	      totalSpecsDefined++;
	      var spec = new j$.Spec({
	        id: getNextSpecId(),
	        beforeAndAfterFns: beforeAndAfterFns(suite),
	        expectationFactory: expectationFactory,
	        resultCallback: specResultCallback,
	        getSpecName: function(spec) {
	          return getSpecName(spec, suite);
	        },
	        onStart: specStarted,
	        description: description,
	        expectationResultFactory: expectationResultFactory,
	        queueRunnerFactory: queueRunnerFactory,
	        userContext: function() { return suite.clonedSharedUserContext(); },
	        queueableFn: {
	          fn: fn,
	          timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
	        },
	        throwOnExpectationFailure: throwOnExpectationFailure
	      });
	
	      runnableLookupTable[spec.id] = spec;
	
	      if (!self.specFilter(spec)) {
	        spec.disable();
	      }
	
	      return spec;
	
	      function specResultCallback(result) {
	        clearResourcesForRunnable(spec.id);
	        currentSpec = null;
	        reporter.specDone(result);
	      }
	
	      function specStarted(spec) {
	        currentSpec = spec;
	        defaultResourcesForRunnable(spec.id, suite.id);
	        reporter.specStarted(spec.result);
	      }
	    };
	
	    this.it = function(description, fn, timeout) {
	      var spec = specFactory(description, fn, currentDeclarationSuite, timeout);
	      if (currentDeclarationSuite.markedPending) {
	        spec.pend();
	      }
	      currentDeclarationSuite.addChild(spec);
	      return spec;
	    };
	
	    this.xit = function() {
	      var spec = this.it.apply(this, arguments);
	      spec.pend('Temporarily disabled with xit');
	      return spec;
	    };
	
	    this.fit = function(description, fn, timeout){
	      var spec = specFactory(description, fn, currentDeclarationSuite, timeout);
	      currentDeclarationSuite.addChild(spec);
	      focusedRunnables.push(spec.id);
	      unfocusAncestor();
	      return spec;
	    };
	
	    this.expect = function(actual) {
	      if (!currentRunnable()) {
	        throw new Error('\'expect\' was used when there was no current spec, this could be because an asynchronous test timed out');
	      }
	
	      return currentRunnable().expect(actual);
	    };
	
	    this.beforeEach = function(beforeEachFunction, timeout) {
	      currentDeclarationSuite.beforeEach({
	        fn: beforeEachFunction,
	        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
	      });
	    };
	
	    this.beforeAll = function(beforeAllFunction, timeout) {
	      currentDeclarationSuite.beforeAll({
	        fn: beforeAllFunction,
	        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
	      });
	    };
	
	    this.afterEach = function(afterEachFunction, timeout) {
	      currentDeclarationSuite.afterEach({
	        fn: afterEachFunction,
	        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
	      });
	    };
	
	    this.afterAll = function(afterAllFunction, timeout) {
	      currentDeclarationSuite.afterAll({
	        fn: afterAllFunction,
	        timeout: function() { return timeout || j$.DEFAULT_TIMEOUT_INTERVAL; }
	      });
	    };
	
	    this.pending = function(message) {
	      var fullMessage = j$.Spec.pendingSpecExceptionMessage;
	      if(message) {
	        fullMessage += message;
	      }
	      throw fullMessage;
	    };
	
	    this.fail = function(error) {
	      var message = 'Failed';
	      if (error) {
	        message += ': ';
	        message += error.message || error;
	      }
	
	      currentRunnable().addExpectationResult(false, {
	        matcherName: '',
	        passed: false,
	        expected: '',
	        actual: '',
	        message: message,
	        error: error && error.message ? error : null
	      });
	    };
	  }
	
	  return Env;
	};
	
	getJasmineRequireObj().JsApiReporter = function() {
	
	  var noopTimer = {
	    start: function(){},
	    elapsed: function(){ return 0; }
	  };
	
	  function JsApiReporter(options) {
	    var timer = options.timer || noopTimer,
	        status = 'loaded';
	
	    this.started = false;
	    this.finished = false;
	    this.runDetails = {};
	
	    this.jasmineStarted = function() {
	      this.started = true;
	      status = 'started';
	      timer.start();
	    };
	
	    var executionTime;
	
	    this.jasmineDone = function(runDetails) {
	      this.finished = true;
	      this.runDetails = runDetails;
	      executionTime = timer.elapsed();
	      status = 'done';
	    };
	
	    this.status = function() {
	      return status;
	    };
	
	    var suites = [],
	      suites_hash = {};
	
	    this.suiteStarted = function(result) {
	      suites_hash[result.id] = result;
	    };
	
	    this.suiteDone = function(result) {
	      storeSuite(result);
	    };
	
	    this.suiteResults = function(index, length) {
	      return suites.slice(index, index + length);
	    };
	
	    function storeSuite(result) {
	      suites.push(result);
	      suites_hash[result.id] = result;
	    }
	
	    this.suites = function() {
	      return suites_hash;
	    };
	
	    var specs = [];
	
	    this.specDone = function(result) {
	      specs.push(result);
	    };
	
	    this.specResults = function(index, length) {
	      return specs.slice(index, index + length);
	    };
	
	    this.specs = function() {
	      return specs;
	    };
	
	    this.executionTime = function() {
	      return executionTime;
	    };
	
	  }
	
	  return JsApiReporter;
	};
	
	getJasmineRequireObj().CallTracker = function() {
	
	  function CallTracker() {
	    var calls = [];
	
	    this.track = function(context) {
	      calls.push(context);
	    };
	
	    this.any = function() {
	      return !!calls.length;
	    };
	
	    this.count = function() {
	      return calls.length;
	    };
	
	    this.argsFor = function(index) {
	      var call = calls[index];
	      return call ? call.args : [];
	    };
	
	    this.all = function() {
	      return calls;
	    };
	
	    this.allArgs = function() {
	      var callArgs = [];
	      for(var i = 0; i < calls.length; i++){
	        callArgs.push(calls[i].args);
	      }
	
	      return callArgs;
	    };
	
	    this.first = function() {
	      return calls[0];
	    };
	
	    this.mostRecent = function() {
	      return calls[calls.length - 1];
	    };
	
	    this.reset = function() {
	      calls = [];
	    };
	  }
	
	  return CallTracker;
	};
	
	getJasmineRequireObj().Clock = function() {
	  function Clock(global, delayedFunctionSchedulerFactory, mockDate) {
	    var self = this,
	      realTimingFunctions = {
	        setTimeout: global.setTimeout,
	        clearTimeout: global.clearTimeout,
	        setInterval: global.setInterval,
	        clearInterval: global.clearInterval
	      },
	      fakeTimingFunctions = {
	        setTimeout: setTimeout,
	        clearTimeout: clearTimeout,
	        setInterval: setInterval,
	        clearInterval: clearInterval
	      },
	      installed = false,
	      delayedFunctionScheduler,
	      timer;
	
	
	    self.install = function() {
	      if(!originalTimingFunctionsIntact()) {
	        throw new Error('Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?');
	      }
	      replace(global, fakeTimingFunctions);
	      timer = fakeTimingFunctions;
	      delayedFunctionScheduler = delayedFunctionSchedulerFactory();
	      installed = true;
	
	      return self;
	    };
	
	    self.uninstall = function() {
	      delayedFunctionScheduler = null;
	      mockDate.uninstall();
	      replace(global, realTimingFunctions);
	
	      timer = realTimingFunctions;
	      installed = false;
	    };
	
	    self.withMock = function(closure) {
	      this.install();
	      try {
	        closure();
	      } finally {
	        this.uninstall();
	      }
	    };
	
	    self.mockDate = function(initialDate) {
	      mockDate.install(initialDate);
	    };
	
	    self.setTimeout = function(fn, delay, params) {
	      if (legacyIE()) {
	        if (arguments.length > 2) {
	          throw new Error('IE < 9 cannot support extra params to setTimeout without a polyfill');
	        }
	        return timer.setTimeout(fn, delay);
	      }
	      return Function.prototype.apply.apply(timer.setTimeout, [global, arguments]);
	    };
	
	    self.setInterval = function(fn, delay, params) {
	      if (legacyIE()) {
	        if (arguments.length > 2) {
	          throw new Error('IE < 9 cannot support extra params to setInterval without a polyfill');
	        }
	        return timer.setInterval(fn, delay);
	      }
	      return Function.prototype.apply.apply(timer.setInterval, [global, arguments]);
	    };
	
	    self.clearTimeout = function(id) {
	      return Function.prototype.call.apply(timer.clearTimeout, [global, id]);
	    };
	
	    self.clearInterval = function(id) {
	      return Function.prototype.call.apply(timer.clearInterval, [global, id]);
	    };
	
	    self.tick = function(millis) {
	      if (installed) {
	        mockDate.tick(millis);
	        delayedFunctionScheduler.tick(millis);
	      } else {
	        throw new Error('Mock clock is not installed, use jasmine.clock().install()');
	      }
	    };
	
	    return self;
	
	    function originalTimingFunctionsIntact() {
	      return global.setTimeout === realTimingFunctions.setTimeout &&
	        global.clearTimeout === realTimingFunctions.clearTimeout &&
	        global.setInterval === realTimingFunctions.setInterval &&
	        global.clearInterval === realTimingFunctions.clearInterval;
	    }
	
	    function legacyIE() {
	      //if these methods are polyfilled, apply will be present
	      return !(realTimingFunctions.setTimeout || realTimingFunctions.setInterval).apply;
	    }
	
	    function replace(dest, source) {
	      for (var prop in source) {
	        dest[prop] = source[prop];
	      }
	    }
	
	    function setTimeout(fn, delay) {
	      return delayedFunctionScheduler.scheduleFunction(fn, delay, argSlice(arguments, 2));
	    }
	
	    function clearTimeout(id) {
	      return delayedFunctionScheduler.removeFunctionWithId(id);
	    }
	
	    function setInterval(fn, interval) {
	      return delayedFunctionScheduler.scheduleFunction(fn, interval, argSlice(arguments, 2), true);
	    }
	
	    function clearInterval(id) {
	      return delayedFunctionScheduler.removeFunctionWithId(id);
	    }
	
	    function argSlice(argsObj, n) {
	      return Array.prototype.slice.call(argsObj, n);
	    }
	  }
	
	  return Clock;
	};
	
	getJasmineRequireObj().DelayedFunctionScheduler = function() {
	  function DelayedFunctionScheduler() {
	    var self = this;
	    var scheduledLookup = [];
	    var scheduledFunctions = {};
	    var currentTime = 0;
	    var delayedFnCount = 0;
	
	    self.tick = function(millis) {
	      millis = millis || 0;
	      var endTime = currentTime + millis;
	
	      runScheduledFunctions(endTime);
	      currentTime = endTime;
	    };
	
	    self.scheduleFunction = function(funcToCall, millis, params, recurring, timeoutKey, runAtMillis) {
	      var f;
	      if (typeof(funcToCall) === 'string') {
	        /* jshint evil: true */
	        f = function() { return eval(funcToCall); };
	        /* jshint evil: false */
	      } else {
	        f = funcToCall;
	      }
	
	      millis = millis || 0;
	      timeoutKey = timeoutKey || ++delayedFnCount;
	      runAtMillis = runAtMillis || (currentTime + millis);
	
	      var funcToSchedule = {
	        runAtMillis: runAtMillis,
	        funcToCall: f,
	        recurring: recurring,
	        params: params,
	        timeoutKey: timeoutKey,
	        millis: millis
	      };
	
	      if (runAtMillis in scheduledFunctions) {
	        scheduledFunctions[runAtMillis].push(funcToSchedule);
	      } else {
	        scheduledFunctions[runAtMillis] = [funcToSchedule];
	        scheduledLookup.push(runAtMillis);
	        scheduledLookup.sort(function (a, b) {
	          return a - b;
	        });
	      }
	
	      return timeoutKey;
	    };
	
	    self.removeFunctionWithId = function(timeoutKey) {
	      for (var runAtMillis in scheduledFunctions) {
	        var funcs = scheduledFunctions[runAtMillis];
	        var i = indexOfFirstToPass(funcs, function (func) {
	          return func.timeoutKey === timeoutKey;
	        });
	
	        if (i > -1) {
	          if (funcs.length === 1) {
	            delete scheduledFunctions[runAtMillis];
	            deleteFromLookup(runAtMillis);
	          } else {
	            funcs.splice(i, 1);
	          }
	
	          // intervals get rescheduled when executed, so there's never more
	          // than a single scheduled function with a given timeoutKey
	          break;
	        }
	      }
	    };
	
	    return self;
	
	    function indexOfFirstToPass(array, testFn) {
	      var index = -1;
	
	      for (var i = 0; i < array.length; ++i) {
	        if (testFn(array[i])) {
	          index = i;
	          break;
	        }
	      }
	
	      return index;
	    }
	
	    function deleteFromLookup(key) {
	      var value = Number(key);
	      var i = indexOfFirstToPass(scheduledLookup, function (millis) {
	        return millis === value;
	      });
	
	      if (i > -1) {
	        scheduledLookup.splice(i, 1);
	      }
	    }
	
	    function reschedule(scheduledFn) {
	      self.scheduleFunction(scheduledFn.funcToCall,
	        scheduledFn.millis,
	        scheduledFn.params,
	        true,
	        scheduledFn.timeoutKey,
	        scheduledFn.runAtMillis + scheduledFn.millis);
	    }
	
	    function forEachFunction(funcsToRun, callback) {
	      for (var i = 0; i < funcsToRun.length; ++i) {
	        callback(funcsToRun[i]);
	      }
	    }
	
	    function runScheduledFunctions(endTime) {
	      if (scheduledLookup.length === 0 || scheduledLookup[0] > endTime) {
	        return;
	      }
	
	      do {
	        currentTime = scheduledLookup.shift();
	
	        var funcsToRun = scheduledFunctions[currentTime];
	        delete scheduledFunctions[currentTime];
	
	        forEachFunction(funcsToRun, function(funcToRun) {
	          if (funcToRun.recurring) {
	            reschedule(funcToRun);
	          }
	        });
	
	        forEachFunction(funcsToRun, function(funcToRun) {
	          funcToRun.funcToCall.apply(null, funcToRun.params || []);
	        });
	      } while (scheduledLookup.length > 0 &&
	              // checking first if we're out of time prevents setTimeout(0)
	              // scheduled in a funcToRun from forcing an extra iteration
	                 currentTime !== endTime  &&
	                 scheduledLookup[0] <= endTime);
	    }
	  }
	
	  return DelayedFunctionScheduler;
	};
	
	getJasmineRequireObj().ExceptionFormatter = function() {
	  function ExceptionFormatter() {
	    this.message = function(error) {
	      var message = '';
	
	      if (error.name && error.message) {
	        message += error.name + ': ' + error.message;
	      } else {
	        message += error.toString() + ' thrown';
	      }
	
	      if (error.fileName || error.sourceURL) {
	        message += ' in ' + (error.fileName || error.sourceURL);
	      }
	
	      if (error.line || error.lineNumber) {
	        message += ' (line ' + (error.line || error.lineNumber) + ')';
	      }
	
	      return message;
	    };
	
	    this.stack = function(error) {
	      return error ? error.stack : null;
	    };
	  }
	
	  return ExceptionFormatter;
	};
	
	getJasmineRequireObj().Expectation = function() {
	
	  function Expectation(options) {
	    this.util = options.util || { buildFailureMessage: function() {} };
	    this.customEqualityTesters = options.customEqualityTesters || [];
	    this.actual = options.actual;
	    this.addExpectationResult = options.addExpectationResult || function(){};
	    this.isNot = options.isNot;
	
	    var customMatchers = options.customMatchers || {};
	    for (var matcherName in customMatchers) {
	      this[matcherName] = Expectation.prototype.wrapCompare(matcherName, customMatchers[matcherName]);
	    }
	  }
	
	  Expectation.prototype.wrapCompare = function(name, matcherFactory) {
	    return function() {
	      var args = Array.prototype.slice.call(arguments, 0),
	        expected = args.slice(0),
	        message = '';
	
	      args.unshift(this.actual);
	
	      var matcher = matcherFactory(this.util, this.customEqualityTesters),
	          matcherCompare = matcher.compare;
	
	      function defaultNegativeCompare() {
	        var result = matcher.compare.apply(null, args);
	        result.pass = !result.pass;
	        return result;
	      }
	
	      if (this.isNot) {
	        matcherCompare = matcher.negativeCompare || defaultNegativeCompare;
	      }
	
	      var result = matcherCompare.apply(null, args);
	
	      if (!result.pass) {
	        if (!result.message) {
	          args.unshift(this.isNot);
	          args.unshift(name);
	          message = this.util.buildFailureMessage.apply(null, args);
	        } else {
	          if (Object.prototype.toString.apply(result.message) === '[object Function]') {
	            message = result.message();
	          } else {
	            message = result.message;
	          }
	        }
	      }
	
	      if (expected.length == 1) {
	        expected = expected[0];
	      }
	
	      // TODO: how many of these params are needed?
	      this.addExpectationResult(
	        result.pass,
	        {
	          matcherName: name,
	          passed: result.pass,
	          message: message,
	          actual: this.actual,
	          expected: expected // TODO: this may need to be arrayified/sliced
	        }
	      );
	    };
	  };
	
	  Expectation.addCoreMatchers = function(matchers) {
	    var prototype = Expectation.prototype;
	    for (var matcherName in matchers) {
	      var matcher = matchers[matcherName];
	      prototype[matcherName] = prototype.wrapCompare(matcherName, matcher);
	    }
	  };
	
	  Expectation.Factory = function(options) {
	    options = options || {};
	
	    var expect = new Expectation(options);
	
	    // TODO: this would be nice as its own Object - NegativeExpectation
	    // TODO: copy instead of mutate options
	    options.isNot = true;
	    expect.not = new Expectation(options);
	
	    return expect;
	  };
	
	  return Expectation;
	};
	
	//TODO: expectation result may make more sense as a presentation of an expectation.
	getJasmineRequireObj().buildExpectationResult = function() {
	  function buildExpectationResult(options) {
	    var messageFormatter = options.messageFormatter || function() {},
	      stackFormatter = options.stackFormatter || function() {};
	
	    var result = {
	      matcherName: options.matcherName,
	      message: message(),
	      stack: stack(),
	      passed: options.passed
	    };
	
	    if(!result.passed) {
	      result.expected = options.expected;
	      result.actual = options.actual;
	    }
	
	    return result;
	
	    function message() {
	      if (options.passed) {
	        return 'Passed.';
	      } else if (options.message) {
	        return options.message;
	      } else if (options.error) {
	        return messageFormatter(options.error);
	      }
	      return '';
	    }
	
	    function stack() {
	      if (options.passed) {
	        return '';
	      }
	
	      var error = options.error;
	      if (!error) {
	        try {
	          throw new Error(message());
	        } catch (e) {
	          error = e;
	        }
	      }
	      return stackFormatter(error);
	    }
	  }
	
	  return buildExpectationResult;
	};
	
	getJasmineRequireObj().MockDate = function() {
	  function MockDate(global) {
	    var self = this;
	    var currentTime = 0;
	
	    if (!global || !global.Date) {
	      self.install = function() {};
	      self.tick = function() {};
	      self.uninstall = function() {};
	      return self;
	    }
	
	    var GlobalDate = global.Date;
	
	    self.install = function(mockDate) {
	      if (mockDate instanceof GlobalDate) {
	        currentTime = mockDate.getTime();
	      } else {
	        currentTime = new GlobalDate().getTime();
	      }
	
	      global.Date = FakeDate;
	    };
	
	    self.tick = function(millis) {
	      millis = millis || 0;
	      currentTime = currentTime + millis;
	    };
	
	    self.uninstall = function() {
	      currentTime = 0;
	      global.Date = GlobalDate;
	    };
	
	    createDateProperties();
	
	    return self;
	
	    function FakeDate() {
	      switch(arguments.length) {
	        case 0:
	          return new GlobalDate(currentTime);
	        case 1:
	          return new GlobalDate(arguments[0]);
	        case 2:
	          return new GlobalDate(arguments[0], arguments[1]);
	        case 3:
	          return new GlobalDate(arguments[0], arguments[1], arguments[2]);
	        case 4:
	          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3]);
	        case 5:
	          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
	                                arguments[4]);
	        case 6:
	          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
	                                arguments[4], arguments[5]);
	        default:
	          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
	                                arguments[4], arguments[5], arguments[6]);
	      }
	    }
	
	    function createDateProperties() {
	      FakeDate.prototype = GlobalDate.prototype;
	
	      FakeDate.now = function() {
	        if (GlobalDate.now) {
	          return currentTime;
	        } else {
	          throw new Error('Browser does not support Date.now()');
	        }
	      };
	
	      FakeDate.toSource = GlobalDate.toSource;
	      FakeDate.toString = GlobalDate.toString;
	      FakeDate.parse = GlobalDate.parse;
	      FakeDate.UTC = GlobalDate.UTC;
	    }
		}
	
	  return MockDate;
	};
	
	getJasmineRequireObj().pp = function(j$) {
	
	  function PrettyPrinter() {
	    this.ppNestLevel_ = 0;
	    this.seen = [];
	  }
	
	  PrettyPrinter.prototype.format = function(value) {
	    this.ppNestLevel_++;
	    try {
	      if (j$.util.isUndefined(value)) {
	        this.emitScalar('undefined');
	      } else if (value === null) {
	        this.emitScalar('null');
	      } else if (value === 0 && 1/value === -Infinity) {
	        this.emitScalar('-0');
	      } else if (value === j$.getGlobal()) {
	        this.emitScalar('<global>');
	      } else if (value.jasmineToString) {
	        this.emitScalar(value.jasmineToString());
	      } else if (typeof value === 'string') {
	        this.emitString(value);
	      } else if (j$.isSpy(value)) {
	        this.emitScalar('spy on ' + value.and.identity());
	      } else if (value instanceof RegExp) {
	        this.emitScalar(value.toString());
	      } else if (typeof value === 'function') {
	        this.emitScalar('Function');
	      } else if (typeof value.nodeType === 'number') {
	        this.emitScalar('HTMLNode');
	      } else if (value instanceof Date) {
	        this.emitScalar('Date(' + value + ')');
	      } else if (value.toString && typeof value === 'object' && !(value instanceof Array) && value.toString !== Object.prototype.toString) {
	        this.emitScalar(value.toString());
	      } else if (j$.util.arrayContains(this.seen, value)) {
	        this.emitScalar('<circular reference: ' + (j$.isArray_(value) ? 'Array' : 'Object') + '>');
	      } else if (j$.isArray_(value) || j$.isA_('Object', value)) {
	        this.seen.push(value);
	        if (j$.isArray_(value)) {
	          this.emitArray(value);
	        } else {
	          this.emitObject(value);
	        }
	        this.seen.pop();
	      } else {
	        this.emitScalar(value.toString());
	      }
	    } finally {
	      this.ppNestLevel_--;
	    }
	  };
	
	  PrettyPrinter.prototype.iterateObject = function(obj, fn) {
	    for (var property in obj) {
	      if (!Object.prototype.hasOwnProperty.call(obj, property)) { continue; }
	      fn(property, obj.__lookupGetter__ ? (!j$.util.isUndefined(obj.__lookupGetter__(property)) &&
	          obj.__lookupGetter__(property) !== null) : false);
	    }
	  };
	
	  PrettyPrinter.prototype.emitArray = j$.unimplementedMethod_;
	  PrettyPrinter.prototype.emitObject = j$.unimplementedMethod_;
	  PrettyPrinter.prototype.emitScalar = j$.unimplementedMethod_;
	  PrettyPrinter.prototype.emitString = j$.unimplementedMethod_;
	
	  function StringPrettyPrinter() {
	    PrettyPrinter.call(this);
	
	    this.string = '';
	  }
	
	  j$.util.inherit(StringPrettyPrinter, PrettyPrinter);
	
	  StringPrettyPrinter.prototype.emitScalar = function(value) {
	    this.append(value);
	  };
	
	  StringPrettyPrinter.prototype.emitString = function(value) {
	    this.append('\'' + value + '\'');
	  };
	
	  StringPrettyPrinter.prototype.emitArray = function(array) {
	    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
	      this.append('Array');
	      return;
	    }
	    var length = Math.min(array.length, j$.MAX_PRETTY_PRINT_ARRAY_LENGTH);
	    this.append('[ ');
	    for (var i = 0; i < length; i++) {
	      if (i > 0) {
	        this.append(', ');
	      }
	      this.format(array[i]);
	    }
	    if(array.length > length){
	      this.append(', ...');
	    }
	
	    var self = this;
	    var first = array.length === 0;
	    this.iterateObject(array, function(property, isGetter) {
	      if (property.match(/^\d+$/)) {
	        return;
	      }
	
	      if (first) {
	        first = false;
	      } else {
	        self.append(', ');
	      }
	
	      self.formatProperty(array, property, isGetter);
	    });
	
	    this.append(' ]');
	  };
	
	  StringPrettyPrinter.prototype.emitObject = function(obj) {
	    var constructorName = obj.constructor ? j$.fnNameFor(obj.constructor) : 'null';
	    this.append(constructorName);
	
	    if (this.ppNestLevel_ > j$.MAX_PRETTY_PRINT_DEPTH) {
	      return;
	    }
	
	    var self = this;
	    this.append('({ ');
	    var first = true;
	
	    this.iterateObject(obj, function(property, isGetter) {
	      if (first) {
	        first = false;
	      } else {
	        self.append(', ');
	      }
	
	      self.formatProperty(obj, property, isGetter);
	    });
	
	    this.append(' })');
	  };
	
	  StringPrettyPrinter.prototype.formatProperty = function(obj, property, isGetter) {
	      this.append(property);
	      this.append(': ');
	      if (isGetter) {
	        this.append('<getter>');
	      } else {
	        this.format(obj[property]);
	      }
	  };
	
	  StringPrettyPrinter.prototype.append = function(value) {
	    this.string += value;
	  };
	
	  return function(value) {
	    var stringPrettyPrinter = new StringPrettyPrinter();
	    stringPrettyPrinter.format(value);
	    return stringPrettyPrinter.string;
	  };
	};
	
	getJasmineRequireObj().QueueRunner = function(j$) {
	
	  function once(fn) {
	    var called = false;
	    return function() {
	      if (!called) {
	        called = true;
	        fn();
	      }
	    };
	  }
	
	  function QueueRunner(attrs) {
	    this.queueableFns = attrs.queueableFns || [];
	    this.onComplete = attrs.onComplete || function() {};
	    this.clearStack = attrs.clearStack || function(fn) {fn();};
	    this.onException = attrs.onException || function() {};
	    this.catchException = attrs.catchException || function() { return true; };
	    this.userContext = attrs.userContext || {};
	    this.timeout = attrs.timeout || {setTimeout: setTimeout, clearTimeout: clearTimeout};
	    this.fail = attrs.fail || function() {};
	  }
	
	  QueueRunner.prototype.execute = function() {
	    this.run(this.queueableFns, 0);
	  };
	
	  QueueRunner.prototype.run = function(queueableFns, recursiveIndex) {
	    var length = queueableFns.length,
	      self = this,
	      iterativeIndex;
	
	
	    for(iterativeIndex = recursiveIndex; iterativeIndex < length; iterativeIndex++) {
	      var queueableFn = queueableFns[iterativeIndex];
	      if (queueableFn.fn.length > 0) {
	        attemptAsync(queueableFn);
	        return;
	      } else {
	        attemptSync(queueableFn);
	      }
	    }
	
	    var runnerDone = iterativeIndex >= length;
	
	    if (runnerDone) {
	      this.clearStack(this.onComplete);
	    }
	
	    function attemptSync(queueableFn) {
	      try {
	        queueableFn.fn.call(self.userContext);
	      } catch (e) {
	        handleException(e, queueableFn);
	      }
	    }
	
	    function attemptAsync(queueableFn) {
	      var clearTimeout = function () {
	          Function.prototype.apply.apply(self.timeout.clearTimeout, [j$.getGlobal(), [timeoutId]]);
	        },
	        next = once(function () {
	          clearTimeout(timeoutId);
	          self.run(queueableFns, iterativeIndex + 1);
	        }),
	        timeoutId;
	
	      next.fail = function() {
	        self.fail.apply(null, arguments);
	        next();
	      };
	
	      if (queueableFn.timeout) {
	        timeoutId = Function.prototype.apply.apply(self.timeout.setTimeout, [j$.getGlobal(), [function() {
	          var error = new Error('Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.');
	          onException(error);
	          next();
	        }, queueableFn.timeout()]]);
	      }
	
	      try {
	        queueableFn.fn.call(self.userContext, next);
	      } catch (e) {
	        handleException(e, queueableFn);
	        next();
	      }
	    }
	
	    function onException(e) {
	      self.onException(e);
	    }
	
	    function handleException(e, queueableFn) {
	      onException(e);
	      if (!self.catchException(e)) {
	        //TODO: set a var when we catch an exception and
	        //use a finally block to close the loop in a nice way..
	        throw e;
	      }
	    }
	  };
	
	  return QueueRunner;
	};
	
	getJasmineRequireObj().ReportDispatcher = function() {
	  function ReportDispatcher(methods) {
	
	    var dispatchedMethods = methods || [];
	
	    for (var i = 0; i < dispatchedMethods.length; i++) {
	      var method = dispatchedMethods[i];
	      this[method] = (function(m) {
	        return function() {
	          dispatch(m, arguments);
	        };
	      }(method));
	    }
	
	    var reporters = [];
	
	    this.addReporter = function(reporter) {
	      reporters.push(reporter);
	    };
	
	    return this;
	
	    function dispatch(method, args) {
	      for (var i = 0; i < reporters.length; i++) {
	        var reporter = reporters[i];
	        if (reporter[method]) {
	          reporter[method].apply(reporter, args);
	        }
	      }
	    }
	  }
	
	  return ReportDispatcher;
	};
	
	
	getJasmineRequireObj().SpyRegistry = function(j$) {
	
	  function SpyRegistry(options) {
	    options = options || {};
	    var currentSpies = options.currentSpies || function() { return []; };
	
	    this.spyOn = function(obj, methodName) {
	      if (j$.util.isUndefined(obj)) {
	        throw new Error('spyOn could not find an object to spy upon for ' + methodName + '()');
	      }
	
	      if (j$.util.isUndefined(methodName)) {
	        throw new Error('No method name supplied');
	      }
	
	      if (j$.util.isUndefined(obj[methodName])) {
	        throw new Error(methodName + '() method does not exist');
	      }
	
	      if (obj[methodName] && j$.isSpy(obj[methodName])) {
	        //TODO?: should this return the current spy? Downside: may cause user confusion about spy state
	        throw new Error(methodName + ' has already been spied upon');
	      }
	
	      var descriptor;
	      try {
	        descriptor = Object.getOwnPropertyDescriptor(obj, methodName);
	      } catch(e) {
	        // IE 8 doesn't support `definePropery` on non-DOM nodes
	      }
	
	      if (descriptor && !(descriptor.writable || descriptor.set)) {
	        throw new Error(methodName + ' is not declared writable or has no setter');
	      }
	
	      var spy = j$.createSpy(methodName, obj[methodName]);
	
	      currentSpies().push({
	        spy: spy,
	        baseObj: obj,
	        methodName: methodName,
	        originalValue: obj[methodName]
	      });
	
	      obj[methodName] = spy;
	
	      return spy;
	    };
	
	    this.clearSpies = function() {
	      var spies = currentSpies();
	      for (var i = 0; i < spies.length; i++) {
	        var spyEntry = spies[i];
	        spyEntry.baseObj[spyEntry.methodName] = spyEntry.originalValue;
	      }
	    };
	  }
	
	  return SpyRegistry;
	};
	
	getJasmineRequireObj().SpyStrategy = function() {
	
	  function SpyStrategy(options) {
	    options = options || {};
	
	    var identity = options.name || 'unknown',
	        originalFn = options.fn || function() {},
	        getSpy = options.getSpy || function() {},
	        plan = function() {};
	
	    this.identity = function() {
	      return identity;
	    };
	
	    this.exec = function() {
	      return plan.apply(this, arguments);
	    };
	
	    this.callThrough = function() {
	      plan = originalFn;
	      return getSpy();
	    };
	
	    this.returnValue = function(value) {
	      plan = function() {
	        return value;
	      };
	      return getSpy();
	    };
	
	    this.returnValues = function() {
	      var values = Array.prototype.slice.call(arguments);
	      plan = function () {
	        return values.shift();
	      };
	      return getSpy();
	    };
	
	    this.throwError = function(something) {
	      var error = (something instanceof Error) ? something : new Error(something);
	      plan = function() {
	        throw error;
	      };
	      return getSpy();
	    };
	
	    this.callFake = function(fn) {
	      plan = fn;
	      return getSpy();
	    };
	
	    this.stub = function(fn) {
	      plan = function() {};
	      return getSpy();
	    };
	  }
	
	  return SpyStrategy;
	};
	
	getJasmineRequireObj().Suite = function(j$) {
	  function Suite(attrs) {
	    this.env = attrs.env;
	    this.id = attrs.id;
	    this.parentSuite = attrs.parentSuite;
	    this.description = attrs.description;
	    this.expectationFactory = attrs.expectationFactory;
	    this.expectationResultFactory = attrs.expectationResultFactory;
	    this.throwOnExpectationFailure = !!attrs.throwOnExpectationFailure;
	
	    this.beforeFns = [];
	    this.afterFns = [];
	    this.beforeAllFns = [];
	    this.afterAllFns = [];
	    this.disabled = false;
	
	    this.children = [];
	
	    this.result = {
	      id: this.id,
	      description: this.description,
	      fullName: this.getFullName(),
	      failedExpectations: []
	    };
	  }
	
	  Suite.prototype.expect = function(actual) {
	    return this.expectationFactory(actual, this);
	  };
	
	  Suite.prototype.getFullName = function() {
	    var fullName = this.description;
	    for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {
	      if (parentSuite.parentSuite) {
	        fullName = parentSuite.description + ' ' + fullName;
	      }
	    }
	    return fullName;
	  };
	
	  Suite.prototype.disable = function() {
	    this.disabled = true;
	  };
	
	  Suite.prototype.pend = function(message) {
	    this.markedPending = true;
	  };
	
	  Suite.prototype.beforeEach = function(fn) {
	    this.beforeFns.unshift(fn);
	  };
	
	  Suite.prototype.beforeAll = function(fn) {
	    this.beforeAllFns.push(fn);
	  };
	
	  Suite.prototype.afterEach = function(fn) {
	    this.afterFns.unshift(fn);
	  };
	
	  Suite.prototype.afterAll = function(fn) {
	    this.afterAllFns.push(fn);
	  };
	
	  Suite.prototype.addChild = function(child) {
	    this.children.push(child);
	  };
	
	  Suite.prototype.status = function() {
	    if (this.disabled) {
	      return 'disabled';
	    }
	
	    if (this.markedPending) {
	      return 'pending';
	    }
	
	    if (this.result.failedExpectations.length > 0) {
	      return 'failed';
	    } else {
	      return 'finished';
	    }
	  };
	
	  Suite.prototype.isExecutable = function() {
	    return !this.disabled;
	  };
	
	  Suite.prototype.canBeReentered = function() {
	    return this.beforeAllFns.length === 0 && this.afterAllFns.length === 0;
	  };
	
	  Suite.prototype.getResult = function() {
	    this.result.status = this.status();
	    return this.result;
	  };
	
	  Suite.prototype.sharedUserContext = function() {
	    if (!this.sharedContext) {
	      this.sharedContext = this.parentSuite ? clone(this.parentSuite.sharedUserContext()) : {};
	    }
	
	    return this.sharedContext;
	  };
	
	  Suite.prototype.clonedSharedUserContext = function() {
	    return clone(this.sharedUserContext());
	  };
	
	  Suite.prototype.onException = function() {
	    if (arguments[0] instanceof j$.errors.ExpectationFailed) {
	      return;
	    }
	
	    if(isAfterAll(this.children)) {
	      var data = {
	        matcherName: '',
	        passed: false,
	        expected: '',
	        actual: '',
	        error: arguments[0]
	      };
	      this.result.failedExpectations.push(this.expectationResultFactory(data));
	    } else {
	      for (var i = 0; i < this.children.length; i++) {
	        var child = this.children[i];
	        child.onException.apply(child, arguments);
	      }
	    }
	  };
	
	  Suite.prototype.addExpectationResult = function () {
	    if(isAfterAll(this.children) && isFailure(arguments)){
	      var data = arguments[1];
	      this.result.failedExpectations.push(this.expectationResultFactory(data));
	      if(this.throwOnExpectationFailure) {
	        throw new j$.errors.ExpectationFailed();
	      }
	    } else {
	      for (var i = 0; i < this.children.length; i++) {
	        var child = this.children[i];
	        try {
	          child.addExpectationResult.apply(child, arguments);
	        } catch(e) {
	          // keep going
	        }
	      }
	    }
	  };
	
	  function isAfterAll(children) {
	    return children && children[0].result.status;
	  }
	
	  function isFailure(args) {
	    return !args[0];
	  }
	
	  function clone(obj) {
	    var clonedObj = {};
	    for (var prop in obj) {
	      if (obj.hasOwnProperty(prop)) {
	        clonedObj[prop] = obj[prop];
	      }
	    }
	
	    return clonedObj;
	  }
	
	  return Suite;
	};
	
	if (typeof window == void 0 && typeof exports == 'object') {
	  exports.Suite = jasmineRequire.Suite;
	}
	
	getJasmineRequireObj().Timer = function() {
	  var defaultNow = (function(Date) {
	    return function() { return new Date().getTime(); };
	  })(Date);
	
	  function Timer(options) {
	    options = options || {};
	
	    var now = options.now || defaultNow,
	      startTime;
	
	    this.start = function() {
	      startTime = now();
	    };
	
	    this.elapsed = function() {
	      return now() - startTime;
	    };
	  }
	
	  return Timer;
	};
	
	getJasmineRequireObj().TreeProcessor = function() {
	  function TreeProcessor(attrs) {
	    var tree = attrs.tree,
	        runnableIds = attrs.runnableIds,
	        queueRunnerFactory = attrs.queueRunnerFactory,
	        nodeStart = attrs.nodeStart || function() {},
	        nodeComplete = attrs.nodeComplete || function() {},
	        orderChildren = attrs.orderChildren || function(node) { return node.children; },
	        stats = { valid: true },
	        processed = false,
	        defaultMin = Infinity,
	        defaultMax = 1 - Infinity;
	
	    this.processTree = function() {
	      processNode(tree, false);
	      processed = true;
	      return stats;
	    };
	
	    this.execute = function(done) {
	      if (!processed) {
	        this.processTree();
	      }
	
	      if (!stats.valid) {
	        throw 'invalid order';
	      }
	
	      var childFns = wrapChildren(tree, 0);
	
	      queueRunnerFactory({
	        queueableFns: childFns,
	        userContext: tree.sharedUserContext(),
	        onException: function() {
	          tree.onException.apply(tree, arguments);
	        },
	        onComplete: done
	      });
	    };
	
	    function runnableIndex(id) {
	      for (var i = 0; i < runnableIds.length; i++) {
	        if (runnableIds[i] === id) {
	          return i;
	        }
	      }
	    }
	
	    function processNode(node, parentEnabled) {
	      var executableIndex = runnableIndex(node.id);
	
	      if (executableIndex !== undefined) {
	        parentEnabled = true;
	      }
	
	      parentEnabled = parentEnabled && node.isExecutable();
	
	      if (!node.children) {
	        stats[node.id] = {
	          executable: parentEnabled && node.isExecutable(),
	          segments: [{
	            index: 0,
	            owner: node,
	            nodes: [node],
	            min: startingMin(executableIndex),
	            max: startingMax(executableIndex)
	          }]
	        };
	      } else {
	        var hasExecutableChild = false;
	
	        var orderedChildren = orderChildren(node);
	
	        for (var i = 0; i < orderedChildren.length; i++) {
	          var child = orderedChildren[i];
	
	          processNode(child, parentEnabled);
	
	          if (!stats.valid) {
	            return;
	          }
	
	          var childStats = stats[child.id];
	
	          hasExecutableChild = hasExecutableChild || childStats.executable;
	        }
	
	        stats[node.id] = {
	          executable: hasExecutableChild
	        };
	
	        segmentChildren(node, orderedChildren, stats[node.id], executableIndex);
	
	        if (!node.canBeReentered() && stats[node.id].segments.length > 1) {
	          stats = { valid: false };
	        }
	      }
	    }
	
	    function startingMin(executableIndex) {
	      return executableIndex === undefined ? defaultMin : executableIndex;
	    }
	
	    function startingMax(executableIndex) {
	      return executableIndex === undefined ? defaultMax : executableIndex;
	    }
	
	    function segmentChildren(node, orderedChildren, nodeStats, executableIndex) {
	      var currentSegment = { index: 0, owner: node, nodes: [], min: startingMin(executableIndex), max: startingMax(executableIndex) },
	          result = [currentSegment],
	          lastMax = defaultMax,
	          orderedChildSegments = orderChildSegments(orderedChildren);
	
	      function isSegmentBoundary(minIndex) {
	        return lastMax !== defaultMax && minIndex !== defaultMin && lastMax < minIndex - 1;
	      }
	
	      for (var i = 0; i < orderedChildSegments.length; i++) {
	        var childSegment = orderedChildSegments[i],
	          maxIndex = childSegment.max,
	          minIndex = childSegment.min;
	
	        if (isSegmentBoundary(minIndex)) {
	          currentSegment = {index: result.length, owner: node, nodes: [], min: defaultMin, max: defaultMax};
	          result.push(currentSegment);
	        }
	
	        currentSegment.nodes.push(childSegment);
	        currentSegment.min = Math.min(currentSegment.min, minIndex);
	        currentSegment.max = Math.max(currentSegment.max, maxIndex);
	        lastMax = maxIndex;
	      }
	
	      nodeStats.segments = result;
	    }
	
	    function orderChildSegments(children) {
	      var specifiedOrder = [],
	          unspecifiedOrder = [];
	
	      for (var i = 0; i < children.length; i++) {
	        var child = children[i],
	            segments = stats[child.id].segments;
	
	        for (var j = 0; j < segments.length; j++) {
	          var seg = segments[j];
	
	          if (seg.min === defaultMin) {
	            unspecifiedOrder.push(seg);
	          } else {
	            specifiedOrder.push(seg);
	          }
	        }
	      }
	
	      specifiedOrder.sort(function(a, b) {
	        return a.min - b.min;
	      });
	
	      return specifiedOrder.concat(unspecifiedOrder);
	    }
	
	    function executeNode(node, segmentNumber) {
	      if (node.children) {
	        return {
	          fn: function(done) {
	            nodeStart(node);
	
	            queueRunnerFactory({
	              onComplete: function() {
	                nodeComplete(node, node.getResult());
	                done();
	              },
	              queueableFns: wrapChildren(node, segmentNumber),
	              userContext: node.sharedUserContext(),
	              onException: function() {
	                node.onException.apply(node, arguments);
	              }
	            });
	          }
	        };
	      } else {
	        return {
	          fn: function(done) { node.execute(done, stats[node.id].executable); }
	        };
	      }
	    }
	
	    function wrapChildren(node, segmentNumber) {
	      var result = [],
	          segmentChildren = stats[node.id].segments[segmentNumber].nodes;
	
	      for (var i = 0; i < segmentChildren.length; i++) {
	        result.push(executeNode(segmentChildren[i].owner, segmentChildren[i].index));
	      }
	
	      if (!stats[node.id].executable) {
	        return result;
	      }
	
	      return node.beforeAllFns.concat(result).concat(node.afterAllFns);
	    }
	  }
	
	  return TreeProcessor;
	};
	
	getJasmineRequireObj().Any = function(j$) {
	
	  function Any(expectedObject) {
	    if (typeof expectedObject === 'undefined') {
	      throw new TypeError(
	        'jasmine.any() expects to be passed a constructor function. ' +
	        'Please pass one or use jasmine.anything() to match any object.'
	      );
	    }
	    this.expectedObject = expectedObject;
	  }
	
	  Any.prototype.asymmetricMatch = function(other) {
	    if (this.expectedObject == String) {
	      return typeof other == 'string' || other instanceof String;
	    }
	
	    if (this.expectedObject == Number) {
	      return typeof other == 'number' || other instanceof Number;
	    }
	
	    if (this.expectedObject == Function) {
	      return typeof other == 'function' || other instanceof Function;
	    }
	
	    if (this.expectedObject == Object) {
	      return typeof other == 'object';
	    }
	
	    if (this.expectedObject == Boolean) {
	      return typeof other == 'boolean';
	    }
	
	    return other instanceof this.expectedObject;
	  };
	
	  Any.prototype.jasmineToString = function() {
	    return '<jasmine.any(' + j$.fnNameFor(this.expectedObject) + ')>';
	  };
	
	  return Any;
	};
	
	getJasmineRequireObj().Anything = function(j$) {
	
	  function Anything() {}
	
	  Anything.prototype.asymmetricMatch = function(other) {
	    return !j$.util.isUndefined(other) && other !== null;
	  };
	
	  Anything.prototype.jasmineToString = function() {
	    return '<jasmine.anything>';
	  };
	
	  return Anything;
	};
	
	getJasmineRequireObj().ArrayContaining = function(j$) {
	  function ArrayContaining(sample) {
	    this.sample = sample;
	  }
	
	  ArrayContaining.prototype.asymmetricMatch = function(other) {
	    var className = Object.prototype.toString.call(this.sample);
	    if (className !== '[object Array]') { throw new Error('You must provide an array to arrayContaining, not \'' + this.sample + '\'.'); }
	
	    for (var i = 0; i < this.sample.length; i++) {
	      var item = this.sample[i];
	      if (!j$.matchersUtil.contains(other, item)) {
	        return false;
	      }
	    }
	
	    return true;
	  };
	
	  ArrayContaining.prototype.jasmineToString = function () {
	    return '<jasmine.arrayContaining(' + jasmine.pp(this.sample) +')>';
	  };
	
	  return ArrayContaining;
	};
	
	getJasmineRequireObj().ObjectContaining = function(j$) {
	
	  function ObjectContaining(sample) {
	    this.sample = sample;
	  }
	
	  function getPrototype(obj) {
	    if (Object.getPrototypeOf) {
	      return Object.getPrototypeOf(obj);
	    }
	
	    if (obj.constructor.prototype == obj) {
	      return null;
	    }
	
	    return obj.constructor.prototype;
	  }
	
	  function hasProperty(obj, property) {
	    if (!obj) {
	      return false;
	    }
	
	    if (Object.prototype.hasOwnProperty.call(obj, property)) {
	      return true;
	    }
	
	    return hasProperty(getPrototype(obj), property);
	  }
	
	  ObjectContaining.prototype.asymmetricMatch = function(other) {
	    if (typeof(this.sample) !== 'object') { throw new Error('You must provide an object to objectContaining, not \''+this.sample+'\'.'); }
	
	    for (var property in this.sample) {
	      if (!hasProperty(other, property) ||
	          !j$.matchersUtil.equals(this.sample[property], other[property])) {
	        return false;
	      }
	    }
	
	    return true;
	  };
	
	  ObjectContaining.prototype.jasmineToString = function() {
	    return '<jasmine.objectContaining(' + j$.pp(this.sample) + ')>';
	  };
	
	  return ObjectContaining;
	};
	
	getJasmineRequireObj().StringMatching = function(j$) {
	
	  function StringMatching(expected) {
	    if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {
	      throw new Error('Expected is not a String or a RegExp');
	    }
	
	    this.regexp = new RegExp(expected);
	  }
	
	  StringMatching.prototype.asymmetricMatch = function(other) {
	    return this.regexp.test(other);
	  };
	
	  StringMatching.prototype.jasmineToString = function() {
	    return '<jasmine.stringMatching(' + this.regexp + ')>';
	  };
	
	  return StringMatching;
	};
	
	getJasmineRequireObj().errors = function() {
	  function ExpectationFailed() {}
	
	  ExpectationFailed.prototype = new Error();
	  ExpectationFailed.prototype.constructor = ExpectationFailed;
	
	  return {
	    ExpectationFailed: ExpectationFailed
	  };
	};
	getJasmineRequireObj().matchersUtil = function(j$) {
	  // TODO: what to do about jasmine.pp not being inject? move to JSON.stringify? gut PrettyPrinter?
	
	  return {
	    equals: function(a, b, customTesters) {
	      customTesters = customTesters || [];
	
	      return eq(a, b, [], [], customTesters);
	    },
	
	    contains: function(haystack, needle, customTesters) {
	      customTesters = customTesters || [];
	
	      if ((Object.prototype.toString.apply(haystack) === '[object Array]') ||
	        (!!haystack && !haystack.indexOf))
	      {
	        for (var i = 0; i < haystack.length; i++) {
	          if (eq(haystack[i], needle, [], [], customTesters)) {
	            return true;
	          }
	        }
	        return false;
	      }
	
	      return !!haystack && haystack.indexOf(needle) >= 0;
	    },
	
	    buildFailureMessage: function() {
	      var args = Array.prototype.slice.call(arguments, 0),
	        matcherName = args[0],
	        isNot = args[1],
	        actual = args[2],
	        expected = args.slice(3),
	        englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });
	
	      var message = 'Expected ' +
	        j$.pp(actual) +
	        (isNot ? ' not ' : ' ') +
	        englishyPredicate;
	
	      if (expected.length > 0) {
	        for (var i = 0; i < expected.length; i++) {
	          if (i > 0) {
	            message += ',';
	          }
	          message += ' ' + j$.pp(expected[i]);
	        }
	      }
	
	      return message + '.';
	    }
	  };
	
	  function isAsymmetric(obj) {
	    return obj && j$.isA_('Function', obj.asymmetricMatch);
	  }
	
	  function asymmetricMatch(a, b) {
	    var asymmetricA = isAsymmetric(a),
	        asymmetricB = isAsymmetric(b);
	
	    if (asymmetricA && asymmetricB) {
	      return undefined;
	    }
	
	    if (asymmetricA) {
	      return a.asymmetricMatch(b);
	    }
	
	    if (asymmetricB) {
	      return b.asymmetricMatch(a);
	    }
	  }
	
	  // Equality function lovingly adapted from isEqual in
	  //   [Underscore](http://underscorejs.org)
	  function eq(a, b, aStack, bStack, customTesters) {
	    var result = true;
	
	    var asymmetricResult = asymmetricMatch(a, b);
	    if (!j$.util.isUndefined(asymmetricResult)) {
	      return asymmetricResult;
	    }
	
	    for (var i = 0; i < customTesters.length; i++) {
	      var customTesterResult = customTesters[i](a, b);
	      if (!j$.util.isUndefined(customTesterResult)) {
	        return customTesterResult;
	      }
	    }
	
	    if (a instanceof Error && b instanceof Error) {
	      return a.message == b.message;
	    }
	
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) { return a !== 0 || 1 / a == 1 / b; }
	    // A strict comparison is necessary because `null == undefined`.
	    if (a === null || b === null) { return a === b; }
	    var className = Object.prototype.toString.call(a);
	    if (className != Object.prototype.toString.call(b)) { return false; }
	    switch (className) {
	      // Strings, numbers, dates, and booleans are compared by value.
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return a == String(b);
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	        // other numeric values.
	        return a != +a ? b != +b : (a === 0 ? 1 / a == 1 / b : a == +b);
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a == +b;
	      // RegExps are compared by their source patterns and flags.
	      case '[object RegExp]':
	        return a.source == b.source &&
	          a.global == b.global &&
	          a.multiline == b.multiline &&
	          a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') { return false; }
	
	    var aIsDomNode = j$.isDomNode(a);
	    var bIsDomNode = j$.isDomNode(b);
	    if (aIsDomNode && bIsDomNode) {
	      // At first try to use DOM3 method isEqualNode
	      if (a.isEqualNode) {
	        return a.isEqualNode(b);
	      }
	      // IE8 doesn't support isEqualNode, try to use outerHTML && innerText
	      var aIsElement = a instanceof Element;
	      var bIsElement = b instanceof Element;
	      if (aIsElement && bIsElement) {
	        return a.outerHTML == b.outerHTML;
	      }
	      if (aIsElement || bIsElement) {
	        return false;
	      }
	      return a.innerText == b.innerText && a.textContent == b.textContent;
	    }
	    if (aIsDomNode || bIsDomNode) {
	      return false;
	    }
	
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] == a) { return bStack[length] == b; }
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0;
	    // Recursively compare objects and arrays.
	    // Compare array lengths to determine if a deep comparison is necessary.
	    if (className == '[object Array]' && a.length !== b.length) {
	      result = false;
	    }
	
	    if (result) {
	      // Objects with different constructors are not equivalent, but `Object`s
	      // or `Array`s from different frames are.
	      if (className !== '[object Array]') {
	        var aCtor = a.constructor, bCtor = b.constructor;
	        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
	               isFunction(bCtor) && bCtor instanceof bCtor)) {
	          return false;
	        }
	      }
	      // Deep compare objects.
	      for (var key in a) {
	        if (has(a, key)) {
	          // Count the expected number of properties.
	          size++;
	          // Deep compare each member.
	          if (!(result = has(b, key) && eq(a[key], b[key], aStack, bStack, customTesters))) { break; }
	        }
	      }
	      // Ensure that both objects contain the same number of properties.
	      if (result) {
	        for (key in b) {
	          if (has(b, key) && !(size--)) { break; }
	        }
	        result = !size;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	
	    return result;
	
	    function has(obj, key) {
	      return Object.prototype.hasOwnProperty.call(obj, key);
	    }
	
	    function isFunction(obj) {
	      return typeof obj === 'function';
	    }
	  }
	};
	
	getJasmineRequireObj().toBe = function() {
	  function toBe() {
	    return {
	      compare: function(actual, expected) {
	        return {
	          pass: actual === expected
	        };
	      }
	    };
	  }
	
	  return toBe;
	};
	
	getJasmineRequireObj().toBeCloseTo = function() {
	
	  function toBeCloseTo() {
	    return {
	      compare: function(actual, expected, precision) {
	        if (precision !== 0) {
	          precision = precision || 2;
	        }
	
	        return {
	          pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)
	        };
	      }
	    };
	  }
	
	  return toBeCloseTo;
	};
	
	getJasmineRequireObj().toBeDefined = function() {
	  function toBeDefined() {
	    return {
	      compare: function(actual) {
	        return {
	          pass: (void 0 !== actual)
	        };
	      }
	    };
	  }
	
	  return toBeDefined;
	};
	
	getJasmineRequireObj().toBeFalsy = function() {
	  function toBeFalsy() {
	    return {
	      compare: function(actual) {
	        return {
	          pass: !!!actual
	        };
	      }
	    };
	  }
	
	  return toBeFalsy;
	};
	
	getJasmineRequireObj().toBeGreaterThan = function() {
	
	  function toBeGreaterThan() {
	    return {
	      compare: function(actual, expected) {
	        return {
	          pass: actual > expected
	        };
	      }
	    };
	  }
	
	  return toBeGreaterThan;
	};
	
	
	getJasmineRequireObj().toBeLessThan = function() {
	  function toBeLessThan() {
	    return {
	
	      compare: function(actual, expected) {
	        return {
	          pass: actual < expected
	        };
	      }
	    };
	  }
	
	  return toBeLessThan;
	};
	getJasmineRequireObj().toBeNaN = function(j$) {
	
	  function toBeNaN() {
	    return {
	      compare: function(actual) {
	        var result = {
	          pass: (actual !== actual)
	        };
	
	        if (result.pass) {
	          result.message = 'Expected actual not to be NaN.';
	        } else {
	          result.message = function() { return 'Expected ' + j$.pp(actual) + ' to be NaN.'; };
	        }
	
	        return result;
	      }
	    };
	  }
	
	  return toBeNaN;
	};
	
	getJasmineRequireObj().toBeNull = function() {
	
	  function toBeNull() {
	    return {
	      compare: function(actual) {
	        return {
	          pass: actual === null
	        };
	      }
	    };
	  }
	
	  return toBeNull;
	};
	
	getJasmineRequireObj().toBeTruthy = function() {
	
	  function toBeTruthy() {
	    return {
	      compare: function(actual) {
	        return {
	          pass: !!actual
	        };
	      }
	    };
	  }
	
	  return toBeTruthy;
	};
	
	getJasmineRequireObj().toBeUndefined = function() {
	
	  function toBeUndefined() {
	    return {
	      compare: function(actual) {
	        return {
	          pass: void 0 === actual
	        };
	      }
	    };
	  }
	
	  return toBeUndefined;
	};
	
	getJasmineRequireObj().toContain = function() {
	  function toContain(util, customEqualityTesters) {
	    customEqualityTesters = customEqualityTesters || [];
	
	    return {
	      compare: function(actual, expected) {
	
	        return {
	          pass: util.contains(actual, expected, customEqualityTesters)
	        };
	      }
	    };
	  }
	
	  return toContain;
	};
	
	getJasmineRequireObj().toEqual = function() {
	
	  function toEqual(util, customEqualityTesters) {
	    customEqualityTesters = customEqualityTesters || [];
	
	    return {
	      compare: function(actual, expected) {
	        var result = {
	          pass: false
	        };
	
	        result.pass = util.equals(actual, expected, customEqualityTesters);
	
	        return result;
	      }
	    };
	  }
	
	  return toEqual;
	};
	
	getJasmineRequireObj().toHaveBeenCalled = function(j$) {
	
	  function toHaveBeenCalled() {
	    return {
	      compare: function(actual) {
	        var result = {};
	
	        if (!j$.isSpy(actual)) {
	          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');
	        }
	
	        if (arguments.length > 1) {
	          throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
	        }
	
	        result.pass = actual.calls.any();
	
	        result.message = result.pass ?
	          'Expected spy ' + actual.and.identity() + ' not to have been called.' :
	          'Expected spy ' + actual.and.identity() + ' to have been called.';
	
	        return result;
	      }
	    };
	  }
	
	  return toHaveBeenCalled;
	};
	
	getJasmineRequireObj().toHaveBeenCalledTimes = function(j$) {
	
	  function toHaveBeenCalledTimes() {
	    return {
	      compare: function(actual, expected) {
	        if (!j$.isSpy(actual)) {
	          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');
	        }
	
	        var args = Array.prototype.slice.call(arguments, 0),
	          result = { pass: false };
	
	        if(!expected){
	          throw new Error('Expected times failed is required as an argument.');
	        }
	
	        actual = args[0];
	        var calls = actual.calls.count();
	        var timesMessage = expected === 1 ? 'once' : expected + ' times';
	        result.pass = calls === expected;
	        result.message = result.pass ?
	          'Expected spy ' + actual.and.identity() + ' not to have been called ' + timesMessage + '. It was called ' +  calls + ' times.' :
	          'Expected spy ' + actual.and.identity() + ' to have been called ' + timesMessage + '. It was called ' +  calls + ' times.';
	        return result;
	      }
	    };
	  }
	
	  return toHaveBeenCalledTimes;
	};
	
	getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {
	
	  function toHaveBeenCalledWith(util, customEqualityTesters) {
	    return {
	      compare: function() {
	        var args = Array.prototype.slice.call(arguments, 0),
	          actual = args[0],
	          expectedArgs = args.slice(1),
	          result = { pass: false };
	
	        if (!j$.isSpy(actual)) {
	          throw new Error('Expected a spy, but got ' + j$.pp(actual) + '.');
	        }
	
	        if (!actual.calls.any()) {
	          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but it was never called.'; };
	          return result;
	        }
	
	        if (util.contains(actual.calls.allArgs(), expectedArgs, customEqualityTesters)) {
	          result.pass = true;
	          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' not to have been called with ' + j$.pp(expectedArgs) + ' but it was.'; };
	        } else {
	          result.message = function() { return 'Expected spy ' + actual.and.identity() + ' to have been called with ' + j$.pp(expectedArgs) + ' but actual calls were ' + j$.pp(actual.calls.allArgs()).replace(/^\[ | \]$/g, '') + '.'; };
	        }
	
	        return result;
	      }
	    };
	  }
	
	  return toHaveBeenCalledWith;
	};
	
	getJasmineRequireObj().toMatch = function(j$) {
	
	  function toMatch() {
	    return {
	      compare: function(actual, expected) {
	        if (!j$.isString_(expected) && !j$.isA_('RegExp', expected)) {
	          throw new Error('Expected is not a String or a RegExp');
	        }
	
	        var regexp = new RegExp(expected);
	
	        return {
	          pass: regexp.test(actual)
	        };
	      }
	    };
	  }
	
	  return toMatch;
	};
	
	getJasmineRequireObj().toThrow = function(j$) {
	
	  function toThrow(util) {
	    return {
	      compare: function(actual, expected) {
	        var result = { pass: false },
	          threw = false,
	          thrown;
	
	        if (typeof actual != 'function') {
	          throw new Error('Actual is not a Function');
	        }
	
	        try {
	          actual();
	        } catch (e) {
	          threw = true;
	          thrown = e;
	        }
	
	        if (!threw) {
	          result.message = 'Expected function to throw an exception.';
	          return result;
	        }
	
	        if (arguments.length == 1) {
	          result.pass = true;
	          result.message = function() { return 'Expected function not to throw, but it threw ' + j$.pp(thrown) + '.'; };
	
	          return result;
	        }
	
	        if (util.equals(thrown, expected)) {
	          result.pass = true;
	          result.message = function() { return 'Expected function not to throw ' + j$.pp(expected) + '.'; };
	        } else {
	          result.message = function() { return 'Expected function to throw ' + j$.pp(expected) + ', but it threw ' +  j$.pp(thrown) + '.'; };
	        }
	
	        return result;
	      }
	    };
	  }
	
	  return toThrow;
	};
	
	getJasmineRequireObj().toThrowError = function(j$) {
	  function toThrowError () {
	    return {
	      compare: function(actual) {
	        var threw = false,
	          pass = {pass: true},
	          fail = {pass: false},
	          thrown;
	
	        if (typeof actual != 'function') {
	          throw new Error('Actual is not a Function');
	        }
	
	        var errorMatcher = getMatcher.apply(null, arguments);
	
	        try {
	          actual();
	        } catch (e) {
	          threw = true;
	          thrown = e;
	        }
	
	        if (!threw) {
	          fail.message = 'Expected function to throw an Error.';
	          return fail;
	        }
	
	        if (!(thrown instanceof Error)) {
	          fail.message = function() { return 'Expected function to throw an Error, but it threw ' + j$.pp(thrown) + '.'; };
	          return fail;
	        }
	
	        if (errorMatcher.hasNoSpecifics()) {
	          pass.message = 'Expected function not to throw an Error, but it threw ' + j$.fnNameFor(thrown) + '.';
	          return pass;
	        }
	
	        if (errorMatcher.matches(thrown)) {
	          pass.message = function() {
	            return 'Expected function not to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() + '.';
	          };
	          return pass;
	        } else {
	          fail.message = function() {
	            return 'Expected function to throw ' + errorMatcher.errorTypeDescription + errorMatcher.messageDescription() +
	              ', but it threw ' + errorMatcher.thrownDescription(thrown) + '.';
	          };
	          return fail;
	        }
	      }
	    };
	
	    function getMatcher() {
	      var expected = null,
	          errorType = null;
	
	      if (arguments.length == 2) {
	        expected = arguments[1];
	        if (isAnErrorType(expected)) {
	          errorType = expected;
	          expected = null;
	        }
	      } else if (arguments.length > 2) {
	        errorType = arguments[1];
	        expected = arguments[2];
	        if (!isAnErrorType(errorType)) {
	          throw new Error('Expected error type is not an Error.');
	        }
	      }
	
	      if (expected && !isStringOrRegExp(expected)) {
	        if (errorType) {
	          throw new Error('Expected error message is not a string or RegExp.');
	        } else {
	          throw new Error('Expected is not an Error, string, or RegExp.');
	        }
	      }
	
	      function messageMatch(message) {
	        if (typeof expected == 'string') {
	          return expected == message;
	        } else {
	          return expected.test(message);
	        }
	      }
	
	      return {
	        errorTypeDescription: errorType ? j$.fnNameFor(errorType) : 'an exception',
	        thrownDescription: function(thrown) {
	          var thrownName = errorType ? j$.fnNameFor(thrown.constructor) : 'an exception',
	              thrownMessage = '';
	
	          if (expected) {
	            thrownMessage = ' with message ' + j$.pp(thrown.message);
	          }
	
	          return thrownName + thrownMessage;
	        },
	        messageDescription: function() {
	          if (expected === null) {
	            return '';
	          } else if (expected instanceof RegExp) {
	            return ' with a message matching ' + j$.pp(expected);
	          } else {
	            return ' with message ' + j$.pp(expected);
	          }
	        },
	        hasNoSpecifics: function() {
	          return expected === null && errorType === null;
	        },
	        matches: function(error) {
	          return (errorType === null || error instanceof errorType) &&
	            (expected === null || messageMatch(error.message));
	        }
	      };
	    }
	
	    function isStringOrRegExp(potential) {
	      return potential instanceof RegExp || (typeof potential == 'string');
	    }
	
	    function isAnErrorType(type) {
	      if (typeof type !== 'function') {
	        return false;
	      }
	
	      var Surrogate = function() {};
	      Surrogate.prototype = type.prototype;
	      return (new Surrogate()) instanceof Error;
	    }
	  }
	
	  return toThrowError;
	};
	
	getJasmineRequireObj().interface = function(jasmine, env) {
	  var jasmineInterface = {
	    describe: function(description, specDefinitions) {
	      return env.describe(description, specDefinitions);
	    },
	
	    xdescribe: function(description, specDefinitions) {
	      return env.xdescribe(description, specDefinitions);
	    },
	
	    fdescribe: function(description, specDefinitions) {
	      return env.fdescribe(description, specDefinitions);
	    },
	
	    it: function() {
	      return env.it.apply(env, arguments);
	    },
	
	    xit: function() {
	      return env.xit.apply(env, arguments);
	    },
	
	    fit: function() {
	      return env.fit.apply(env, arguments);
	    },
	
	    beforeEach: function() {
	      return env.beforeEach.apply(env, arguments);
	    },
	
	    afterEach: function() {
	      return env.afterEach.apply(env, arguments);
	    },
	
	    beforeAll: function() {
	      return env.beforeAll.apply(env, arguments);
	    },
	
	    afterAll: function() {
	      return env.afterAll.apply(env, arguments);
	    },
	
	    expect: function(actual) {
	      return env.expect(actual);
	    },
	
	    pending: function() {
	      return env.pending.apply(env, arguments);
	    },
	
	    fail: function() {
	      return env.fail.apply(env, arguments);
	    },
	
	    spyOn: function(obj, methodName) {
	      return env.spyOn(obj, methodName);
	    },
	
	    jsApiReporter: new jasmine.JsApiReporter({
	      timer: new jasmine.Timer()
	    }),
	
	    jasmine: jasmine
	  };
	
	  jasmine.addCustomEqualityTester = function(tester) {
	    env.addCustomEqualityTester(tester);
	  };
	
	  jasmine.addMatchers = function(matchers) {
	    return env.addMatchers(matchers);
	  };
	
	  jasmine.clock = function() {
	    return env.clock;
	  };
	
	  return jasmineInterface;
	};
	
	getJasmineRequireObj().version = function() {
	  return '2.4.1';
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	Copyright (c) 2008-2015 Pivotal Labs
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	module.exports = function(jasmineRequire) {
	  var jasmine = jasmineRequire.core(jasmineRequire);
	
	  var consoleFns = __webpack_require__(5);
	  consoleFns.console(consoleFns, jasmine);
	
	  var env = jasmine.getEnv();
	
	  var jasmineInterface = jasmineRequire.interface(jasmine, env);
	
	  extend(global, jasmineInterface);
	
	  function extend(destination, source) {
	    for (var property in source) destination[property] = source[property];
	    return destination;
	  }
	
	  return jasmine;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
	Copyright (c) 2008-2015 Pivotal Labs
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	function getJasmineRequireObj() {
	  if (typeof module !== 'undefined' && module.exports) {
	    return exports;
	  } else {
	    window.jasmineRequire = window.jasmineRequire || {};
	    return window.jasmineRequire;
	  }
	}
	
	getJasmineRequireObj().console = function(jRequire, j$) {
	  j$.ConsoleReporter = jRequire.ConsoleReporter();
	};
	
	getJasmineRequireObj().ConsoleReporter = function() {
	
	  var noopTimer = {
	    start: function(){},
	    elapsed: function(){ return 0; }
	  };
	
	  function ConsoleReporter(options) {
	    var print = options.print,
	      showColors = options.showColors || false,
	      onComplete = options.onComplete || function() {},
	      timer = options.timer || noopTimer,
	      specCount,
	      failureCount,
	      failedSpecs = [],
	      pendingCount,
	      ansi = {
	        green: '\x1B[32m',
	        red: '\x1B[31m',
	        yellow: '\x1B[33m',
	        none: '\x1B[0m'
	      },
	      failedSuites = [];
	
	    print('ConsoleReporter is deprecated and will be removed in a future version.');
	
	    this.jasmineStarted = function() {
	      specCount = 0;
	      failureCount = 0;
	      pendingCount = 0;
	      print('Started');
	      printNewline();
	      timer.start();
	    };
	
	    this.jasmineDone = function() {
	      printNewline();
	      for (var i = 0; i < failedSpecs.length; i++) {
	        specFailureDetails(failedSpecs[i]);
	      }
	
	      if(specCount > 0) {
	        printNewline();
	
	        var specCounts = specCount + ' ' + plural('spec', specCount) + ', ' +
	          failureCount + ' ' + plural('failure', failureCount);
	
	        if (pendingCount) {
	          specCounts += ', ' + pendingCount + ' pending ' + plural('spec', pendingCount);
	        }
	
	        print(specCounts);
	      } else {
	        print('No specs found');
	      }
	
	      printNewline();
	      var seconds = timer.elapsed() / 1000;
	      print('Finished in ' + seconds + ' ' + plural('second', seconds));
	      printNewline();
	
	      for(i = 0; i < failedSuites.length; i++) {
	        suiteFailureDetails(failedSuites[i]);
	      }
	
	      onComplete(failureCount === 0);
	    };
	
	    this.specDone = function(result) {
	      specCount++;
	
	      if (result.status == 'pending') {
	        pendingCount++;
	        print(colored('yellow', '*'));
	        return;
	      }
	
	      if (result.status == 'passed') {
	        print(colored('green', '.'));
	        return;
	      }
	
	      if (result.status == 'failed') {
	        failureCount++;
	        failedSpecs.push(result);
	        print(colored('red', 'F'));
	      }
	    };
	
	    this.suiteDone = function(result) {
	      if (result.failedExpectations && result.failedExpectations.length > 0) {
	        failureCount++;
	        failedSuites.push(result);
	      }
	    };
	
	    return this;
	
	    function printNewline() {
	      print('\n');
	    }
	
	    function colored(color, str) {
	      return showColors ? (ansi[color] + str + ansi.none) : str;
	    }
	
	    function plural(str, count) {
	      return count == 1 ? str : str + 's';
	    }
	
	    function repeat(thing, times) {
	      var arr = [];
	      for (var i = 0; i < times; i++) {
	        arr.push(thing);
	      }
	      return arr;
	    }
	
	    function indent(str, spaces) {
	      var lines = (str || '').split('\n');
	      var newArr = [];
	      for (var i = 0; i < lines.length; i++) {
	        newArr.push(repeat(' ', spaces).join('') + lines[i]);
	      }
	      return newArr.join('\n');
	    }
	
	    function specFailureDetails(result) {
	      printNewline();
	      print(result.fullName);
	
	      for (var i = 0; i < result.failedExpectations.length; i++) {
	        var failedExpectation = result.failedExpectations[i];
	        printNewline();
	        print(indent(failedExpectation.message, 2));
	        print(indent(failedExpectation.stack, 2));
	      }
	
	      printNewline();
	    }
	
	    function suiteFailureDetails(result) {
	      for (var i = 0; i < result.failedExpectations.length; i++) {
	        printNewline();
	        print(colored('red', 'An error was thrown in an afterAll'));
	        printNewline();
	        print(colored('red', 'AfterAll ' + result.failedExpectations[i].message));
	
	      }
	      printNewline();
	    }
	  }
	
	  return ConsoleReporter;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map