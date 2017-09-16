<template>
    <b-container>
        <b-row align-h="center" align-v="start" style="height: 100vh">
            <b-col sm="12" xs="12" md="6" class="h-100 d-flex flex-column align-items-start">
                <div class="w-100">
                    <transition name="fade" mode="out-in">
                        <flash-card v-for="word in words" class="mb-2" v-if="word.word == turn" :key="word.word" :word="word" @notKnow="notKnow" @know="know">
                        </flash-card>
                    </transition>
                </div>
                <div class="progress-thing mt-auto w-100 mb-5">
                    <div>You have mastered {{ masteredWords.length }} words</div>
                    <b-progress height="30px" :value="masteredWords.length" :max="50" animated variant="success" class="my-1 w-100"></b-progress>
                    <div>You are reviewing {{ reviewWords.length }} words</div>
                    <b-progress height="30px" :value="reviewWords.length" :max="50" animated variant="warning" class="mb-1 w-100"></b-progress>
                    <div>You have {{ unknownWords.length }} words to learn </div>
                    <b-progress height="30px" :value="unknownWords.length" :max="50" animated variant="danger" class="w-100"></b-progress>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FlashCard from '~/components/FlashCard.vue'
export default {
    async asyncData({ app, params }) {
        let reviewWords = [];
        let masteredWords = [];
        let unknownWords = [];
        let id = params.id;
        let deck = (await app.$axios.get(`/deck/${id}`)).data;
        let words = deck.words;
        return {
            reviewWords,
            masteredWords,
            unknownWords,
            words,
            turn: words[0].word
        }
    },
    methods: {
        notKnow(word) {
            if (this.masteredWords.indexOf(word) != -1) {
                let index = this.masteredWords.indexOf(word);
                this.masteredWords.splice(index, 1)
                word.status = 'Unknown'
                this.unknownWords.push(word)
            } else if (this.reviewWords.indexOf(word) != -1) {
                let index = this.reviewWords.indexOf(word);
                this.reviewWords.splice(index, 1);
                word.status = 'Unknown'
                this.unknownWords.push(word)
            } else if(this.unknownWords.indexOf(word) == -1) {
                word.status = 'Unknown'
                this.unknownWords.push(word)
            }
            let turn = this.words[0].word || '';
            do {
                turn = this.words[Math.floor(Math.random() * this.words.length)].word;
            }
            while (turn == this.turn);
            this.turn = turn;
        },
        know(word) {
            if (this.unknownWords.indexOf(word) != -1) {
                let index = this.unknownWords.indexOf(word);
                this.unknownWords.splice(index, 1)
                word.status = 'Reviewing'
                this.reviewWords.push(word)
            } else if (this.reviewWords.indexOf(word) != -1) {
                let index = this.reviewWords.indexOf(word);
                this.reviewWords.splice(index, 1);
                word.status = 'Mastered'
                this.masteredWords.push(word)
            } else if (this.masteredWords.indexOf(word) == -1) {
                word.status = 'Mastered'
                this.masteredWords.push(word);
            }
            let turn = this.words[0].word || '';
            do {
                turn = this.words[Math.floor(Math.random() * this.words.length)].word;
            }
            while (turn == this.turn);
            this.turn = turn;
        }
    },
    components: {
        FlashCard
    }
}
</script>

<style scoped>


@keyframes ease-in-animation {
    0% {
        transform: translateX(200px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes ease-out-animation {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(-200px);
        opacity: 0;
    }
}

.fade-enter-active {
    animation: ease-in-animation .2s ease-in;
    /* animation-delay: .5s; */
}

.fade-leave-active {
    animation: ease-out-animation .2s ease-out;
    /* animation-delay: .3s; */
}

.progress-thing {
    transition: .6s;
    font-size: 12px;
}
</style>

