// https://coligo.io/learn-vuex-by-building-notes-app/
// https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats

// Core
import Vue from 'vue'
import Vuex from 'vuex'

// Resources
import { version } from '~/package.json'
import { isDev, stripTags, msToHMS } from '@/utils'
import Vendor from 'soundcloud'

import * as actions from './actions'

Vue.use(Vuex)

// State
const state = {
  // Meta-data
  version,
  test: true,
  grid: true,
  loaderDelay: 1500,
  searchDebounceDelay: 500,
  truncatedTitleLength: 20,
  // Data
  keyword: null,
  tracks: [],
  played: [],
  offset: null,
  // Vendor
  vendor: {
    clientId: 'd3cc13db45cba4f1ff6846dc46b0ef8a',
    queryDefaults: {
      limit: 50
    },
  }
}

if (isDev) {
  state.keyword = 'tash sultana'
}

state.vendor.queryDefaults.client_id = state.vendor.clientId

// TODO:
Vendor.initialize({
  client_id: state.vendor.clientId
})

const splitTrackTitle = title => {
  let split = title.split('-')
  return {
    artist: split[0] || '',
    title: split[1] || ''
  }
}

const getters = {
  tracks: state => {
    const tracks = state.tracks.map(track => {
      track.isPlaying = false
      if (!track.custom) {
        track.custom = splitTrackTitle(stripTags(track.title))
      }
      return track
    })
    state.tracks = tracks
    return state.tracks
  },
  keyword: state => {
    return state.keyword
  }
}

const mutations = {
  KEYWORD: (state, payload) => {
    state.keyword = payload
  },
  OFFSET: (state, payload) => {
    state.offset = payload
  },
  TRACKS: (state, payload) => {
    // new search?
    if (!state.tracks || !state.offset) {
      // state.$main.scrollTop(0) // TODO: make reactive
      state.offset = null
      state.tracks = []
      state.query = [].concat(payload.queryURI)
    }
    if (payload.data.collection.length) {
      state.tracks = state.tracks.concat(payload.data.collection)
      // is partitioned response?
      // https://developers.soundcloud.com/blog/offset-pagination-deprecated
      if (payload.data.next_href) {
        state.query.push(payload.data.next_href)
      }
    }
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
