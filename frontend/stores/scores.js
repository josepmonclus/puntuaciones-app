import { defineStore } from 'pinia'

export const useScoresStore = defineStore('scores', {
    state: () => ({
        scores: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchScores(competitionId) {
            this.loading = true
            this.error = null
            try {
                const response = await $fetch(`/api/competition/${competitionId}/scores`)
                if(response) {
                    this.scores = response
                }
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        }
    }
})