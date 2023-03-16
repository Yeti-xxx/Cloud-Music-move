<template>
    <div class="login-container">

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
        <!-- 二维码登录 -->
        <div class="login-page" v-if="gotoLogin">
            <div class="qr"
                style="width: 200px;height: 200px;margin: auto;margin-top: 100px;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
                <div class="qrText" style="color: azure;">
                    扫描二维码进行登录
                </div>
                <img :src="qrCode">
            </div>
        </div>
        <!-- 手机号码登录 -->
        <!-- <div class="login-page" v-if="gotoLogin">
            <div class="top">
                <div class="back">
                    <el-icon :size="26">
                        <Back />
                    </el-icon>
                </div>
                <span>手机号登录</span>
            </div>
            <div class="container">
                <div class="title">
                    <div class="title-big">
                        登录体验更多精彩
                    </div>
                    <div class="title-small">
                        未注册手机号登录后将自动创建账号
                    </div>
                </div>
                <div class="inputBox">
                    <input maxlength="11" type="tel" class="phoneInput" placeholder="请输入手机号" ref="inputPhone"
                        oninput="value=value.replace(/[^\d]/g,'')" />
                    <div class="inputClear" @click="clearInput">
                        <el-icon :size="20">
                            <Close />
                        </el-icon>
                    </div>
                </div>
                <div class="next" @click="getLogin">下一步</div>
            </div>
        </div>
        <div class="checkout-page" v-if="gotoCheck">
            <div class="top">
                <div class="back">
                    <el-icon :size="26">
                        <Back />
                    </el-icon>
                </div>
                <span>手机号登录</span>
            </div>
            <div class="container">
                <div class="title">
                    <div class="title-big">
                        请输入验证码
                    </div>
                    <div class="title-small">
                        已发送至 {{this.phone}}
                    </div>
                </div>
                <div class="six-input-box">
                    <input v-for="(item,index) in inputbox" :key="index" :ref="`ref${index}`" class="input"
                        v-model="item.value" type="text" oninput="value=value.replace(/[^\d]/g,'')"
                        @input="onInput(index)" @keyup.delete="onDelete(index)" maxlength="1" />
                </div>
            </div>
        </div> -->

    </div>
