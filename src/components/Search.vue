<template lang="pug">
input(id="search" placeholder="..." @keyup="debounceOnKeyup")
</template>

<script>
// https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
import axios from 'axios'
import debounce from 'lodash.debounce'
import SC from 'soundcloud'
import $ from 'jquery' // get rid of it later

SC.initialize({ client_id: 'd3cc13db45cba4f1ff6846dc46b0ef8a' })

var cache = {}

export default {
  props: {
    delay: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
			value: '',
			query: null,
			offset: null,
      tracks: null,
    }
  },
  computed: {
    debounceOnKeyup() {
      return debounce(this.onKeyup, this.delay)
    }
  },
  methods: {
    onKeyup(event) {
      // https://stackoverflow.com/questions/24306290/lodash-debounce-not-working-in-anonymous-function
      // https://www.webpackbin.com/bins/-KqoXc43ubNhc4Aun2YZ
      if (event.target.value === '') {
        return
      }
      // this.getTracks(this.query, null, {
      //   new: true
      // })
    },
    getTracks (query, offset, options) {
      options = options || {}
      var fetch
      if (offset) {
        fetch = $.get(query)
      } else {
        // geo filtering
        // US 37.0902° N, 95.7129° W
        // EU 54.5260° N, 15.2551° W
        // https://developers.soundcloud.com/docs/api/reference#tracks
        var queryURI = '/tracks?tag_list=geo:lat=54.5260%20geo:lon=15.2551&' + $.param($.extend({}, cache.queryOptions, {
          q: query,
          linked_partitioning: true
        }))
        cache.query = []
        cache.query.push(queryURI)
        fetch = SC.get(queryURI)
      }
      fetch.then(function (response) {
        cache.response = response
        // new search?
        if (!cache.tracks || options.new) {
          cache.$main.scrollTop(0)
          cache.offset = 0
          cache.tracks = []
        }
        if (response.collection.length) {
          cache.tracks = cache.tracks.concat(response.collection)
          // is partitioned response?
          // https://developers.soundcloud.com/blog/offset-pagination-deprecated
          if (response.next_href) {
            cache.query.push(response.next_href)
          }
        }
        console.log(cache)
        // drawItems(response.collection || [], {
        //   append: offset || false
        // })
      })
    }
  }
}
</script>