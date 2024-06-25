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
                    <div class="h-auto flex cursor-pointer border rounded px-2 py-2 
                            text-meddark hover:text-dark border-meddark hover:border-dark
                            dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light">
                        <Icon name="heroicons-outline:plus-circle" class=" text-2xl"/>
                        <span class="text-l ml-2">Añadir</span>
                    </div>
                </div>
            </div>
        </div>
        <ScoresTable :competition="competition"/>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useCompetitionsStore } from '~/stores/competitions'

    const route = useRoute()
    const competitionsStore = useCompetitionsStore()

    const competition = computed(() => competitionsStore.competition)
    const loading = computed(() => competitionsStore.loading)
    const error = computed(() => competitionsStore.error)

    onMounted(() => {
        const competitionId = route.params.id;
        competitionsStore.fetchCompetition(competitionId)
    })
</script>