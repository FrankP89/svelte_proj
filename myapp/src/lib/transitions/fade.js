import { cubicInOut } from "svelte/easing";
export default function fade(node, { delay = 0, duration = 400, easing = cubicInOut }) {
    const originalOpacity = +getComputedStyle(node).opacity;

    return {
        delay,
        duration,
        easing,
        // Using JS
        tick: (t) => {
            // t in 0 to 1 out 0 to 1
            node.style.opacity = t * originalOpacity;


        }
    };
}