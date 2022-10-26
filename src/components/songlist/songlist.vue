<template>
    <div class="songlistContainer">
        <div class="songImg">
            <img :src="songImg" />
        </div>
        <div class="from">
            <span style="color:#eaeaea;" class="title">{{ title }}</span>
            <span class="count">{{ count }}首</span>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Songlist',
    props: {
        songImg: String,
        title: String,
        count: String
    }
}

</script>

<style lang='less' scoped>
.songlistContainer {
    display: flex;
    align-items: center;
    padding-left: 10px;
    background: #2c2c2c;
    width: 300px;
    height: 60px;

    .songImg img {
        width: 50px;
        height: 50px;
        border-radius: 10%;
    }

    .from {
        margin-left: 10px;
        display: flex;
        flex-direction: column;

        .title {
            font-size: 15px;
            font-weight: 600;
        }

        .count {
            font-size: 12px;
            color: #9f9f9f;
        }
    }
}
</style>
