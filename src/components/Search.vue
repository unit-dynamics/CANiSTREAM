<template lang="jade">
  // Search Section
  section.search
    //- img(class="logo" src="../assets/logo.png")
    h1.title CAN<span>i</span>STREAM
    form
      input(type="text" placeholder="Enter Title..." v-model="search")
      button.btn-search(v-on:click.prevent="startSearch") Search
      <br>
      input(type="radio" id="show" value="show" v-model="type")
      label.radio-btn(for="show") TV Show
      input(type="radio" id="movie" value="movie" checked="checked" v-model="type")
      label.radio-btn(for="movie") Movie

  // Results Section
  results(:show-info="showInfo" v-bind:searching="searching")
</template>

<script>
import search from './async-guidebox-api'
import Results from './Results'
/*eslint-disable */

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      search: '',
      type: '',
      showInfo: [],
      searching: undefined
    }
  },
  components: {
    Results
  },
  methods: {
    startSearch: function () {
      this.searching = true
      let searchPromise = search.queryGuideBoxFuzzy(this.search, this.type)

      searchPromise
        .then((x) => { return search.createIdArray(x, this.type) })
        .then((x) => search.queryGuideBoxId(x)
          .then((x) => {this.showInfo = search.providerFilter(x)} )
          .then(() => this.searching = false)
          .catch(() => { this.searching = undefined, this.showInfo = [],  alert('Something went wront. Please double check the spelling') }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="sass">
.search
  padding: 8px 0
  background-color: #000
  color: #FFF
  width: 100%

  .title
    font-size: 2.4rem
    margin: 0px
    color: #42b983

    span
      color: #D2D2D2

  .radio-btn
    display: inline-block
    width: 28%
    max-width: 427px
    padding: 6px 0
    height: 19px
    background-color: #383838
    color: #999999
    font-weight: bold
    margin: 0 4px
    position: relative
    cursor: pointer
    transition: all 0.3s ease-in-out
    
    // Ipad and smaller
    @media (max-width: 1204px)
      width: 47%
      max-width: none

    &:after
      position: absolute
      content: ''
      width: 76%
      height: 2px
      background-color: rgba(243, 243, 243, 0.53)
      bottom: 5px
      left: 50%
      margin-left: -39%
      transition: all 0.3s ease-in-out

  input[type="radio"]
    display: none

  input
    font-size: 1.3rem
    margin-bottom: 8px

    &:checked + .radio-btn
       color: #D2D2D2

    &:checked + .radio-btn:after
       background-color: #41B883

  .btn-search
    cursor: pointer
    font-size: 1.3rem
    color: #FFF
    background-color: #5F5E5E
    border: solid 2px #5F5E5E
    &:hover, &:focus
      outline: none
      background-color: #717171
      border: solid 2px #717171
</style>
