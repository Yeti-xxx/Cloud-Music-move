<template>
    <div class="login-container">
        <!-- 登录方式选择 -->
        <div class="choose-login" v-if="gotoPage">
            <div class="top">
                <div class="text">
                    <span class="text-1">新用户登录得</span>
                    <span class="text-2">黑胶会员周卡</span>
                </div>
            </div>
            <div class="content">
                <div class="goToLogin" @click="gotoPageChange">
                    <span>登录</span>
                </div>
            </div>
        </div>
        <div class="login-page" v-else>
            1111
        </div>

    </div>
</template>
<script>
export default {
    name: 'login',
    data(){
        return{
            gotoPage:true
        }
    },
    methods: {
        gotoPageChange(){
            this.gotoPage = !this.gotoPage
        }
    },
} 
</script>
<style lang='less' scoped>
.login-container {

    .choose-login {
        width: 375px;
        height: 667px;
        overflow: hidden;

        .top {
            z-index: 10;
            width: 100%;
            height: 40%;
            background: linear-gradient(#5c514d, 3%, #141212);

            .text {
                position: relative;
                margin-left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                color: #fff;

                .text-1 {
                    font-size: 24px;
                }

                span {
                    background: linear-gradient(to right, #f8cfc8, #fcf0f0);
                    -webkit-background-clip: text;
                    color: transparent;
                }
            }
        }

        .top::before {
            content: '';
            display: block;
            top: 200px;
            left: -12px;
            position: relative;
            width: 400px;
            height: 100px;
            background: #141212;
            border-radius: 50%;
        }

        .goToLogin {
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:18px;
            color:#fef6ea;
            font-weight:600;
            position: relative;
            margin-left: 50%;
            transform: translateX(-50%);
            margin-top:30%;
            width: 220px;
            height: 50px;
            background: #dc2c1f;
            border-radius:5%;
        }
        .goToLogin:active{
            background: #ba3f37;
        }
    }
}
</style>