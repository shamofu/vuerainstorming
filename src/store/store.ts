import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    grabbedIndex: null,
    offset: { x: null, y: null },
    ideas: [
      { id: 0, text: 'Theme 1', dependency: [], pos: { cx: 200, cy: 100 } },
      { id: 1, text: 'Theme 2', dependency: [0], pos: { cx: 600, cy: 100 } }
    ]
  },
  getters: {
    getIdeaById: (state) => (id) => {
      return state.ideas.find((obj) => obj.id === id)
    },
    getAvailableId: (state, getters) => {
      for (let i = 1; i <= 2000; i++) {
        if (!getters.getIdeaById(i)) {
          return i
        }
      }
      return null
    }
  },
  mutations: {
    addIdea(state, payload) {
      state.ideas.push({
        id: payload.id,
        text: payload.text,
        dependency: payload.dependency,
        pos: { cx: 0, cy: 0 }
      })
    },
    resetGrabbedIndex(state) {
      state.grabbedIndex = null
    },
    setGrabbedIndex(state, payload) {
      state.grabbedIndex = payload.id
    },
    setOffset(state, payload) {
      state.offset = { x: payload.x, y: payload.y }
    },
    resetOffset(state) {
      state.offset = { x: null, y: null }
    },
    updatePos(state, payload) {
      state.ideas.forEach((obj, i) => {
        if (obj.id === state.grabbedIndex) {
          state.ideas[i].pos = { cx: payload.cx, cy: payload.cy }
        }
      })
    },
    updateText(state, payload) {
      state.ideas.forEach((obj, i) => {
        if (obj.id === payload.id) {
          state.ideas[i].text = payload.text
        }
      })
    }
  },
  actions: {
    addIdea(context, payload) {
      const id = context.getters.getAvailableId()
      if (id !== null) {
        context.commit('addIdea', {
          id,
          text: payload.text,
          forwardId: payload.forwardId,
          backwardId: payload.backwardId
        })
      }
    },
    resetGrabbedIndex(context) {
      context.commit('resetGrabbedIndex')
    },
    setGrabbedIndex(context, payload) {
      context.commit('setGrabbedIndex', { id: payload.id })
    },
    setOffset(context, payload) {
      context.commit('setOffset', { x: payload.x, y: payload.y })
    },
    resetOffset(context) {
      context.commit('resetOffset')
    },
    updatePos(context, payload) {
      context.commit('updatePos', { cx: payload.cx, cy: payload.cy })
    },
    updateText(context, payload) {
      context.commit('updateText', { id: payload.id, text: payload.text })
    }
  }
})
