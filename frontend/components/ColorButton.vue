<template>
    <button aria-label="Color Mode" class="inline-block text-sm px-2 py-2 border rounded leading-none rounded
                text-meddark hover:text-dark border-meddark hover:border-dark hover:bg-medlight hover:bg-opacity-50
                dark:text-medlight dark:hover:text-light dark:border-medlight dark:hover:border-light dark:hover:bg-meddark dark:hover:bg-opacity-50"
            @click="changeColor">
        <ColorScheme placeholder="...">
            <Icon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" class="text-2xl" />
            <Icon v-else name="heroicons-outline:sun" class="text-2xl" />
        </ColorScheme>
    </button>
</template>

<script setup>
    const colorMode = useColorMode();
    const changeColor = () => {
        (colorMode.preference = (colorMode.value === 'light' ? 'dark' : 'light'))
    }
    
</script>