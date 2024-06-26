<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-dark dark:bg-meddark bg-opacity-50 dark:bg-opacity-50">
        <div class="bg-light dark:bg-dark p-8 rounded shadow-lg">
            <h2 class="text-2xl mb-4 font-bold">Nueva puntuación</h2>
            <form @submit.prevent="submitForm" autocomplete="off">
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="team">Nombre del Club</label>
                    <input v-model="team" id="team" type="text" 
                        class="shadow bg-light border border-meddark focus:border-dark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-dark" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="score">Puntuación</label>
                    <input v-model="score" id="score" type="number" min="0" step="any" 
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
import { useScoresStore } from '@/stores/scores'

const scoreStore = useScoresStore()
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    competition: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(['close', 'saved']);

const team = ref('');
const score = ref('');

const resetForm = () => {
  team.value = '';
  score.value = '';
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
        await scoreStore.addScore(props.competition.id, team.value, score.value);

        emits('saved');
        closePopup();
    } catch (error) {
        console.error('Error adding score:', error);
    }
};

const closePopup = () => {
    emits('close');
};
</script>