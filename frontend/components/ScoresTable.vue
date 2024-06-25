<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="font-bold text-red-600">{{ error }}</div>
    <div v-else >
        <div v-if="scores.length > 0">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-center"></th>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-left">Club</th>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-center">Puntuación</th>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(score, i) in scores" :key="score.id" :class="{'text-xl font-bold': i == 0, 'font-semibold': i == 1 || i == 2}">
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-auto text-center" :class="{'text-2xl': i == 0, 'text-xl': i == 1 || i == 2}">{{ parsePosition(i) }}</td>
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-full text-left">{{ score.team }}</td>
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-auto text-center">{{ score.score }}</td>
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-auto text-center">
                            <div class="flex items-center justify-center">
                                <Icon name="heroicons-outline:pencil-square" class="cursor-pointer text-xl mr-2 text-meddark hover:text-dark dark:text-medlight dark:hover:text-light"/>
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
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useScoresStore } from '~/stores/scores'

    const scoreStore = useScoresStore()

    const props = defineProps({
        competition: {
            type: Object,
            required: true
        }
    });

    const scores = computed(() => scoreStore.scores)
    const loading = computed(() => scoreStore.loading)
    const error = computed(() => scoreStore.error)

    onMounted(() => {
        scoreStore.fetchScores(props.competition.id)
    })

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