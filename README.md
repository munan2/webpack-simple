# 实现一个简易的webpack

- 理解webpack打包流程
- 分析模块之间的依赖图谱



## 简单分析
简单例子：
在生产环境打包出来的代码是：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/537312/1601257086813-318be3fa-a178-4172-8753-e078faa5676f.png#align=left&display=inline&height=342&margin=%5Bobject%20Object%5D&name=image.png&originHeight=342&originWidth=1502&size=48033&status=done&style=none&width=1502)
一个立即执行函数。


看一眼这个立即执行函数的参数，是一个对象。这个对象是key-v结构
```javascript
{

/***/ "./src/calculator.js":
/*!***************************!*\
  !*** ./src/calculator.js ***!
  \***************************/
/*! exports provided: add, reduce, multy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduce\", function() { return reduce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"multy\", function() { return multy; });\n/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contants */ \"./src/contants.js\");\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:31:44\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:45:13\n */ \n\n\nconst add = (a, b) => {\n  return a + b\n}\n\nconst reduce = (a, b) => {\n  return a - b\n}\n\nconst multy = (a, b = _contants__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_DATA\"]) => {\n  return a * b\n}\n\n\n\n\n//# sourceURL=webpack:///./src/calculator.js?");

/***/ }),

/***/ "./src/contants.js":
/*!*************************!*\
  !*** ./src/contants.js ***!
  \*************************/
/*! exports provided: DEFAULT_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_DATA\", function() { return DEFAULT_DATA; });\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:32:06\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:45:22\n */\nconst DEFAULT_DATA = 1\n\n\n//# sourceURL=webpack:///./src/contants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ \"./src/calculator.js\");\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:30:59\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:41:39\n */\n\nconst a = Object(_calculator__WEBPACK_IMPORTED_MODULE_0__[\"multy\"])(10, 2)\nconst b = Object(_calculator__WEBPACK_IMPORTED_MODULE_0__[\"multy\"])(30)\nconst res = Object(_calculator__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(a, b)\nconsole.log('res', res)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ }
```
其中，key 是文件路径，value 都是一个function
```javascript
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduce\", function() { return reduce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"multy\", function() { return multy; });\n/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contants */ \"./src/contants.js\");\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:31:44\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:45:13\n */ \n\n\nconst add = (a, b) => {\n  return a + b\n}\n\nconst reduce = (a, b) => {\n  return a - b\n}\n\nconst multy = (a, b = _contants__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_DATA\"]) => {\n  return a * b\n}\n\n\n\n\n//# sourceURL=webpack:///./src/calculator.js?");

/***/ })
```
这个function内传入有三个形参，**module，****__webpack_exports__，__webpack_require__**


看立即执行函数的函数体内是什么
```javascript
function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ }
```
简单看一下：
首先定义了一个__webpack_require__ 函数，且在84行可以看出，这个函数最后__webpack_require__(__webpack_require__.s = "./src/index.js"); 大概就是require了入口文件
第一眼只能看到这里了，，，剩下的得边做边分析了


## 正式开始
### 实现前要
首先我们如果需要实现一个简易的webpack，我们需要做的是：

- 读取配置webpack.config.js，
   - 找到入口模块
- 入口分析
   - 分析依赖模块
   - 分析内容（对入口文件内容做处理）
   - 编译内容
- 依赖模块分析
   - 分析依赖模块
   - 分析内容
   - 编译内容



### 实现步骤
入口文件webpack/index.js：
```javascript
const options = require('../webpack.config')
const webpack = require('./lib/webpack')
new webpack(options).run()
```
**中头菜：**实现一个构造函数Webpack

#### 入口文件解析 parser方法

1. 读取入口文件内容
1. 使用@babel/parser去获取文件内容的ast结构
1. 使用@babel/traverse去遍历ast结构，获取其中文件依赖，将文件依赖存在dependencies中
1. 使用@babel/core 编译内容，获取最终文件内容（这里会有一些处理：比如import转为require等）
```javascript
parser (entryFile) {
  const content = fs.readFileSync(entryFile, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const { source: {value} } = node
      const newPathName = './' + path.join(path.dirname(entryFile), value)
      dependencies[value] = newPathName
    }
  })
  //! 处理内容 转换ast
  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });
  return {
    entryFile,
    code,
    dependencies
  }
}
```
#### 读取依赖文件 run方法
this.modules 存储所有的模块文件。读取到modules内存在dependencies，解析dependencies文件
```javascript
run () {
  // 分析入口文件
  const info = this.parser(this.entry)
  this.modules.push(info)
  for (let i = 0; i < this.modules.length; i++) {
    const { dependencies } = this.modules[i]
    if (dependencies) {
      for (let j in dependencies) {
        this.modules.push(this.parser(dependencies[j]))
      }
    }
  }
	// 还记得我们前面看使用webpack打包后的bundle.js的代码里的参数不，是key-value结构，所以这里对他进行一个转换
  let obj = {}
  this.modules.forEach(item => {
    obj[item.entryFile] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
}
```
最终得到，obj的结构是：
```javascript
{ './src/index.js':
   { dependencies: { './calculator.js': './src/calculator.js' },
     code: '"use strict";\n\nvar _calculator = require("./calculator.js");\n\nvar a = (0, _calculator.multy)(30, 2);\nvar b = (0, _calculator.multy)(40);\nvar res = (0, _calculator.add)(a, b);\nconsole.log(\'res\', res);' },
  './src/calculator.js':
   { dependencies: { './contants.js': './src/contants.js' },
     code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.multy = exports.reduce = exports.add = void 0;\n\nvar _contants = require("./contants.js");\n\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:31:44\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-28 11:47:21\n */\nvar add = function add(a, b) {\n  return a + b;\n};\n\nexports.add = add;\n\nvar reduce = function reduce(a, b) {\n  return a - b;\n};\n\nexports.reduce = reduce;\n\nvar multy = function multy(a) {\n  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _contants.DEFAULT_DATA;\n  return a * b;\n};\n\nexports.multy = multy;' },
  './src/contants.js':
   { dependencies: {},
     code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.DEFAULT_DATA = void 0;\n\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:32:06\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:45:22\n */\nvar DEFAULT_DATA = 1;\nexports.DEFAULT_DATA = DEFAULT_DATA;' }
}
```
#### 写入dist目录 file方法
首先我们确定code的内容就是对应文件的最终代码，code里有require和exports方法，我们如果想要执行eval(code)
所以，这里最后写入sidt的bundle文件里添加requrie 和exports方法。最后一个写入文件方法
```javascript
// modules是key-value结构
file(modules) {
  const filePath = path.join(this.output.path, this.output.filename)
  const content = `(function(graph){
		function require (module) {
			// 注意，这里一个文件A内部的依赖文件B的路径是相对这个文件A而言的，但是我们传进来的key-value结构
			// 传的是相对入口文件而言的路径，需要根据module.dependencies根据relativePath拿到真实path
			function localRequire(relativePath) {
				return require( graph[module].dependencies[relativePath])
			}
			var exports = {};
			(function(require, exports, code){
				eval(code);
			})(localRequire, exports, graph[module].code)
		}
		require('${this.entry}');
		return exports;
	})(${Object.keys(modules)})`
  fs.writeFileSync(filePath, content, 'utf-8')
}
```


