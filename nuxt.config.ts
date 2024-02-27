// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
      modules: ["@nuxtjs/tailwindcss",
           "@nuxt/image-edge",
            "@vueuse/nuxt"],
      imports: {
            autoImport: true,
          }
  
});

components: [
  {
    path: '~/components', // will get any components nested in let's say /components/test too
    pathPrefix: true,
  },
]