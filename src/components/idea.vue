<template>
  <g>
    <ellipse
      :cx="idea.pos.cx" :cy="idea.pos.cy" rx="100" ry="50" fill="#D8F6CE" stroke="black" stroke-width="2"
      @mousedown.left="mouseDown" @dblclick.left="doubleClick"
    />
    <text :x="idea.pos.cx" :y="idea.pos.cy" text-anchor="middle" class="unselectable">{{ idea.text }}</text>
  </g>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  computed: {
    idea() {
      return this.getIdeaById(this.id)
    },
    ...mapGetters([
      'getIdeaById'
    ])
  },
  methods: {
    mouseDown(e) {
      this.$store.dispatch('setGrabbedIndex', { id: this.idea.id })
      this.$store.dispatch('setOffset', { x: e.pageX - this.idea.pos.cx, y: e.pageY - this.idea.pos.cy })
    },
    doubleClick() {
      const text = prompt('Input what you come up with.', this.idea.text)
      if (text !== null) {
        this.$store.dispatch('updateText', { id: this.idea.id, text })
      }
    }
  }
}
</script>

<style scoped>
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}
</style>
