import React from 'react'

/**
 * Runs a series of functions from left to right, passing in the argument of the
 *    invokee to each function
 * @param { function[] } fns - Arguments of functions
 */

export function callAll(...fns: any[]) {
  return (...args: any[]) =>
    fns.forEach((fn) => typeof fn === 'function' && fn(...args))
}

/**
 * Composes a series of functions from right to left, passing in the result of each function to
 *    the next function in the pipeline
 * @param { function[] } fns - Arguments of functions
 */

export function compose(...fns: Function[]) {
  return (args?: any) => {
    return fns.reduceRight(
      (acc, fn) => (typeof fn === 'function' ? fn(acc) : acc),
      args,
    )
  }
}

/**
 * Prints data to the console (colors are supported)
 * @param { string } msg - Console message
 */
export function log(msg: any, style?: any, obj?: any) {
  let args = [`%c${msg}`]
  if (msg && typeof msg === 'object') {
    const options = msg
    args = [`%c${options.msg}`]
    let str = 'font-weight:bold;'
    if (options.color) str += `color:${options.color};`
    args.push(str)
    if (options.data) args.push(options.data)
  } else {
    if (style) {
      if (typeof style === 'string') {
        args.push(style)
      } else {
        let str = 'font-weight:bold;'
        if (style.color) str += `color:${style.color};`
        args.push(str)
      }
    }
    if (obj) args.push(obj)
  }
  console.log(...args)
}

/**
 * Converts a decimal value to a whole number. Strings will be converted to a number type
 * @param { number | string } value - Number value to convert
 */
export function decimalToWhole(value: any) {
  return Number(value) * 100
}

/**
 * Used to highlight elements that its attached to like red borders, etc
 * @param { object } options - Object of html style attributes
 */
export function getDebugStyles(options?: React.CSSProperties) {
  return {}
  // return { border: '1px solid red', ...options }
}

/**
 * Returns true if there is a decimal in the number.
 * @param { number } value - Value to evaluate
 */
export function hasDecimal(value: any): boolean {
  return Number(value) % 1 !== 0
}

/**
 * Returns true if there is any letter in the string
 * @param { string } value - Value to evaluate
 */
export function hasLetter(value: any): boolean {
  return /[a-zA-Z]/i.test(String(value))
}

/**
 * Returns true if we are in the browser environment
 */
export function isBrowser() {
  return typeof window !== 'undefined'
}
