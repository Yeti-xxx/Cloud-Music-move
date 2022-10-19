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
        <div class="login-page" v-if="gotoLogin">
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
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { ElMessage } from 'element-plus'
export default {
    name: 'login',
    computed: {
        ...mapState('m_my', ['accountStore', 'userInfo']),

    },
    created() {
        console.log(this.$store);
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
            account: {}
        }
    },
    methods: {
        ...mapMutations('m_my', ['updateAccount', 'updateUserInfo']),
        gotoPageChange() {
            this.gotoPage = !this.gotoPage
            this.gotoLogin = !this.gotoLogin
        },
        clearInput() {
            this.$refs.inputPhone.value = '';
        },
        async getLogin() {
            if (this.$refs.inputPhone.value.length !== 11) {
                return ElMessage('请输入11位数字的手机号')
            }
            this.phone = this.$refs.inputPhone.value
            // 验证通过后
            const res = await this.$h.get('/captcha/sent?phone=' + this.$refs.inputPhone.value)
            if (res.code === 200 && res.data === true) {
            //     console.log(111);
                this.gotoLogin = !this.gotoLogin
                this.gotoCheck = !this.gotoCheck
                
            }
            

        },
        // 校验 验证码
        async getCheck(check) {
            const res = await this.$h.get('/login/cellphone?phone=' + this.phone + '&captcha=' + check)
            this.account = res.account
//             this.account = {
//     "loginType": 1,
//     "code": 200,
//     "account": {
//         "id": 1335174138,
//         "userName": "1_15886576755",
//         "type": 1,
//         "status": 0,
//         "whitelistAuthority": 0,
//         "createTime": 1515330777193,
//         "salt": "[B@58e4afd2",
//         "tokenVersion": 0,
//         "ban": 0,
//         "baoyueVersion": 0,
//         "donateVersion": 0,
//         "vipType": 0,
//         "viptypeVersion": 1643820003722,
//         "anonimousUser": false,
//         "uninitialized": false
//     },
//     "token": "9ec094ef524df65688a8c414206df5d8c59c002467a7714607d16c73da299343993166e004087dd300b9079e6c75c15dfa524d38c5b34675310739b9c9eae1861d2f363e806233297a561ba977ae766d",
//     "profile": {
//         "followed": false,
//         "backgroundUrl": "https://p2.music.126.net/pf6wr3laJhP56M-3UxfQNA==/109951164663755261.jpg",
//         "detailDescription": "",
//         "backgroundImgIdStr": "109951164663755261",
//         "avatarImgIdStr": "109951164345830726",
//         "userId": 1335174138,
//         "userType": 0,
//         "vipType": 0,
//         "nickname": "庚希XX",
//         "birthday": 1068304333147,
//         "gender": 1,
//         "province": 430000,
//         "city": 431000,
//         "avatarImgId": 109951164345830720,
//         "backgroundImgId": 109951164663755260,
//         "accountStatus": 0,
//         "avatarUrl": "https://p3.music.126.net/r0NFzjDum3fZeZBlRVLthA==/109951164345830726.jpg",
//         "defaultAvatar": false,
//         "expertTags": null,
//         "experts": {},
//         "mutual": false,
//         "remarkName": null,
//         "authStatus": 0,
//         "djStatus": 0,
//         "description": "",
//         "signature": "",
//         "authority": 0,
//         "avatarImgId_str": "109951164345830726",
//         "followeds": 4,
//         "follows": 8,
//         "eventCount": 0,
//         "avatarDetail": null,
//         "playlistCount": 7,
//         "playlistBeSubscribedCount": 0
//     },
//     "bindings": [
//         {
//             "userId": 1335174138,
//             "url": "",
//             "expired": false,
//             "refreshTime": 1515330812,
//             "bindingTime": 1515330812481,
//             "tokenJsonStr": "{\"countrycode\":\"\",\"cellphone\":\"15886576755\",\"hasPassword\":true}",
//             "expiresIn": 2147483647,
//             "id": 6520282062,
//             "type": 1
//         },
//         {
//             "userId": 1335174138,
//             "url": "",
//             "expired": true,
//             "refreshTime": 1539406290,
//             "bindingTime": 1515330777206,
//             "tokenJsonStr": "{\"access_token\":\"2EA0038B4E172F3D7687681E07E96A72\",\"refresh_token\":\"50598068E68960EF4C40A92325ACDB96\",\"openid\":\"AA4B0336B4452B16B47683F7CD91A35B\",\"nickname\":\"布尔什维\",\"expires_in\":7776000}",
//             "expiresIn": 7776000,
//             "id": 6520289040,
//             "type": 5
//         },
//         {
//             "userId": 1335174138,
//             "url": "",
//             "expired": true,
//             "refreshTime": 1565193068,
//             "bindingTime": 1565193068377,
//             "tokenJsonStr": "{\"access_token\":\"24_imEIWKd-93uDCquLN_Cvsl-VBQUFMG5OuAS5JyHZwxRUq7rCcVwpD7PbfYonBU2tRnq9F66J-XG7RITrm2ZX7kJE_DuVIhJ8WU9TVupwQ2Y\",\"refresh_token\":\"24_5X9C4DzXZKNm47U7ap-HVvjJ9FuzDWzPkwsC_dTsO5fBCQNBSBAgkFiR3DJ2tDP24uC0t8bD4qQytUe70ArWnzVJYwRsiCTwPxAtrDA-gMc\",\"unionid\":\"oZoefuPg7wswVs1-laIoy2xj_vQ4\",\"openid\":\"okvmMjmtXGSDVRviSsMuS8Fs2XjA\",\"scope\":\"snsapi_userinfo\",\"nickname\":\"Yeti\",\"expires_in\":7200}",
//             "expiresIn": 7200,
//             "id": 6934910317,
//             "type": 10
//         }
//     ],
//     "cookie": "MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/wapi/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Fri, 07 Oct 2022 02:31:27 GMT; Path=/;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/weapi/clientlog;;MUSIC_U=9ec094ef524df65688a8c414206df5d8c59c002467a7714607d16c73da299343993166e004087dd300b9079e6c75c15dfa524d38c5b34675310739b9c9eae1861d2f363e806233297a561ba977ae766d; Max-Age=1296000; Expires=Sat, 22 Oct 2022 02:31:27 GMT; Path=/;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/api/clientlog;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/neapi/feedback;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/weapi/feedback;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/wapi/feedback;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/neapi/feedback;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/eapi/feedback;;__csrf=f0e9d5be6f9fc0225763b67da9357ff9; Max-Age=1296010; Expires=Sat, 22 Oct 2022 02:31:37 GMT; Path=/;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/api/clientlog;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/api/feedback;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/api/feedback;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/neapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Sat, 22 Oct 2022 02:31:27 GMT; Path=/;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/eapi/feedback;;MUSIC_R_T=1515330904316; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1515330777193; Max-Age=2147483647; Expires=Wed, 25 Oct 2090 05:45:34 GMT; Path=/weapi/feedback;"
// }
            this.updateAccount(this.account)
            // this.getUserInfo(this.account.account.id)//测试时使用
            this.getUserInfo(this.account.id)
            setTimeout(() => {
                this.$router.go(0) 
            }, 2000);

        },
        // 获取用户基本信息
        async getUserInfo(uid) {
            const res = await this.$h.get('/user/detail?uid=' + uid)
            if (res.code !== 200) {
                ElMessage({
                    showClose: true,
                    message: '服务器出错！',
                    type: 'error',
                })
                return this.reload
            }
            // console.log(res);
            this.updateUserInfo(res)

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