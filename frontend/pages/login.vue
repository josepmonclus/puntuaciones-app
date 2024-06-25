<template>
    <div v-if="authStore.isAuthenticated" class="flex flex-col items-center justify-center py-10">
        <h1 class="text-3xl font-bold mb-10">Bienvenido, {{ authStore.username }}</h1>
        <button @click="handleLogout" class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                        text-meddark hover:text-dark border-meddark hover:border-dark
                        dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light">
            Cerrar Sesión
        </button>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-10">
      <h1 class="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin" class="w-full flex flex-col max-w-sm">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="email">Correo Electrónico</label>
          <input v-model="email" type="email" id="email" 
                class="shadow bg-light border border-meddark focus:border-dark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-dark" required>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold mb-2" for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" 
                class="shadow bg-light border border-meddark focus:border-dark rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-dark" required>
        </div>
        <div class="w-full flex items-center justify-center">
          <button type="submit" 
                class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                        text-meddark hover:text-dark border-meddark hover:border-dark
                        dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light">
            Iniciar Sesión
          </button>
        </div>
      </form>
      <p v-if="authStore.errorMessage" class="mt-4 text-red-500">{{ authStore.errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

onMounted( async () => {
  await authStore.checkAuth(router);
});

const handleLogin = async () => {
    await authStore.login(email.value, password.value, router)
};

const handleLogout = async () => {
    await authStore.logout(router);
};
</script>