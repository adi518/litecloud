// https://stackoverflow.com/questions/41297829/creating-an-npm-package-that-enables-es6-imports-to-cherry-pick-exports
// Resources
import $ from 'jquery-slim'
import striptags from 'striptags'

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
  },
  pad(val) {
    return ('0' + val).slice(-2)
  },
  msToHMS(ms) {
    var seconds = ms / 1000
    var hours = parseInt(seconds / 3600, 10)
    if (hours && hours < 9) {
      pad(hours)
    }
    seconds = seconds % 3600
    var minutes = parseInt(seconds / 60, 10)
    if (minutes) {
      if (minutes < 9) {
        pad(minutes)
      }
    } else {
      minutes = '00'
    }
    seconds = Math.floor(seconds % 60)
    if (seconds < 10) {
      seconds = pad(seconds)
    } else if (seconds < 1) {
      seconds = '00'
    }
    return (hours
      ? (hours + ':')
      : '') + minutes + ':' + seconds
  },
  stripTags(tags) {
    return striptags(tags)
  },
  onScrolled(el) {
    return new Promise(function (resolve) {
      const $el = $(el)
      const scrollPosition = parseInt($el.scrollTop() + $el.outerHeight(), 10)
      let totalHeight = 0
      totalHeight += el.scrollHeight
      totalHeight += parseInt($el.css('padding-top'), 10)
      totalHeight += parseInt($el.css('padding-bottom'), 10)
      totalHeight += parseInt($el.css('border-top-width'), 10)
      totalHeight += parseInt($el.css('border-bottom-width'), 10)
      if (scrollPosition === totalHeight) {
        resolve()
      }
    })
  },
  isScrolled(el) {
    return el.scrollTop + el.clientHeight === el.scrollHeight
  }
}

export default Utils

// Cherry picking
export const log = Utils.log
export const param = Utils.param
export const isDev = Utils.param
export const pad = Utils.pad
export const msToHMS = Utils.msToHMS
export const stripTags = Utils.stripTags
export const onScrolled = Utils.onScrolled
export const isScrolled = Utils.isScrolled

