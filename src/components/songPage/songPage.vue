<template>
    <div class="container" :style="{'--height':'100%'}">
        <el-card class="box-card content">
            <div class="background">
                <img :src="song.pic" />
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
import { useRoute } from "vue-router";
export default {
    name: 'SongPage',
    mixins: [mixinItem],
    data() {
        return {
            songId: 0,
            song: {},

        }
    },
    computed: {
        ...mapState('m_play', ['showPlay']),

    },
    async created() {
        // this.updateShowPlay()
        this.songId = this.$route.query.id
        const res = await this.getMusicDetail(this.songId)
        this.song = res.songs[0]
        console.log(this.song);


    },
    methods: {
        ...mapMutations('m_play', ['updateShowPlay'])
    },

}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
    --el-card-padding: 0;
}

.container {
    height: var(--height);

    .background {
        img {
            // width:100%;
            height: 150%;
            filter: blur(50px);
            transform: scale(3);
        }
    }

}
</style>
