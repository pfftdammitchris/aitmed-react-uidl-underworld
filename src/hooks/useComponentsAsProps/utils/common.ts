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
 * Converts a decimal value to a whole number. Strings will be converted to a number type
 * @param { number | string } value - Number value to convert
 */
export function decimalToWhole(value: any) {
  return Number(value) * 100
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
 * Creates an object composed of the own and inherited enumerable properties of
 * object that are not omitted.
 * @param { object } obj - An object
 * @param { string | string[] } omittedKeys - Key(s) to omit from the obj
 */
export function omit(obj: any, omittedKeys: string | string[]) {
  const result = {}
  if (obj && !Array.isArray(obj) && typeof obj === 'object') {
    Object.keys(obj).forEach((key: string) => {
      if (typeof omittedKeys === 'string') {
        if (key !== omittedKeys) result[key] = obj[key]
      } else if (Array.isArray(omittedKeys)) {
        if (!omittedKeys.includes(key)) {
          result[key] = obj[key]
        }
      }
    })
    return result
  }
  return obj
}

/**
 * Returns a ratio (in pixels) computed from a total given viewport size
 * @param { number } viewportSize - Size (in pixels) in the viewport (represents width or height)
 * @param { string | number } size - Size (raw decimal value from UIDL response) most likely in decimals. Strings are converted to numbers to evaluate the value. Numbers that aren't decimals are used as a fraction of the viewport size.
 */
export function getViewportRatio(viewportSize: number, size: string | number) {
  if (typeof size === 'string') {
    // if has letter, check for unit
    if (hasLetter(size)) {
      log({
        msg:
          'The value of "size" could not be computed correctly because handling these types is not supported yet. Defaulting to full viewport',
      })
    }
    if (hasDecimal(size)) {
      return viewportSize * Number(size)
    } else {
      return viewportSize / Number(size)
    }
  } else if (typeof size === 'number') {
    if (hasDecimal(size)) {
      return viewportSize * Number(size)
    } else {
      return viewportSize / Number(size)
    }
  }
  return viewportSize
}
