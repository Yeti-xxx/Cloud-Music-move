<template>
    <div class="container">
        <div class="wordContent" ref="wordContentMove" :style="lyricMove">
            <div ref="item" :class="['wordItem',currentRow===i?'current':'']" v-for="(item,i) in lyricArray" :key="i">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'lyric',
    props: ["lyricArray"],
    computed:{
        ...mapState('t_play', ['TsongListStore', 'TsongPageIdStore', 'TlyricTime'])
    },
    watch: {
        TlyricTime(newV, oldV) {
            this.lyricArray.forEach((element, index) => {
                if (this.TlyricTime === element.time) {
                    console.log(111);
                    let h = window.innerHeight * 0.23
                    h += -index * 39
                    this.lyricMove.top = h + 'px'
                    this.currentRow = index
                }
            });
        }
    },
    data() {
        return {
            currentRow: 0,
            lyricMove: {
                top: window.innerHeight * 0.23 + 'px'
            },
        }
    },
    created() {
        console.log(this.lyricArray);
    },
}

</script>

<style lang='less' scoped>
.wordContent {
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    // border: 1px solid blue;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all .3s;

    .wordItem {
        margin-top: 20px;
        font-size: 14px;
    }

    .current {
        color: #eff1f2;
        font-size: 16px;
    }
}
</style>

<!-- <template>
    <div class="wordContent" ref="wordContentMove" :style="lyricMove">
        <div class="falgDiv" v-if="flag">
            <div ref="item" :class="['wordItem',currentRow===i?'current':'']" v-for="(item,i) in lyric" :key="i">
                {{item.text}}
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { mapState, mapMutations } from 'vuex'
import mixinItem from '../../mixins/mixin.js'
export default {
    name: 'lyric',
    // mixins: [mixinItem],
    setup() {
        // const lyric = reactive([]);
        // return {
        //     lyric
        // }
    },
    data() {
        return {
            lyricMove: {
                top: window.innerHeight * 0.23 + 'px'
            },
            word: '',
            currentRow: 0,
            lyric: [1, 2, 3],
            flag:false
        }
    },
    computed: {
        ...mapState('t_play', ['TsongListStore', 'TsongPageIdStore', 'TlyricTime'])
    },
    watch: {
        TlyricTime(newV, oldV) {
            this.lyric.forEach((element, index) => {
                if (this.TlyricTime === element.time) {
                    let h = window.innerHeight * 0.23
                    h += -index * 39
                    this.lyricMove.top = h + 'px'
                    this.currentRow = index
                }
            });
        },
    },
    methods: {
        // 歌词处理
        wordHandle() {
            // console.log(this.word);
            //先通过“\n”将每行歌词存入数组之中
            let arr = this.word.split('\n')
            for (let i = 0; i < arr.length; i++) {
                let lyricRow = {}   //将每行歌词及其出现的时间视为一个对象
                let row = arr[i].split(']') //文本切割
                let text = row[1]   //拿到当前行的真正的歌词
                let time_arr = row[0].substr(1, row[0].length - 1).split(":")   //将[01:13]秒转为["01","13"]用于先处理
                let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1])   //将时间统一转为秒
                lyricRow.time = s   //向对象存入数据
                lyricRow.text = text
                // push进lyryc数组
                this.lyric.push(lyricRow)             
            }
            this.flag = true;
            console.log(this.flag);
            console.log(this.lyric);
        },
        // 外界发入信息，表示此时歌词组件获取歌词
        getWordInLyric(word) {
            this.word = word
            this.wordHandle()
        }
    }
}
</script>
<style lang='less' scoped>
.wordContent {
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    // border: 1px solid blue;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all .3s;

    .wordItem {
        margin-top: 20px;
        font-size: 14px;
    }

    .current {
        color: #eff1f2;
        font-size: 16px;
    }

    .dis {
        display: none;

    }
}
</style> -->