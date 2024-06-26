<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-dark dark:bg-meddark bg-opacity-50 dark:bg-opacity-50">
        <div class="bg-light dark:bg-dark p-8 rounded shadow-lg">
            <h2 class="text-2xl mb-4 font-bold">Borrar puntuación?</h2>
            <div class="flex flex-col mb-4">
                <span class="mb-1">Confirma que quieres borrar la puntuación:</span>
                <span class="font-semibold">{{ props.score.team }} ({{ props.score.score }})</span>
            </div>

            <div class="flex items-center justify-between">
                    <button @click="confirmDelete" type="button" 
                            class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                                text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        Borrar
                    </button>
                    <button @click="closePopup" type="button" 
                            class="focus:outline-none focus:shadow-outline py-2 px-4 border rounded 
                                text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        Cancelar
                    </button>
                </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useScoresStore } from '@/stores/scores';

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
    },
    score: {
        type: Object,
        default: null
    }
});

const emits = defineEmits(['close', 'saved']);

const confirmDelete = async () => {
    try {
        await authStore.checkAuth(router);
        await scoreStore.deleteScore(props.competition.id, props.score.id);

        emits('saved');
        closePopup();
    } catch (error) {
        console.error('Error updating score:', error);
    }
};

const closePopup = () => {
    emits('close');
};
</script>