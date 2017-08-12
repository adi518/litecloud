// https://stackoverflow.com/questions/41297829/creating-an-npm-package-that-enables-es6-imports-to-cherry-pick-exports
const Utils = {
  log(entity) {
    console.log(entity)
  },
  param(data) {
    // https://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters
    return Object.keys(data).map((i) => i + '=' + data[i]).join('&')
  },
  isDev() {
    return process.env.NODE_ENV === 'development'
  }
}

export default Utils

// Cherry picking
export const log = Utils.log
export const param = Utils.param
export const isDev = Utils.param

