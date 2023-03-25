<script>
    import { fly } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import { toast } from './stores'
    import ToastItem from './ToastItem.svelte'
    import { swipe } from 'svelte-gestures';

    /** @type {import('./stores').SvelteToastOptions} */
    export let options = {}
    /** @type {(string|'default')} */
    export let target = 'default'
    
    let items = []
    
    function getCss(theme) {
      return Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '')
    }
    function toastDismiss(event) {
        if(event.detail.direction === 'right'){
			toast.pop(0)
        }
    }
    $: toast._init(target, options)
    
    $: items = $toast.filter((i) => i.target === target)
    </script>
    
    <ul class="_toastContainer"
    use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y'}}
    on:swipe={toastDismiss}
    >
      {#each items as item (item.id)}
        <li
          class={item.classes.join(' ')}
          in:fly={item.intro}
          out:fly={{x:250}}
          animate:flip={{ duration: 200 }}
          style={getCss(item.theme)}
        >
          <ToastItem {item} />
        </li>
      {/each}
    </ul>
    
    <style>
    ._toastContainer {
      top: var(--toastContainerTop, 1.5rem);
      right: var(--toastContainerRight, 2rem);
      bottom: var(--toastContainerBottom, auto);
      left: var(--toastContainerLeft, auto);
      position: fixed;
      margin: 0;
      padding: 0;
      list-style-type: none;
      pointer-events: auto;
      z-index: var(--toastContainerZIndex, 9999);
    }
    </style>