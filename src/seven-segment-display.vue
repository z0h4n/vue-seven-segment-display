<template>
  <div :style="containerStyle">
    <!-- A -->
    <div :style="[horizontalSegmentStyle, onoff('a')]">
      <template v-if="!rounded">
        <segment-endpoint type="left" :size="segmentHeight * 0.5" />
        <segment-endpoint type="right" :size="segmentHeight * 0.5" />
      </template>
    </div>
    <div :style="verticalSegmentContainerStyle">
      <!-- F -->
      <div :style="[verticalSegmentStyle, { left: '0px' }, onoff('f')]">
        <template v-if="!rounded">
          <segment-endpoint type="top" :size="segmentHeight * 0.5" />
          <segment-endpoint type="bottom" :size="segmentHeight * 0.5" />
        </template>
      </div>
      <!-- B -->
      <div :style="[verticalSegmentStyle, { right: '0px' }, onoff('b')]">
        <template v-if="!rounded">
          <segment-endpoint type="top" :size="segmentHeight * 0.5" />
          <segment-endpoint type="bottom" :size="segmentHeight * 0.5" />
        </template>
      </div>
    </div>
    <!-- G -->
    <div :style="[horizontalSegmentStyle, onoff('g')]">
      <template v-if="!rounded">
        <segment-endpoint type="left" :size="segmentHeight * 0.5" />
        <segment-endpoint type="right" :size="segmentHeight * 0.5" />
      </template>
    </div>
    <div :style="verticalSegmentContainerStyle">
      <!-- E -->
      <div :style="[verticalSegmentStyle, { left: '0px' }, onoff('e')]">
        <template v-if="!rounded">
          <segment-endpoint type="top" :size="segmentHeight * 0.5" />
          <segment-endpoint type="bottom" :size="segmentHeight * 0.5" />
        </template>
      </div>
      <!-- C  -->
      <div :style="[verticalSegmentStyle, { right: '0px' }, onoff('c')]">
        <template v-if="!rounded">
          <segment-endpoint type="top" :size="segmentHeight * 0.5" />
          <segment-endpoint type="bottom" :size="segmentHeight * 0.5" />
        </template>
      </div>
    </div>
    <!-- D -->
    <div :style="[horizontalSegmentStyle, onoff('d')]">
      <template v-if="!rounded">
        <segment-endpoint type="left" :size="segmentHeight * 0.5" />
        <segment-endpoint type="right" :size="segmentHeight * 0.5" />
      </template>
    </div>
  </div>
</template>

<script>
import segmentEndpoint from "./segment-endpoint.vue";

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
  components: { "segment-endpoint": segmentEndpoint },
  props: {
    value: {
      type: [String, Number],
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
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    containerWidth() {
      return this.segmentWidth + this.segmentHeight * 2;
    },

    containerHeight() {
      return this.segmentWidth * 2 + this.segmentHeight * 3;
    },

    containerStyle() {
      return {
        position: "relative",
        display: "inline-block",
        width: `${this.containerWidth}px`,
        height: `${this.containerHeight}px`
      };
    },

    horizontalSegmentStyle() {
      return {
        position: "relative",
        width: `${this.segmentWidth}px`,
        height: `${this.segmentHeight}px`,
        margin: "0 auto",
        borderRadius: `${this.rounded ? this.segmentHeight : 0}px`
      };
    },

    verticalSegmentContainerStyle() {
      return {
        position: "relative",
        width: "100%",
        height: `${this.segmentWidth}px`
      };
    },

    verticalSegmentStyle() {
      return {
        position: "absolute",
        width: `${this.segmentHeight}px`,
        height: "100%",
        borderRadius: `${this.rounded ? this.segmentHeight : 0}px`
      };
    },

    map() {
      return SEGMENT_MAP[this.value.toString()] || SEGMENT_MAP["0"];
    }
  },

  methods: {
    onoff(segmentName) {
      var color = this.map[segmentName] ? this.onColor : this.offColor;
      return {
        backgroundColor: color,
        borderColor: color,
        borderWidth: `${this.segmentHeight}px`
      };
    }
  }
};
</script>