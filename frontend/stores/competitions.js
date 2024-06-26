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
        },
        async addCompetition(name, date) {
            const authStore = useAuthStore();
            const token = authStore.getToken;

            try {
                const response = await $fetch('api/competition', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, date })
                });

                if (!response.new_competition_id) {
                    throw new Error('Failed to add competition');
                }
            } catch (error) {
                console.error('Error adding competition:', error);
            }
        },
        async updateCompetition(competitionId, name, date) {
            const authStore = useAuthStore();
            const token = authStore.getToken;

            try {
                const response = await $fetch(`api/competition/${competitionId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, date })
                });

                if (!response) {
                    throw new Error('Failed to edit competition');
                  }
            } catch (error) {
                console.error('Error updating competition:', error);
            }
        }
    }
})