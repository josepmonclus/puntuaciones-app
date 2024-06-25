<template>
    <div class="flex">
        <div class="w-full">
            <h1 class="text-2xl font-bold mb-4">Competiciones</h1>
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
    <div v-if="loading" class="text-light">Loading...</div>
    <div v-else-if="error" class="font-bold text-red-600">{{ error }}</div>
    <div v-else >
        <div v-if="competitions.length > 0">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-left">Nombre</th>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-center"></th>
                        <th class="py-2 px-4 border-b-2 border-dark dark:border-light text-center">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="competition in competitions" :key="competition.id">
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-full text-left">
                            <NuxtLink :to="`/competitions/${competition.id}`">{{ competition.name }}</NuxtLink>
                        </td>
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-auto text-center">{{ $formatDate(competition.date) }}</td>
                        <td class="py-2 px-4 border-b border-dark dark:border-light w-auto text-center">
                            <div class="flex items-center justify-center">
                                <NuxtLink :to="`/competitions/${competition.id}`">
                                    <Icon name="heroicons-outline:eye" class="cursor-pointer text-xl mr-2 text-meddark hover:text-dark dark:text-medlight dark:hover:text-light"/>
                                </NuxtLink>
                                <Icon name="heroicons-outline:pencil-square" class="cursor-pointer text-xl mr-2 text-meddark hover:text-dark dark:text-medlight dark:hover:text-light" 
                                    @click="editCompetition(competition.id)"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="mt-4 text-l font-bold">Aún no existen competiciones</p>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router';
    import { useCompetitionsStore } from '~/stores/competitions'

    const router = useRouter();
    const competitionsStore = useCompetitionsStore()

    const competitions = computed(() => competitionsStore.competitions)
    const loading = computed(() => competitionsStore.loading)
    const error = computed(() => competitionsStore.error)

    onMounted(() => {
        competitionsStore.fetchCompetitions()
    })

    const viewCompetition = (id) => {
        router.push(`/competition/${id}`);
    };

    const editCompetition = (id) => {
        // router.push(`/competitions/${id}`);
        console.log('edit id: ' + id)
    };
</script>