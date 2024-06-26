<template>
  <NuxtLayout>
    <div class="min-h-screen flex flex-col bg-light text-dark dark:bg-dark dark:text-light">
        <Header />
        <div class="flex-grow">
            <NuxtPage />
            <div class="h-12"></div>
        </div>
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