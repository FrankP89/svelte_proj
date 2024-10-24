import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";

// export default {
//   // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
//   // for more information about preprocessors
//   preprocess: vitePreprocess(),
// }


const config = {
    preprocess: sveltePreprocess({
        scss: {
            // includePaths: ["src/styles"]
            prependData: '@use "src/styles/variables.scss";'
        }
    })
};

export default config;