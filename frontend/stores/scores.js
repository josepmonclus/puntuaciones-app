import { defineStore } from 'pinia'
import { useAuthStore } from './auth';

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
        },
        async addScore(competitionId, team, score) {
            const authStore = useAuthStore();
            const token = authStore.getToken;

            try {
                const response = await $fetch('/api/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ competitionId, team, score })
                });
        
                if (!response.new_score_id) {
                  throw new Error('Failed to add score');
                }
        
                await this.fetchScores(competitionId); // Refresh the scores
            } catch (error) {
                console.error('Error adding score:', error);
            }
        },
        async updateScore(competitionId, scoreId, team, score) {
            const authStore = useAuthStore();
            const token = authStore.getToken;

            try {
                const response = await $fetch(`/api/score/${scoreId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ team, score })
                });
        
                if (!response) {
                  throw new Error('Failed to edit score');
                }
        
                await this.fetchScores(competitionId); // Refresh the scores
            } catch (error) {
                console.error('Error updating score:', error);
            }
        },
        async deleteScore(competitionId, scoreId) {
            const authStore = useAuthStore();
            const token = authStore.getToken;

            try {
                const response = await $fetch(`/api/score/${scoreId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: {}
                });
        
                if (!response) {
                  throw new Error('Failed to delete score');
                }
        
                await this.fetchScores(competitionId); // Refresh the scores
            } catch (error) {
                console.error('Error deleting score:', error);
            }
        }
    }
})