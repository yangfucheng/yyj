import * as types from './mutations-type.js'
export default {
  // increment({commit}){
  //       commit("INCREMENT")
  //   },
  tabHidden ({commit}) {
    commit(types.TABHIDDEN)
  },

  selectTab ({commit}, value) {
    commit(types.SELECTTAB, value)
  }

}
