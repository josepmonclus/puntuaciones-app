<template>
    <header>
        <div class="container flex items-center justify-between w-auto mx-auto px-4">
            <div class="flex items-center flex-shrink-0 my-5">
                <NuxtLink to="/">
                    <span class="font-semibold text-3xl">
                        <span class="text-3xl">🥈</span>
                        <span class="text-4xl">🥇</span>
                        <span class="text-2xl">🥉</span>
                    </span>
                </NuxtLink>
            </div>
            <div class="flex items-right w-auto my-5">
                <LoginComponent class="mr-2" />
                <ColorButton />
            </div>
        </div>
    </header>
</template>