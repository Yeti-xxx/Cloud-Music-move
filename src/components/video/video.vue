<template>
    <div class="videoContainer">
        <video ref="videoPlay" controls loop="true" >
            <source ref="source" :src="videoUrl" type="video/mp4" />
        </video>
        <div class="timeBar">

        </div>
        <div class="timeOverBar"></div>
    </div>
</template>

<script>
export default {
    name: 'video',
    props: {
        videoUrl: String
    },
    data(){
        return {
            alltimer:0,
            currentTime:0
        }
    },
    mounted(){
        this.playVideo()
        this.handlerTimeBar()
    },
    methods:{
        playVideo(){
            this.$refs.videoPlay.play()
            
        },
        // 处理进度条
        handlerTimeBar(){
            let This = this
            this.$refs.videoPlay.addEventListener('timeupdate',function(){
                This.alltimer = This.$refs.videoPlay.duration
                This.currentTime = This.$refs.videoPlay.currentTime
                console.log(This.currentTime);
                console.log(This.alltimer);
            })
        }
    }

}

</script>

<style lang='less' scoped>
.videoContainer {
    position: relative;
    height: 100%;
    width: 100%;

    video {
        width: 100%;
        height: 100%;
    }

    .timeBar {
        position: absolute;
        bottom: 5px;
        height: 2px;
        width: 100%;
        background-color: #adadad;
    }

    .timeOverBar {
        position: absolute;
        bottom: 5px;
        height: 2px;
        background-color: #e63434;
        transition: all .4s;
    }

}
</style>
