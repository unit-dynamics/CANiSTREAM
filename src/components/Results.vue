<template lang="jade">
  section.results-section
    .searching(v-show="searching === true" transition="fade")
      .pacman
      .dot

    .results(v-show="showInfo.length === 0 && searching === false" transition="fade")
      h1 Maybe Try Blockbuster....

    .show-card(v-for="show in showInfo")
      img(:src='show.img')
      h1{{ show.title }}
      h3 Streaming on <span v-for="provider in show.providers"> {{ provider}} </span>
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
.results-section
  // background-color: #5F5E5E
  position: relative
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  color: rgba(255,255,255,0.5)
  padding: 20px 0

.searching, .results
  position: absolute
  width: 100%
  height: 770px
  min-height: 100%
  top: 0
  left: 0
  background-color: #5F5E5E
  z-index: 10

.results h1
  margin-top: 100px
  font-size: 3rem

.show-card
  float: left
  padding: 1px
  margin: 20px 10px
  box-shadow: 0px 0px 17px rgba(0,0,0,0.6)
  border-radius: 5px
  background-color: rgba(0,0,0,0.44)

  img
    width: 100%

h1
  color: #41B883
  margin: 9px

// CSS Loader Animation

$width: 100px
$height: $width / 2
$amber: #FFC107
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
  background: $amber
  width: $width
  height: $height
  left: 50%
  top: 50%
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
  top: 50%
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