</template>
<script>
import vueQr from 'vue-qr/src/packages/vue-qr.vue' //二维码渲染库
import { mapState, mapMutations } from 'vuex'
import { ElMessage } from 'element-plus'
import axios from 'axios'
export default {
    name: 'login',
    computed: {
        ...mapState('m_my', ['accountStore', 'userInfo']),
        ...mapMutations('m_my',['updateCookie'])
    },
    created() {

    },
    data() {
        return {
            gotoLogin: false,
            gotoPage: true,
            gotoCheck: false,
            phone: '',
            inputbox: [
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                }
            ],
            check: '',
            account: {},
            qrKey: '',  //生成二维吗的key
            qrCode: '',   //生成二维码信息
            qrState: ''
        }
    },
    methods: {
        ...mapMutations('m_my', ['updateAccount', 'updateUserInfo', 'updateCookie']),
        async gotoPageChange() {
            this.gotoPage = !this.gotoPage
            this.gotoLogin = !this.gotoLogin
            const res = await this.$h.get('/login/qr/key?' + 'timestamp=' + Date.now())
            this.qrKey = res.data.unikey
            const qrRes = await this.$h.get('/login/qr/create?qrimg=true&key=' + this.qrKey + '&' + 'timestamp=' + Date.now())
            this.qrCode = qrRes.data.qrimg
            this.getQrCodeState()
        },
        // 轮训二维码扫码状态
        getQrCodeState() {
            let timer = setInterval(async () => {
                const statusRes = await this.$h.get('/login/qr/check?key=' + this.qrKey + '&' + 'timestamp=' + Date.now())
                if (statusRes.code === 800) {
                    alert('二维码已过期,请重新获取')
                    clearInterval(timer)
                }
                if (statusRes.code === 803) {
                    // 这一步会返回cookie
                    clearInterval(timer)
                    // this.updateCookie(statusRes.cookie)
                    localStorage.setItem('wyCookie',statusRes.cookie)
                    const status = await this.getLoginStatus(statusRes.cookie)
                    console.log(status);
                    this.getUserInfo(status.data.data.account.id)
                }
            }, 3000)
        },
        // 检查登录状态
        async getLoginStatus(cookie) {
            const res = await axios({
                url: `https://service-mlkn7ujm-1310291392.gz.apigw.tencentcs.com/release/login/status?timestamp=${Date.now()}`,
                method: 'post',
                data: {
                    cookie,
                },
            })
            return res
        },
        clearInput() {
            this.$refs.inputPhone.value = '';
        },
        // async getLogin() {
        //     if (this.$refs.inputPhone.value.length !== 11) {
        //         return ElMessage('请输入11位数字的手机号')
        //     }
        //     this.phone = this.$refs.inputPhone.value
        //     // 验证通过后
        //     const res = await this.$h.get('/captcha/sent?phone=' + this.$refs.inputPhone.value)
        //     if (res.code === 200 && res.data === true) {
        //         this.gotoLogin = !this.gotoLogin
        //         this.gotoCheck = !this.gotoCheck
        //     }
        // },
        // // 校验 验证码
        // async getCheck(check) {
        //     const res = await this.$h.get('/login/cellphone?phone=' + this.phone + '&captcha=' + check)
        //     this.account = res.account
        //     this.updateAccount(this.account)
        //     this.updateCookie(res.cookie)
        //     // this.getUserInfo(this.account.account.id)//测试时使用
        //     this.getUserInfo(this.account.id)
        //     setTimeout(() => {
        //         this.$router.go(0) 
        //     }, 2000);

        // },
        // 获取用户基本信息
        async getUserInfo(uid) {
            const res = await this.$h.get('/user/detail?uid=' + uid)
            // const res = await this.$h.get('/user/detail?cookie=' + encodeURIComponent(localStorage.getItem('cookie')))
            if (res.code !== 200) {
                ElMessage({
                    showClose: true,
                    message: '服务器出错！',
                    type: 'error',
                })
                return this.reload
            }
            this.updateUserInfo(res)
            setTimeout(() => {
                this.$router.go(0)
            }, 2000);

        },
        onInput(index) {
            // index < 5 ，如果是第6格，不触发光标移动至下一个输入框。
            if (this.inputbox[index].value && index < 3) {
                this.$refs['ref' + (index + 1)][0].focus()
            }
            var inputValue = ''
            this.inputbox.forEach(item => {
                inputValue = inputValue + item.value
            })
            if (inputValue.length < 4) {
                this.isError = true
            } else {
                this.isError = false
            }
            // 判断验证码是否输入完成,输入完成发送验证
            if (this.inputbox[index].value && index === 3) {
                for (let index = 0; index < this.inputbox.length; index++) {
                    this.check += this.inputbox[index].value
                }
                this.getCheck(this.check)
            }

        },
        onDelete(index) {
            // 如果是第1格，不触发光标移动至上一个输入框
            if (index > 0) {
                this.$refs['ref' + (index - 1)][0].focus()
            }
        }
    },
} 
</script>
<style lang='less' scoped>
.login-container {
    width: 100%;
    height: 100%;

    .choose-login {
        width: 100%;
        height: 100%;
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
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: #fef6ea;
            font-weight: 600;
            position: relative;
            margin-left: 50%;
            transform: translateX(-50%);
            margin-top: 30%;
            width: 220px;
            height: 50px;
            background: #dc2c1f;
            border-radius: 5%;
        }

        .goToLogin:active {
            background: #ba3f37;
        }
    }

    .login-page {
        height: 100%;
        background: #141414;

        .top {
            width: 100%;
            height: 50px;
            background: #2b2b2b;
            color: #fff;
            font-weight: 800;
            font-size: 16px;
            display: flex;
            align-items: center;

            span {
                margin-left: 20px;
            }
        }

        .title {
            margin-top: 20px;
            margin-left: 20px;

            .title-big {
                color: #fff;
                font-size: 20px;
            }

            .title-small {
                margin-top: 5px;
                color: #959595;
                font-size: 15px;
            }
        }

        .inputBox {
            display: flex;
            justify-content: space-bettewn;
            align-items: center;
            margin-top: 30px;
            margin-left: 20px;
            margin-right: 10px;
            border-bottom: 1px solid #444444;

            .phoneInput {
                background: #141414;
                height: 30px;
                width: 90%;
                border: none;
                outline: none;
                color: #e8e8e8;
                font-size: 20px;
            }

            .inputClear {
                color: #444444;
            }


        }

        .next {
            margin-left: 50%;
            transform: translateX(-50%);
            margin-top: 40px;
            text-align: center;
            color: #fefefe;
            width: 300px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-weight: 800;
            background: #dc2c1f;
            border-radius: 3%;
        }

    }

    .checkout-page {
        height: 100%;
        background: #141414;

        .top {
            width: 100%;
            height: 50px;
            background: #2b2b2b;
            color: #fff;
            font-weight: 800;
            font-size: 16px;
            display: flex;
            align-items: center;

            span {
                margin-left: 20px;
            }
        }

        .title {
            margin-top: 20px;
            margin-left: 20px;

            .title-big {
                color: #fff;
                font-size: 20px;
            }

            .title-small {
                margin-top: 5px;
                color: #959595;
                font-size: 15px;
            }
        }

        .six-input-box {
            display: flex;
            margin-left: 41%;
            margin-top: 30px;
            transform: translateX(-50%);
        }

        .input {
            display: flex;
            width: 25px;
            margin-left: 30px;
            height: 30px;
            font-size: 18px;
            color: #fff;
            background-color: #141414;
            text-align: center;
            outline: none;
            border: solid 1px #2e2e2e;
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;
        }
    }
}
</style>