import { defineStore } from 'pinia'

export const useCompetitionsStore = defineStore('competitions', {
    state: () => ({
        competition: {},
        competitions: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCompetitions() {
            this.loading = true
            this.error = null
            try {
                const response = await $fetch('/api/competition')
                if(response) {
                    this.competitions = response
                }
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        async fetchCompetition(competitionId) {
            this.loading = true
            this.error = null
            try {
                const response = await $fetch(`/api/competition/${competitionId}`)
                if(response) {
                    this.competition = response
                }
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        }
    }
})