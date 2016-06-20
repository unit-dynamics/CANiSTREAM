<template lang="jade">
  section.results
    .searching(v-show="searching === true" transition="fade")
      .pacman
      .dot

    .not-found(v-show="showInfo.length === 0 && searching === false" transition="fade")
      h1 Maybe Try Blockbuster....

    .show-card(v-for="show in showInfo")
      img.poster(:src='show.img')
      h1 {{ show.title }}
      h1(v-if="typeOf")
      .providers
        //- img(v-for="provider in show.providers" v-bind:src="'http://localhost:8002/' + provider + '.svg'") // Local Server Testing
        img(v-for="provider in show.providers" v-bind:src="'images/' + provider + '.svg'")
</template>

<script>
/*eslint-disable */
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // showInfo: ''
      // props: ['showInfo']
    }
  },
  props: ['showInfo', 'searching']
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.results
  position: relative
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  color: rgba(255,255,255,0.5)
  padding: 20px 0

  // Ipad and smaller
  @media (max-width: 1204px)
    padding: 0 0

  .show-card
    float: left
    margin: 20px 10px
    box-shadow: 5px 5px 26px rgba(0, 0, 0, 0.68)
    border: solid 1px #000
    border-radius: 2px
    background-color: rgba(0,0,0,0.44)

    // Ipad and smaller
    @media (max-width: 1204px)
      margin: 10px 10px

    .poster
      width: 100%
      border-bottom: solid 1px #000
      box-sizing: border-box

    .providers
      display: flex
      justify-content: center
      margin: 0 0 7px

      img
        padding: 5px 10px
        height: 25px
        &:not(:first-child)
          border-left: solid 2px

  .searching, .not-found
    position: absolute
    width: 100%
    min-height: 100%
    top: 0
    left: 0
    background-color: #5F5E5E
    z-index: 10
    padding-top: 100px
    font-size: 3rem

    // Ipad and smaller
    @media (max-width: 1204px)
      font-size: 2rem

  h1
    color: #41B883
    margin: 5px

// CSS Loader Animation

$width: 100px
$height: $width / 2
$green: #41B883
$grey: #ccc
$time: 0.4s

=animation($name)
  @-webkit-keyframes #{$name}
    @content

  @-moz-keyframes #{$name}
    @content

  @-o-keyframes #{$name}
    @content

  @keyframes #{$name}
    @content

+animation(up)
  0%, 100%
    transform: rotate(0)

  50%
    transform: rotate(-30deg)


+animation(down)
  0%, 100%
    transform: rotate(0)

  50%
    transform: rotate(30deg)


+animation(r-to-l)
  100%
    margin-left: -1px


=use-animation($name, $time)
  -webkit-animation: $name $time infinite
  -moz-animation: $name $time infinite
  -o-animation: $name $time infinite
  animation: $name $time infinite


.pacman:before, .pacman:after
  content: ''
  position: absolute
  background: $green
  width: $width
  height: $height
  left: 50%
  top: 140px
  margin-left: -$width / 2
  margin-top: -$height
  border-radius: $height $height 0 0

  +use-animation(up, $time)

.pacman:after
  margin-top: -1px
  border-radius: 0 0 $height $height

  +use-animation(down, $time)

.dot
  position: absolute
  left: 50%
  top: 140px
  width: $height / 5
  height: $height / 5
  margin-top: -$height / 10
  margin-left: 30px
  border-radius: 50%
  background: $grey
  z-index: -1
  box-shadow: 30px 0 0 $grey, 60px 0 0 $grey, 90px 0 0 $grey, 120px 0 0 $grey, 150px 0 0 $grey

  +use-animation(r-to-l, $time)


// Animation Effects

.fade-transition
  opacity: 1
  transition: all 0.3s ease-in-out

.fade-enter
  opacity: 0

.fade-leave
  opacity: 0


</style>
