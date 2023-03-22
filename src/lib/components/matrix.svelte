<script>
   import { onMount } from "svelte";

let canvas, ctx, letters, fontSize, columns, drops;

function setup() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQ1234567890RSTUVXYZABCDEFGHIJKLMNOPQRSTUVX1234567890YZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  letters = letters.split('');

  if(size) {
    fontSize = size
  } else {
    fontSize = 10
  };

  columns = canvas.width / fontSize;

  drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = 1;
  }
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0DA9BF';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}
onMount(() => {
  setup();
  setInterval(draw, 33);
})

export let size;
</script>
<svelte:window on:resize={setup} />

    <canvas>        
    </canvas>
<style lang="scss">

canvas {
    display: block;
    margin: 0; 
    padding: 0;
    background: #000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
    width: 100vw;
    height: 100%;
    }
</style>