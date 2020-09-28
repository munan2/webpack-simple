/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-27 18:31:44
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-28 11:47:21
 */ 
import { DEFAULT_DATA } from './contants.js'

const add = (a, b) => {
  return a + b
}

const reduce = (a, b) => {
  return a - b
}

const multy = (a, b = DEFAULT_DATA) => {
  return a * b
}

export {
  add,
  reduce,
  multy
}
