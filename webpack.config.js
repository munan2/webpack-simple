/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-27 18:41:49
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-28 11:56:26
 */
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development'
}