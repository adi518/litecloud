<template lang="pug">
input#search(placeholder="..." v-model="keyword")
</template>

<script>
// https://jsfiddle.net/9b62g07k/
// https://www.webpackbin.com/bins/-KqoXc43ubNhc4Aun2YZ
// https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
// https://stackoverflow.com/questions/42260233/vue-js-difference-between-v-model-and-vbind
// https://stackoverflow.com/questions/24306290/lodash-debounce-not-working-in-anonymous-function
import { isDev } from '@/utils'
import debounce from 'lodash.debounce'

export default {
  mounted() {
    if (isDev) {
      this.keyword = this.$store.state.keyword
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  props: {
    delay: {
      type: Number,
      default() {
        return this.$store.state.searchDebounceDelay
      }
    }
  },
  computed: {
    debounce() {
      return debounce(this.search, this.delay)
    }
  },
  methods: {
    search(keyword, oldKeyword) {
      // avoid unnecessary requests
      if (!keyword || keyword === oldKeyword) {
        return
      }
      this.$store.commit('KEYWORD', keyword)
      this.$store.dispatch('GET_TRACKS', keyword)
    },
  },
  watch: {
    keyword() {
      return this.debounce.apply(this, arguments)
    }
  }
}
</script>