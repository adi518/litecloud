// https://coligo.io/learn-vuex-by-building-notes-app/
// https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats

// Core
import Vue from 'vue'
import Vuex from 'vuex'

// Resources
import { version } from '~/package.json'
import { log, isDev, param } from '@/utils'
import path from 'path'
import xhr from 'axios'
import vendor from 'soundcloud'

Vue.use(Vuex)

// State
const state = {
  isDev,
  // Meta-data
  version,
  test: true,
  grid: true,
  loaderDelay: 1500,
  searchDebounceDelay: 500,
  truncatedTitleLength: 20,
  // Data
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

// Initialize Vendor API
vendor.initialize({
  client_id: state.vendor.clientId
})

// define the possible mutations that can be applied to our state
const mutations = {
  SET_TRACKS(state) {
    console.log(state.tracks)
  }
}

const actions = {
  GET_TRACKS({ state, commit }, payload) {
    payload = payload || {}
    let queryURI
    if (payload.offset) {
      queryURI = payload.query
    } else {
      // https://github.com/mzabriskie/axios/issues/350#issuecomment-227270046
      const params = param(Object.assign({}, state.vendor.queryDefaults, {
        q: payload.query,
        linked_partitioning: true,
        // geo filtering
        // US 37.0902° N, 95.7129° W
        // EU 54.5260° N, 15.2551° W
        // https://developers.soundcloud.com/docs/api/reference#tracks
        tag_list: 'geo:lat=54.5260%20geo:lon=15.2551?format=json'
      }))
      queryURI = `https://api.soundcloud.com/tracks?${params}` // a redundant reference to ease debugging
      state.query = [].concat(queryURI)
    }
    xhr.get(queryURI).then(function ({ data }) {
      // new search?
      if (!state.tracks || payload.new) {
        // state.$main.scrollTop(0) // TODO: make reactive
        state.offset = 0
        state.tracks = []
      }
      if (data.collection.length) {
        state.tracks = state.tracks.concat(data.collection)
        // is partitioned response?
        // https://developers.soundcloud.com/blog/offset-pagination-deprecated
        if (data.next_href) {
          state.query.push(data.next_href)
        }
      }
    })
  },
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
