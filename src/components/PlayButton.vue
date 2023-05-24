<template>
    <div>
        <button id="button" @click="testFunction"> {{ buttonName }}</button>
    </div>
</template>

<script>
    export default {
        name: 'PlayButton',
        props: {
            buttonName: String,
            testFunction: Function
        }
    }
</script>

<style scoped>

</style>