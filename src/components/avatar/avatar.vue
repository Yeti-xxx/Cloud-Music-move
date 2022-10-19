<template>
    <div class="avatarContainer">
        <!-- 头像框 -->
        <div class="block">
            <el-avatar :size="60" :src="avatarUrl" />
        </div>
        <!-- nickname -->
        <span class="nickname">{{nickname}}</span>
        <slot class="Change"></slot>
    </div>
</template>

<script>
export default {
    name: 'avatar',
    props:{
        avatarUrl:String,
        nickname:String
    }
}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
  --el-card-padding: 0;
}
.avatarContainer{
    display:flex;
    flex-direction: column;
    align-items:center;
    margin:auto;
    background:#2b2b2b;
    width:90%;
    height:120px;
    border-radius:5%;
    .block{
        position:relative;
        top:-25px;
    }
    .nickname{
        font-weight:800;
        color:#eaeaea;
        font-size:18px;
        margin-top:-20px;
    }
   
}
</style>
