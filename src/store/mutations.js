import * as types from './mutations-type.js'
export default {
  // 加1 这里操作要大写
  //  INCREMENT(state) {
  //      state.count++;
  //  },
   [types.TABHIDDEN] (state) {
     state.tabHidden = !state.tabHidden
   },
   [types.SELECTTAB] (state, value) {
     state.selectTab = value
   }

}
