<template>
    <div class="container">
        <div class="mt"></div>
        <div class="CalendarBox" v-if="calendarFlag">
            <myCalendar></myCalendar>
        </div>
        <div class="Top">
            <div class="Back" @click="close">
                <el-icon :size="24" color="#f2eeeb">
                    <Back />
                </el-icon>
                <span>我的资料</span>
            </div>
            <div class="saveRevise" @click="saveRevise">保存</div>
        </div>
        <el-card class="box-cardContainer">
            <div class="avatar col" @click="clickSvatarInput">
                <span>头像</span>
                <div class="avatarRevise">
                    <el-avatar :size="50" :src="userInfo.profile.avatarUrl" />
                </div>
            </div>
            <div class="nickname col" @click="nickNameFlag = true, modalFlag = true">
                <span>昵称</span>
                <span class="nicknameRevise right">{{ userInfo.profile.nickname }}</span>
            </div>
            <div class="gender col" @click="GenderBoxFlag = true; modalFlag = true">
                <span>性别</span>
                <span class="nicknameRevise right">{{ sex }}</span>
            </div>
        </el-card>
        <el-card class="box-cardContainer">
            <div class="gender col" @click="changCalendarFlag">
                <span>生日</span>
                <span class="nicknameRevise right">{{ birthdayTimeInStore.Y + '-' + birthdayTimeInStore.M + '-' +
                        birthdayTimeInStore.D
                }}</span>
            </div>
            <div class="area col" @click="signatureBoxFlag = true; modalFlag = true">
                <span>签名</span>
                <span class="nicknameRevise right">{{ signature }}</span>
            </div>
        </el-card>
        <!-- 性别选择面板 -->
        <div class="genderChooseBox" v-if="GenderBoxFlag">
            <div class="genderItem" @click="gender = 1; GenderBoxFlag = false; modalFlag = false">男</div>
            <div class="genderItem" @click="gender = 2; GenderBoxFlag = false; modalFlag = false">女</div>
            <div class="closeDote" @click="GenderBoxFlag = false; modalFlag = false">
                <el-icon>
                    <CloseBold />
                </el-icon>
            </div>
        </div>
        <!-- 签名修改面板 -->
        <div class="signatureBox genderChooseBox" v-if="signatureBoxFlag">
            <textarea ref="textareaInput"></textarea>
            <div class="closeDote signatureClose" @click="signatureText">
                <el-icon>
                    <CloseBold />
                </el-icon>
            </div>
        </div>
        <!-- 昵称修改面板 -->
        <div class="signatureBox genderChooseBox NickNameBox" v-show="nickNameFlag">
            <input ref="nickInput" />
            <div :class="nickMclass" ref="nickM"></div>
            <div class="closeDote signatureClose" @click="closeAndSaveNickname">
                <el-icon><Select /></el-icon>
            </div>
        </div>
        <!-- 模态框 -->
        <div class="modal" v-if="modalFlag"></div>
        <input ref="avatarInput" type="file" @change="getImg($event)" v-show="none" />
        <myCopper v-show="cropperFlag" v-bind:imgurl="url"></myCopper>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Avatars from '../avatar/avatar.vue';
