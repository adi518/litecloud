// store.js
// https://coligo.io/learn-vuex-by-building-notes-app/

import Vue from 'vue'
import Vuex from 'vuex'

// Resources
import path from 'path'
import SC from 'soundcloud'

Vue.use(Vuex)

// Read `package.json`
import pjson from '~/package.json' // TODO: fix this resolve later

// Get Soundcloud API ready
SC.initialize({ client_id: 'd3cc13db45cba4f1ff6846dc46b0ef8a' })

// the root, initial state object
const state = {
  version: pjson.version,
  test: true,
  testKeyword: 'alle farben',
  keyupDebounceDelay: 500,
  loaderDelay: 1500,
  grid: true,
  clientId: 'd3cc13db45cba4f1ff6846dc46b0ef8a',
  truncatedTitleLength: 20,
  played: [],
  queryOptions: {
    limit: 50
  }
}

// define the possible mutations that can be applied to our state
const mutations = {
  GET_TRACKS(state) {
    const newNote = {
      text: 'New note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export const store = new Vuex.Store({
  state,
  mutations
})

// getTracks(query, offset, options) {
//   options = options || {}
//   var fetch
//   if (offset) {
//     fetch = $.get(query)
//   } else {
//     // geo filtering
//     // US 37.0902° N, 95.7129° W
//     // EU 54.5260° N, 15.2551° W
//     // https://developers.soundcloud.com/docs/api/reference#tracks
//     var queryURI = '/tracks?tag_list=geo:lat=54.5260%20geo:lon=15.2551&' + $.param($.extend({}, cache.queryOptions, {
//       q: query,
//       linked_partitioning: true
//     }))
//     cache.query = []
//     cache.query.push(queryURI)
//     fetch = SC.get(queryURI)
//   }
//   fetch.then(function (response) {
//     cache.response = response
//     // new search?
//     if (!cache.tracks || options.new) {
//       cache.$main.scrollTop(0)
//       cache.offset = 0
//       cache.tracks = []
//     }
//     if (response.collection.length) {
//       cache.tracks = cache.tracks.concat(response.collection)
//       // is partitioned response?
//       // https://developers.soundcloud.com/blog/offset-pagination-deprecated
//       if (response.next_href) {
//         cache.query.push(response.next_href)
//       }
//     }
//     drawItems(response.collection || [], {
//       append: offset || false
//     })
//   })
// }
