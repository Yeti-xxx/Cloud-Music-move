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
            </div>
            <span>我的资料</span>
        </div>
        <el-card class="box-cardContainer">
            <div class="avatar col">
                <span>头像</span>
                <div class="avatarRevise">
                    <el-avatar :size="50" :src="userInfo.profile.avatarUrl" />
                </div>
            </div>
            <div class="nickname col">
                <span>昵称</span>
                <span class="nicknameRevise right">{{ userInfo.profile.nickname }}</span>
            </div>
            <div class="gender col">
                <span>性别</span>
                <span class="nicknameRevise right">{{ sex }}</span>
            </div>
        </el-card>
        <el-card class="box-cardContainer">
            <div class="gender col" @click="changCalendarFlag">
                <span>生日</span>
                <span class="nicknameRevise right">{{ birthdayTimeInStore.Y + '-' + birthdayTimeInStore.M + '-' + birthdayTimeInStore.D
                }}</span>
            </div>
            <div class="area col">
                <span>签名</span>
                <span class="nicknameRevise right">{{ userInfo.profile.signature }}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Avatars from '../avatar/avatar.vue';
import mixinItem from '../../mixins/mixin.js'
import calendar from '../calendar/calendar.vue'
export default {
    mixins: [mixinItem],
    name: 'reviseMyInfo',
    computed: {
        ...mapState('m_my', ['userInfo']),
        ...mapState('t_my', ['birthdayTimeInStore'])
    },
    components: {
        myCalendar: calendar
    },
    data() {
        return {
            birthdayTimeStr: '',
            gender: 0,
            birthdayTime: {},
            area: '',
            calendarFlag: false,

        }
    },
    async created() {
        this.gender = this.userInfo.profile.gender
        if (this.gender !== 1) {
            this.sex = '女'
        } else if (this.gender !== 0) {
            this.sex = '男'
        } else {
            this.sex = '保密'
        }
        this.cityIdtoArea()
        // // 获取生日时间戳
        // this.birthdayTimeStr = this.userInfo.profile.birthday
        // //调用公共方法，转为 YY-MM-DD
        // this.birthdayTime = this.getDate(this.birthdayTimeStr)
        const res = await this.$h.get('/user/update?gender=0&signature=测试签名&city=440300&nickname=庚希xx&birthday=1525918298004&province=440000')
        console.log(res);
    },
    provide() {
        return {
            changCalendarFlag:this.changCalendarFlag
        }
    },
    methods: {
        close() {
            this.$router.go(-1)
        },
        // 控制日历组件的创建与销毁
        changCalendarFlag() {
            this.calendarFlag = !this.calendarFlag
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


.Top {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: #2b2b2b;

    span {
        margin-left: 10px;
        color: #ffffff;
        font-weight: 600;

    }
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
