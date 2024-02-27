<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

useHead({
  //shows title of page as "Cars in Hyderabad or Bengaluru.." etc
  title: `${
    route.params.make ? toTitleCase(route.params.make) : "Cars"
  }  in ${toTitleCase(route.params.city)}`,
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <div class="mt-32 flex">
      <NuxtErrorBoundary>
        <CarSideBar />

        <NuxtPage />
        <template #error="{ error }">
          <div class="text-center mx-auto flex flex-col">
            <h1 class="text-5xl text-red-600 mb-5">
              Sorry, something went wrong.
            </h1>
            <code>
              {{ error }}
            </code>
            <button
              class="text-white bg-blue-400 px-10 py-3 rounded mt-4"
              @click="error.value = null"
            >
              Go Back
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
