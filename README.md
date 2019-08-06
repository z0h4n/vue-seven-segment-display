# A Seven Segment Display Component for Vue.js

<p align="center">
  <img src="image.png">
</p>

<p align="center">
  <img src="image2.png">
</p>

### From NPM

```
// Installation
npm install --save vue-seven-segment-display

// ESM Import
import SevenSegmentDisplay from 'vue-seven-segment-display';

// CJS Import
const SevenSegmentDisplay = require('vue-seven-segment-display/dist/cjs');
```

### Via script tag
```
<script src="https://unpkg.com/vue-seven-segment-display"></script>
<script>
  var component = window.SevenSegmentDisplay;
</script>
```

### Usage

```  
<seven-segment value="8" :rounded="false" :segment-width="25" :segment-height="5" on-color="#f00" off-color="transparent"/>
```

`value` or `:value`
- Any Number between 0-9 in String format. Default is "8"
- Use `:value={myValue}` to bind `value` prop to `myValue`

`:rounded`
- Boolean. Default is false.
- True makes segments appear rounded, false makes it appear pointy

`:segment-width`
- Number. Default is 25
- Width of a segment
  
`:segment-height`
- Number. Default is 5
- Height of a segment
  
`on-color`
- String. Default is `#f00`
- Color when segment is on.

`off-color`
- String. Default is `transparent`
- Color when segment is off.
