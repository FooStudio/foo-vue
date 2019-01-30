<template>
    <section class="NotFound">
        <p class="NotFound-copy">
            404
            <br>
            Página no encontrada
            <br>
            <router-link :to="{ name: 'home' }">
                Inicio
            </router-link>
        </p>
    </section>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style src="styles/views/NotFound.styl" lang="stylus"></style>