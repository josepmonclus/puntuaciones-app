<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="font-bold text-red-600">{{ error }}</div>
    <div v-else >
        <div v-if="scores.length > 0">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="py-2 px-1 border-b-2 border-dark dark:border-light text-center"></th>
                        <th class="py-2 px-2 border-b-2 border-dark dark:border-light text-left">Club / Equipo</th>
                        <th class="py-2 px-2 border-b-2 border-dark dark:border-light text-center">Puntos</th>
                        <th v-if="authStore.isAuthenticated" class="py-2 px-1 border-b-2 border-dark dark:border-light text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(score, i) in scores" :key="score.id" :class="{'text-xl font-bold': i == 0, 'font-semibold': i == 1 || i == 2}">
                        <td class="py-2 px-1 border-b border-dark dark:border-light w-auto text-center" :class="{'text-2xl': i == 0, 'text-xl': i == 1 || i == 2}">{{ parsePosition(i) }}</td>
                        <td class="py-2 px-2 border-b border-dark dark:border-light w-full text-left">{{ score.team }}</td>
                        <td class="py-2 px-2 border-b border-dark dark:border-light w-auto text-center">{{ formatScore(score.score) }}</td>
                        <td v-if="authStore.isAuthenticated" class="py-2 px-1 border-b border-dark dark:border-light w-auto text-center">
                            <div class="flex items-center justify-center">
                                <Icon v-if="authStore.isAuthenticated" name="heroicons-outline:pencil-square" @click="openEditPopup(score)"
                                        class="cursor-pointer text-xl mx-1 text-meddark hover:text-dark dark:text-medlight dark:hover:text-light"/>
                                <Icon v-if="authStore.isAuthenticated" name="heroicons-outline:trash" @click="openDeletePopup(score)"
                                class="cursor-pointer text-xl mx-1 text-meddark hover:text-dark dark:text-medlight dark:hover:text-light"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="mt-4 text-l font-bold">Aún no existen puntuaciones para esta competición</p>
        </div>
    </div>
    <EditScorePopup :isOpen="isEditPopupOpen" :competition="competition" :score="currentScore" @close="closeEditPopup" @saved="refreshScores" />
    <DeleteScorePopup :isOpen="isDeletePopupOpen" :competition="competition" :score="currentScore" @close="closeDeletePopup" @saved="refreshScores" />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useScoresStore } from '~/stores/scores'
import { useAuthStore } from '@/stores/auth';

const scoreStore = useScoresStore()
const authStore = useAuthStore();
const router = useRouter();

const scores = computed(() => scoreStore.scores)
const loading = computed(() => scoreStore.loading)
const error = computed(() => scoreStore.error)

const isEditPopupOpen = ref(false);
const currentScore = ref(null);

const isDeletePopupOpen = ref(false);

const props = defineProps({
    competition: {
        type: Object,
        required: true
    }
});

onMounted(async () => {
    await authStore.checkAuth(router);
    await scoreStore.fetchScores(props.competition.id)
})

const openEditPopup = (score) => {
    currentScore.value = score;
    isEditPopupOpen.value = true;
}

const closeEditPopup = () => {
    currentScore.value = null;
    isEditPopupOpen.value = false;
};

const openDeletePopup = (score) => {
    currentScore.value = score;
    isDeletePopupOpen.value = true;
}

const closeDeletePopup = () => {
    currentScore.value = null;
    isDeletePopupOpen.value = false;
};

const refreshScores = async () => {
    await scoreStore.fetchScores(props.competition.id)
}

const formatScore = (score) => {
    return score.toLocaleString('es-ES');
};

const parsePosition = (pos) => {
    if (pos == 0) {
        return '🥇'
    } else if (pos == 1) {
        return '🥈'
    } else if (pos == 2) {
        return '🥉'
    } else {
        return pos + 1
    }
}
</script>