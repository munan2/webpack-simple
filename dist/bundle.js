(function (graph) {
      // 拿到了一个key-value结构的对象
      function require(module) {
        var { code, dependencies } = graph[module]
        function localRequire (relativePath) {
          console.log(dependencies)
          return require(dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code){
            eval(code)
        })(localRequire, exports, code)
        return exports
      }
      // 第一步引入入口文件
      require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./calculator.js":"./src/calculator.js"},"code":"\"use strict\";\n\nvar _calculator = require(\"./calculator.js\");\n\nvar a = (0, _calculator.multy)(30, 2);\nvar b = (0, _calculator.multy)(40);\nvar res = (0, _calculator.add)(a, b);\nconsole.log('res', res);"},"./src/calculator.js":{"dependencies":{"./contants.js":"./src/contants.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.multy = exports.reduce = exports.add = void 0;\n\nvar _contants = require(\"./contants.js\");\n\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:31:44\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-28 11:47:21\n */\nvar add = function add(a, b) {\n  return a + b;\n};\n\nexports.add = add;\n\nvar reduce = function reduce(a, b) {\n  return a - b;\n};\n\nexports.reduce = reduce;\n\nvar multy = function multy(a) {\n  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _contants.DEFAULT_DATA;\n  return a * b;\n};\n\nexports.multy = multy;"},"./src/contants.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.DEFAULT_DATA = void 0;\n\n/*\n * @Description: \n * @Version: 2.0\n * @Autor: zhangyan\n * @Date: 2020-09-27 18:32:06\n * @LastEditors: zhangyan\n * @LastEditTime: 2020-09-27 18:45:22\n */\nvar DEFAULT_DATA = 1;\nexports.DEFAULT_DATA = DEFAULT_DATA;"}})