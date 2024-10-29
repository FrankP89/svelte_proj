import { cubicInOut } from "svelte/easing";

export default function spin(node,
    { delay = 0, duration = 400, easing = cubicInOut, spin = 1 }) {

    const originalOpacity = +getComputedStyle(node).opacity;
    const originalTransform = getComputedStyle(node).transform.replace("none", "");

    return {
        delay,
        duration,
        easing,

        // css
        css: (t) => {
            // t in 0 to 1 out 0 to 1
            // u = 1- t
            // transform : scale(${t}) rotate(${spin * 360 * t}deg)
            return `
                opacity : ${t * originalOpacity};
                transform: ${originalTransform} scale(${t}) rotate(${spin * 360 * t}deg);
            `;

        }

    };
}