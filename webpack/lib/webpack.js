/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-28 09:53:25
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-28 17:58:32
 */
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const path = require('path')
const { transformFromAst } = require("@babel/core");
class Webpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }
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
    let obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    this.file(obj)
  }
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
  file (code) {
    // 生成bundle.js => ./dist/main.js
    const filePath = path.join(this.output.path, this.output.filename)
    const content = `(function (graph) {
      // 拿到了一个key-value结构的对象
      function require(module) {
        function localRequire (relativePath) {
          console.log(dependencies)
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code)
        return exports
      }
      // 第一步引入入口文件
      require('${this.entry}')
    })(${JSON.stringify(code)})`
    fs.writeFile(filePath, content, 'utf-8')
  }
}
module.exports = Webpack