import Copper from '../cropper/cropper.vue'
import mixinItem from '../../mixins/mixin.js'
import calendar from '../calendar/calendar.vue'
import { ElMessage } from 'element-plus'
export default {
    mixins: [mixinItem],
    name: 'reviseMyInfo',
    computed: {
        ...mapState('m_my', ['userInfo','cookie']),
        ...mapState('t_my', ['birthdayTimeInStore'])
    },
    components: {
        myCalendar: calendar,
        myCopper: Copper
    },
    data() {
        return {
            birthdayTimeStr: '',
            gender: 0,
            signature: '',
            birthdayTime: {},
            area: '',
            calendarFlag: false,
            GenderBoxFlag: false,
            modalFlag: false,
            signatureBoxFlag: false,
            nickNameFlag: false,
            sex: '',
            cropperFlag: false,
            nickMclass: '',
            url: '',
            timer: null,
            nickNameSucc: false
        }
    },
    watch: {
        gender(newV, oldV) {
            if (this.gender !== 1) {
                this.sex = '女'
            } else if (this.gender !== 0) {
                this.sex = '男'
            } else {
                this.sex = '保密'
            }
        },
        nickNameFlag(newV, oldV) {
            if (newV === true) {
                this.nickNameText()
            }
        }
    },
    async created() {
        this.signature = this.userInfo.profile.signature
        this.gender = this.userInfo.profile.gender
        if (this.gender !== 1) {
            this.sex = '女'
        } else if (this.gender !== 0) {
            this.sex = '男'
        } else {
            this.sex = '保密'
        }
        // const res = await this.$h.get('/user/update?nickname=庚希xx')

    },
    provide() {
        return {
            changCalendarFlag: this.changCalendarFlag,
            closeCropper: this.closeCropper
        }
    },
    mounted() {
        // this.nickNameText()
    },
    methods: {
        close() {
            this.$router.go(-1)
        },
        // 控制日历组件的创建与销毁
        changCalendarFlag() {
            this.calendarFlag = !this.calendarFlag
        },
        // 保存签名到data中
        signatureText() {
            this.signature = this.$refs.textareaInput.value
            this.signatureBoxFlag = false
            this.modalFlag = false

        },
        // 保存修改的资料
        async saveRevise() {
            // 获取选中的生日日期时间戳
            let d = new Date(this.birthdayTimeInStore.Y, this.birthdayTimeInStore.M - 1, this.birthdayTimeInStore.D)
            let timeStr = d.getTime(d)
            const res = await this.$h.get('/user/update'+'?cookie='+localStorage.getItem('wyCookie')+'?gender=' + this.gender + '&signature=' + this.signature + '&city=' + this.userInfo.profile.city + '&nickname=' + this.userInfo.profile.nickname + '&birthday=' + timeStr + '&province=' + this.userInfo.profile.province)
            if (res.code === 200) {
                return ElMessage({
                    message: '保存成功！',
                    type: 'success',
                })
            } else {
                return ElMessage('保存失败！')
            }

        },
        // 模拟点击input
        clickSvatarInput() {
            this.$refs.avatarInput.click()
        },
        // 获取file对象
        getImg(e) {
            let file = e.target.files[0]
            let This = this
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                This.url = 'data:image/png;base64,' + this.result.substring(this.result.indexOf(',') + 1);
            }
            this.cropperFlag = true
            this.$refs.avatarInput.value = null
        },
        // 关闭图片裁剪组件
        closeCropper() {
            this.cropperFlag = false
        },
        // 
        nickNameText() {
            let This = this
            this.$refs.nickInput.addEventListener('input', function (timer) {
                clearTimeout(This.timer)
                This.timer = setTimeout(() => {
                    //输入完成之后首先判断是否合法
                    if (This.$refs.nickInput.value.length < 4) {
                        This.$refs.nickM.innerHTML = '昵称不能少于两个汉字或4个英文字符'
                        This.nickMclass = 'errM'
                        This.nickNameSucc = false
                    } else {
                        //合法时发送请求查看名字是否存在
                        This.$h.get('/nickname/check?nickname=' + This.$refs.nickInput.value).then(res => {
                            if (res.duplicated === false) {
                                This.$refs.nickM.innerHTML = '昵称可用~'
                                This.nickMclass = 'succM'
                                This.nickNameSucc = true
                            } else {
                                This.$refs.nickM.innerHTML = '昵称被占用，试试其他的吧'
                                This.nickMclass = 'errM'
                                This.nickNameSucc = false
                            }
                        }).catch(err => {
                            This.$refs.nickM.innerHTML = '昵称被占用，试试其他的吧'
                            This.nickMclass = 'errM'
                            This.nickNameSucc = false
                        })
                    }
                }, 1000)
            })


        },
        // 关闭昵称修改框并保存
        closeAndSaveNickname() {
            this.nickNameFlag = false
            this.modalFlag = false
            if (this.nickNameSucc) {
                this.userInfo.profile.nickname = this.$refs.nickInput.value
            }
        }

    }
}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
    --el-card-padding: 0;
    border: 0;
}

// .CalendarBox {
//     position: absolute;
//     top: 15%;
//     left:50%;
//     transform: translateX(-50%);
// }

.container {
    position: relative;
    width: 100%;
    height: 100%;

    .genderChooseBox {
        position: absolute;
        width: 85%;
        height: 15%;
        background-color: #1c1c1e;
        left: 50%;
        top: 40%;
        transform: translateX(-50%);
        z-index: 999;
        border-radius: 3%;

        textarea {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            padding-top: 5px;
            background-color: #1c1c1e;
            width: 90%;
            height: 90%;
            /*别忘了文本域的box-sizing属性值是border-box;所有的边框和padding都是在你固定的宽高的基础上绘制*/
            /*去除点击出现轮廓颜色*/
            outline: none;
            /*如果有需要，去掉右下角的可拉伸变大小的图标和功能*/
            resize: none;
            border: 0;
            color: #e9e9e7;
            font-size: 15px;
            font-weight: 800;
            /*padding已在重置样式中去除，如果没有去除，记得有padding哦*/
        }

        .closeDote {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #999999;
            margin-top: 20%;
            color: #fff;
        }

        .signatureClose {
            margin-top: 40%;
        }

        .genderItem {
            box-sizing: border-box;
            padding-left: 20px;
            padding-top: 15px;
            margin-top: 5px;
            width: 100%;
            height: 35%;
            color: #e9e9e9;
            font-weight: 500;
        }
    }

    .NickNameBox {
        height: 12%;
        padding-left: 15px;

        input {
            width: 90%;
            height: 60%;
            outline: none;
            /*如果有需要，去掉右下角的可拉伸变大小的图标和功能*/
            resize: none;
            border: 0;
            font-size: 18px;
            background-color: #1c1c1e;
            color: #fff;
        }

        .errM {
            color: #fd3a39;
            font-size: 13px;
        }

        .succM {
            color: #cfcfcf;
            font-size: 13px;
        }
    }

    .modal {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
    }
}

.Top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    background-color: #2b2b2b;

    .Back {
        display: flex;
        align-items: center;
    }

    span {
        margin-left: 10px;
        color: #ffffff;
        font-weight: 600;

    }

    .saveRevise {
        margin-right: 4.2%;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
    }
}

.saveRevise {
    margin-right: 10px;
}

.box-cardContainer {
    margin-top: 10px;
    background-color: #2b2b2b;
    padding: 0 10px;

    .col {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        border-bottom: 1px solid #373737;

        span {
            margin-left: 3px;
            color: #e9e9e9;
            font-size: 16px;
        }

        .right {
            font-size: 15px;
            color: #a0a0a0;
        }
    }
}
</style>
