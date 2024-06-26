<template>
  <NuxtLayout>
    <div class="min-h-screen flex-wrap bg-light text-dark dark:bg-dark dark:text-light">
        <Header />
        <NuxtPage />
        <Footer />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'puntuaciones.com',
  meta: [
    { name: 'description', content: 'Site para el registro de puntuaciones de competiciones de Natación Artística y otros deportes.' }
  ]
})
</script>