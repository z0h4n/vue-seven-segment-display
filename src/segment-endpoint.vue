<template>
  <div :class="[classes.main, classes[type]]" :style="{borderWidth: `${size}px`}"/>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
      required: true
    },
    size: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      classes: {
        main: "segment-endpoint",
        left: "is-on-left",
        right: "is-on-right",
        top: "is-on-top",
        bottom: "is-on-bottom"
      }
    };
  }
};
</script>

<style scoped>
.segment-endpoint {
  width: 0px;
  height: 0px;
  position: absolute;
  border-color: inherit;
  border-style: solid;
}

.is-on-left {
  right: 100%;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
}

.is-on-right {
  left: 100%;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
}

.is-on-top {
  bottom: 100%;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
}

.is-on-bottom {
  top: 100%;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
}
</style>