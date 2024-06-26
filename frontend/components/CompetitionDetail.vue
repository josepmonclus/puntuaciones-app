<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="font-bold text-red-600">{{ error }}</div>
    <div v-else >
        <div class="flex">
            <div class="w-full flex flex-col">
                <span class="text-2xl font-bold">{{ competition.name }}</span>
                <span class="text-l font-semibold mb-4">({{ $formatDate(competition.date) }})</span>
            </div>
            <div class="w-auto flex align-middle">
                <div class="">
                    <div @click="refreshScores" class="h-auto flex cursor-pointer border rounded px-2 py-2
                            text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        <Icon name="heroicons-outline:arrow-path" class=" text-2xl"/>
                    </div>
                </div>
                <div class="">
                    <div v-if="authStore.isAuthenticated" @click="openPopup" class="h-auto flex cursor-pointer border rounded px-2 py-2 ml-2
                            text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50">
                        <Icon name="heroicons-outline:plus" class="text-2xl"/>
                    </div>
                </div>
            </div>
        </div>
        <ScoresTable :competition="competition" :competitionId="competitionId"/>
    </div>
    <AddScorePopup :isOpen="isAddPopupOpen" :competition="competition" @close="closePopup" @saved="refreshScores" />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useCompetitionsStore } from '~/stores/competitions'
import { useScoresStore } from '~/stores/scores'
import { useAuthStore } from '@/stores/auth';

const router = useRoute()
const competitionsStore = useCompetitionsStore()
const scoreStore = useScoresStore()
const authStore = useAuthStore();

const competition = computed(() => competitionsStore.competition)
const loading = computed(() => competitionsStore.loading)
const error = computed(() => competitionsStore.error)

const isAddPopupOpen = ref(false);
const competitionId = ref(router.params.id);

onMounted(async () => {
    await authStore.checkAuth(router);
    await competitionsStore.fetchCompetition(competitionId.value)
})

const refreshScores = async () => {
    await scoreStore.fetchScores(competitionId.value)
};

const openPopup = () => {
    isAddPopupOpen.value = true;
};

const closePopup = () => {
    isAddPopupOpen.value = false;
};
</script>