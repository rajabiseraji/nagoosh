<template>
    <div :class='{"hover": isTurned}' class="flip-container align-items-center justify-content-center">
        <b-card class="m-2 mx-auto justify-content-center flipper"  @click="isTurned = !isTurned">
                    <div v-if="!isTurned" class="front text-center align-items-center justify-content-center d-flex">
                        <div class="rounded bg-light p-2" :class="wordStatus" style="position: absolute; top: 10px; right: 10px;">{{word.status}}</div>
                        <h1>{{word.word}}</h1>
                    </div>
                    <div v-else class="back p-2 d-flex flex-column">
                        <div v-for="def in word.defenitions" :key="def.text">
                            <h5><em>{{ def.type }}</em>: {{ def.text }}</h5>
                            <p>{{ def.example }}</p>
                            <hr>
                        </div>
                    </div>
        </b-card>
        <transition name="fade">
            <b-button-group class="w-100" vertical v-if="isTurned">
                <b-btn variant="success" @click="know" class="w-100 mb-1">I Know This Word</b-btn>
                <b-btn variant="danger" @click="notKnow" class="w-100">I Don't Know It</b-btn>
            </b-button-group>
        </transition>
        <slot></slot>
    </div>
</template>


<script>
export default {
    props: {
        word: {
            type: Object
        }
    },
    data() {
        return {
            isTurned: false,
            learnStatus: 'Mastered'
        }
    },
    methods: {
        know() {
            this.$emit('know', this.word)
        },
        notKnow() {
            this.$emit('notKnow', this.word);
        }
    },
    computed: {
        wordStatus() {
            switch (this.word.status) {
                case 'Mastered':
                    return 'text-success'
                    break;
                case 'Reviewing':
                    return 'text-warning'
                    break;
                case 'Unknown':
                    return 'text-danger'
                    break;
                default:
                    return ''
                    break;
            }
        }
    }
}
</script>

<style scoped>
.flip-container {
	perspective: 2000px;
}
	/* flip the pane when hovered */
	.flip-container.hover .flipper {
		transform: rotateY(180deg);
	}

.flip-container {
	width: 100%;
	min-height: 40vh;
    position: relative;
}

.flipper {
    width: 100%;
    transition: height .5s;
    cursor: pointer;
}

.front, .back{
    width: 100%;
    transition: opacity .5s;
    min-height: 200px;
}

/* flip speed goes here */
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;
}

/* front pane, placed above back */
.front {
	z-index: 10;
	/* for firefox 31 */
	transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
	transform: rotateY(180deg);
}

.fade-enter-active {
    transition: opacity .5s;
    transition-delay: .3s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: opacity .1s;
}
.text-success {
    color: #00aa11
}
.text-warning {
    color: orange
}
.text-danger {
    color: #aa0011
}
</style>
