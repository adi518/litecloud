<template lang="pug">
input(id="search" placeholder="..." @keyup="debounceOnKeyup")
</template>

<script>
// https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
import axios from 'axios'
import debounce from 'lodash.debounce'
// import $ from 'jquery' // get rid of it later

var cache = {}

export default {
  props: {
    delay: {
      type: Number,
      default: 500
    }
  },
  data() {
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
      // dispatch an action here
      // this.getTracks(this.query, null, {
      //   new: true
      // })
    },
  }
}
</script>