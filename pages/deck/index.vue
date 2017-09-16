<template>
    <b-row align-h="center">
        <b-col xs="12" sm="12" md="6">
            <b-card v-for="deck in decks" :key="deck._id" @click="$router.push('/deck/'+deck._id)" class="w-100 my-1 text-center hover">
                <h2 class="display-4 mb-5">{{ deck.level }}</h2>
                <b-progress show-value :value="deck.progress" :max="deck.words.length" variant="primary" class="w-100 my-2"></b-progress>
            </b-card>   
        </b-col>
    </b-row>
</template>

<script>
export default {
    async asyncData({app}) {
        let decks = (await app.$axios.get('decks')).data;
        return {
            decks
        }
    }
}
</script>


