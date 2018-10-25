<template>
  <div :style="containerStyle">
    <!-- A -->
    <div :style="[horizontalSegmentStyle, onoff('a')]"></div>
    <div :style="verticalSegmentContainerStyle">
      <!-- F -->
      <div :style="[verticalSegmentStyle, { left: '0px' }, onoff('f')]"></div>
      <!-- B -->
      <div :style="[verticalSegmentStyle, { right: '0px' }, onoff('b')]"></div>
    </div>
    <!-- G -->
    <div :style="[horizontalSegmentStyle, onoff('g')]"></div>
    <div :style="verticalSegmentContainerStyle">
      <!-- E -->
      <div :style="[verticalSegmentStyle, { left: '0px' }, onoff('e')]"></div>
      <!-- C  -->
      <div :style="[verticalSegmentStyle, { right: '0px' }, onoff('c')]"></div>
    </div>
    <!-- D -->
    <div :style="[horizontalSegmentStyle, onoff('d')]"></div>
  </div>
</template>

<script>
import get from "lodash.get";
import assign from "lodash.assign";

const DEFAULT_SEGMENT_MAP = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: false
};

const SEGMENT_MAP = {
  "0": { a: true, b: true, c: true, d: true, e: true, f: true, g: false },
  "1": { a: false, b: true, c: true, d: false, e: false, f: false, g: false },
  "2": { a: true, b: true, c: false, d: true, e: true, f: false, g: true },
  "3": { a: true, b: true, c: true, d: true, e: false, f: false, g: true },
  "4": { a: false, b: true, c: true, d: false, e: false, f: true, g: true },
  "5": { a: true, b: false, c: true, d: true, e: false, f: true, g: true },
  "6": { a: true, b: false, c: true, d: true, e: true, f: true, g: true },
  "7": { a: true, b: true, c: true, d: false, e: false, f: false, g: false },
  "8": { a: true, b: true, c: true, d: true, e: true, f: true, g: true },
  "9": { a: true, b: true, c: true, d: true, e: false, f: true, g: true }
};

export default {
  props: {
    value: {
      type: String,
      default: "8"
    },
    segmentWidth: {
      type: Number,
      default: 25
    },
    segmentHeight: {
      type: Number,
      default: 5
    },
    onColor: {
      type: String,
      default: "#f00"
    },
    offColor: {
      type: String,
      default: "transparent"
    }
  },

  computed: {
    containerWidth: function() {
      return this.segmentWidth + this.segmentHeight * 2;
    },

    containerHeight: function() {
      return this.segmentWidth * 2 + this.segmentHeight * 3;
    },

    containerStyle: function() {
      return {
        position: "relative",
        display: "inline-block",
        width: `${this.containerWidth}px`,
        height: `${this.containerHeight}px`
      };
    },

    horizontalSegmentStyle: function() {
      return {
        borderRadius: `${this.segmentHeight}px`,
        width: `${this.segmentWidth}px`,
        height: `${this.segmentHeight}px`,
        margin: "0 auto"
      };
    },

    verticalSegmentContainerStyle: function() {
      return {
        position: "relative",
        width: "100%",
        height: `${this.segmentWidth}px`
      };
    },

    verticalSegmentStyle: function() {
      return {
        position: "absolute",
        borderRadius: `${this.segmentWidth}px`,
        width: `${this.segmentHeight}px`,
        height: "100%"
      };
    },

    map: function() {
      return assign(
        DEFAULT_SEGMENT_MAP,
        get(SEGMENT_MAP, this.value.toString().toLowerCase(), {})
      );
    }
  },

  methods: {
    onoff: function(segmentName) {
      return {
        backgroundColor: this.map[segmentName] ? this.onColor : this.offColor
      };
    }
  }
};
</script>