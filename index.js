import SevenSegment from './SevenSegmentDisplay.vue';

const plugin = {
  install(Vue) {
    Vue.component('seven-segment', SevenSegment);
  }
}

export default plugin;