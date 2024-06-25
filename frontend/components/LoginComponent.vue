<template>
    <NuxtLink to="/login" class="inline-block text-sm px-2 py-2 border rounded leading-none rounded
                text-meddark hover:text-dark border-meddark hover:border-dark
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light">
        <Icon name="heroicons-outline:user" class="text-2xl" />
        <span v-if="authStore.isAuthenticated" class="pl-2 text-l">
            {{ authStore.username }}
        </span>
    </NuxtLink>
</template>

<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

onMounted( async () => {
  await authStore.checkAuth(router);
});
</script>