<script setup>
const props = defineProps({
  description: String,
});
</script>

<template>
  <!--car description-->
  <div class="mt-5">
    <p class="mb-10">
      {{ description }}
    </p>
  </div>
  <!--car description-->
</template>
