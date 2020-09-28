/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-28 09:54:38
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-28 14:15:22
 */
const options = require('../webpack.config')
const webpack = require('./lib/webpack')
new webpack(options).run()