<template>
  <div width="100vw" height="100vh">
    <button @click.left="addIdea">Add idea</button>
    <button @click.left="removeIdea">Del idea</button>
    <svg
      xmlns="http://www.w3.org/2000/svg" width="100%" height="90%"
      @mouseup.left="mouseUp" @mousemove="mouseMove"
    >
      <g v-for="idea in ideas" :key="'arrow_' + idea.id">
        <line
          stroke="gray" :x1="idea.pos.cx" :y1="idea.pos.cy"
          :x2="getIdeaById(idea.dependency).pos.cx" :y2="getIdeaById(idea.dependency).pos.cy"
        />
      </g>
      <idea v-for="idea in ideas" :key="'idea_' + idea.id" :id="idea.id" />
    </svg>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import Idea from '../components/idea.vue'

export default {
  title: 'Vuerainstorming',
  components: {
    Idea
  },
  computed: { 
    ...mapState(['ideas']),
    ...mapGetters(['getIdeaById'])
  },
  methods: {
    mouseUp() {
      this.$store.dispatch('resetGrabbedIndex')
      this.$store.dispatch('resetOffset')
    },
    mouseMove(e) {
      if (
        this.$store.state.grabbedIndex !== null &&
        this.$store.state.offset.x !== null &&
        this.$store.state.offset.y !== null
      ) {
        this.$store.dispatch('updatePos', {
          cx: e.pageX - this.$store.state.offset.x,
          cy: e.pageY - this.$store.state.offset.y
        })
      }
    },
    addIdea() {
      const text = prompt('Input what you come up with.')
      if (text !== '') {
        const dependency = parseInt(prompt('Input parental ID.'))
        if (this.$store.getters.getIdeaById(dependency) !== null) {
          this.$store.dispatch('addIdea', {
            text,
            dependency
          })
        }
      }
    },
    removeIdea() {
      const id = parseInt(prompt('Input ID.'))
      if (this.$store.getters.getIdeaById(id) !== null) {
        this.$store.dispatch('removeIdea', {
          id
        })
      }
    }
  }
}
</script>
