<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-dark dark:bg-meddark bg-opacity-50 dark:bg-opacity-50">
        <div class="bg-light dark:bg-dark p-8 rounded shadow-lg">
            <h2 class="text-2xl mb-4 font-bold">Nueva competición</h2>
            <form @submit.prevent="submitForm" autocomplete="off">
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="name">Nombre de la Competición</label>
                    <input v-model="name" id="name" type="text" 
                        class="shadow bg-light border border-meddark focus:border-dark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-dark" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="date">Fecha</label>
                    <input v-model="date" id="date" type="date" 
                        class="shadow bg-light border border-meddark focus:border-dark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-dark" required />
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" 
                            class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                                text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        Guardar
                    </button>
                    <button @click="closePopup" type="button" 
                            class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                                text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCompetitionsStore } from '~/stores/competitions'

const router = useRouter();
const authStore = useAuthStore();
const competitionsStore = useCompetitionsStore()

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['close', 'saved']);

const name = ref('');
const date = ref('');

const resetForm = () => {
    name.value = '';
    date.value = '';
};

// Watch for the isOpen prop to reset the form when the popup is opened
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm();
  }
});

const submitForm = async () => {
    try {
        await authStore.checkAuth(router);
        await competitionsStore.addCompetition(name.value, date.value);

        emits('saved');
        closePopup();
    } catch (error) {
        console.error('Error adding competition:', error)
    }
};

const closePopup = () => {
    emits('close');
};
</script>