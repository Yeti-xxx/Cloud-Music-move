<!-- 日历组件 -->
<template>
    <div class="containerCalendar">
        <div :style="mt"></div>
        <div class="calendar" :style="screenChange">
            <div class="title">请选择</div>
            <div class="box">
                <div class="yearDayContainer">
                    <div class="yearChoose" @click="MYflagChange(false)">
                        {{ this.selectData.Year }}年
                    </div>
                    <div class="BigMouthAndDay" @click="MYflagChange(true)">
                        {{ this.selectData.Mouth }}月{{ this.selectData.Day }}日周{{ ChinaWeek[this.selectData.Week] }}
                    </div>
                </div>
                <div class="MouthChoose" v-if="MYflag">
                    <div class="preMouth" @click="changeMouth('pre')">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                    </div>
                    <div class="yearAndMouth">
                        {{ birthdayTimeInStore.Y }}年{{ birthdayTimeInStore.M }}月
                    </div>
                    <div class="nextMouth" @click="changeMouth('next')">
                        <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </div>
                </div>
                <div class="dayChoose" v-if="MYflag">
                    <ul class="weekArea">
                        <li class="weekItem" v-for="(item, i) in weekArray" :key="i">
                            {{ item }}
                        </li>
                    </ul>
                    <ul class="dataArea">
                        <li :class="['dataItem', item.isSelect ? 'dayChoose' : '']" v-for="(item, i) in dataArray"
                            :key="i" @click="chooseTheDay(item)">
                            {{ item.day }}
                        </li>
                    </ul>
                </div>
                <div class="YearChooseBox" v-if="!MYflag" id="YearChooseBox">
                    <div :class="['yearItem', yearArray[i] === selectData.Year ? 'theYear' : '']"
                        v-for="(item, i) in yearArray" :key="i" @click="changeSelectYear(item)">
                        {{ item }}
                    </div>
                </div>
                <div class="foot">
                    <div class="close" @click="close">取消</div>
                    <div class="sure" @click="sureTime">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'calendar',
    computed: {
        ...mapState('t_my', ['birthdayTimeInStore'])
    },
    inject: ['changCalendarFlag'],
    data() {
        return {
            screenChange: {
                position: 'absolute',
                width: document.documentElement.clientWidth * 0.9 + 'px',
                height: document.documentElement.clientHeight * 0.8 + 'px',
                transform: 'translateX(-50%)',
                top: '15%',
                left: '50%',
            },
            mt: {
                position: 'absolute',
                width: document.documentElement.clientWidth + 'px',
                height: document.documentElement.clientHeight + 'px',
                background: 'rgba(0,0,0,.5)'
            },
            theYear: {

            },
            weekArray: ['日', '一', '二', '三', '四', '五', '六'],
            dataArray: Array(40).fill(0, 0, 40),
            ChinaWeek: ['日', '一', '二', '三', '四', '五', '六'],
            selectData: {},
            MYflag: true,
            yearArray: []
        }
    },
    created() {
        //初始化选中日期
        this.selectData.Day = this.birthdayTimeInStore.D
        this.selectData.Mouth = this.birthdayTimeInStore.M
        this.selectData.Year = this.birthdayTimeInStore.Y
        this.selectData.Week = new Date(this.selectData.Year, this.selectData.Mouth - 1, this.selectData.Day).getDay()
        this.dataArray = this.getMouthData(this.birthdayTimeInStore)
        for (let i = 0; i <= 2100 - 1920; i++) {
            this.yearArray[i] = 1920 + i

        }

    },
    mounted() {
    },
    methods: {
        ...mapMutations('t_my', ['updatedBirthdayTimeInStore']),
        // 获取当年的月份数据
        getMouthData(birthdayTime) {
            let dataArray = []
            let daysInMouth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            // 闰年判断
            if ((birthdayTime.Y % 4 === 0 && birthdayTime.Y % 100 !== 0) || birthdayTime.Y % 400 == 0) {
                daysInMouth[1] = 29
            }
            // 获取该年该月一号的星期 如11月1日
            const mouthStartWeekDay = new Date(birthdayTime.Y, birthdayTime.M - 1, 1).getDay()
            // 获取该年该月的下一月一号的星期 则此处获取12月1日
            const mouthEndWeekDay = new Date(birthdayTime.Y, birthdayTime.M, 1).getDay()
            // 填充数据
            for (let i = 0; i < mouthStartWeekDay; i++) {
                let emptDay = {
                    type: 'pre',
                    day: '',
                    mouth: '',
                    year: ''
                }
                dataArray.push(emptDay)
            }
            for (let i = 0; i < daysInMouth[birthdayTime.M - 1]; i++) {
                let ItemDay = {
                    type: 'normal',
                    day: i + 1,
                    mouth: birthdayTime.M,
                    year: birthdayTime.Y,
                    isSelect: Number(birthdayTime.D) === i + 1
                }
                dataArray.push(ItemDay)
            }
            for (let i = 0; i < 6 - mouthEndWeekDay; i++) {
                let emptDay = {
                    type: 'next',
                    day: '',
                    mouth: '',
                    year: ''
                }
                dataArray.push(emptDay)
            }
            return dataArray
        },
        // 选择某一天时
        chooseTheDay(item) {
            //空的日期不可选择
            if (item.type !== 'normal') {
                return
            }
            this.dataArray.forEach(element => {
                element.isSelect = false
            })
            item.isSelect = true
            this.birthdayTimeInStore.D = item.day
            this.selectData.Day = item.day
            this.selectData.Mouth = this.birthdayTimeInStore.M
            this.selectData.Year = this.birthdayTimeInStore.Y
            this.selectData.Week = new Date(this.selectData.Year, this.selectData.Mouth - 1, this.selectData.Day).getDay()
        },
        //切换月份操作
        changeMouth(flag) {
            if (flag === 'pre') {
                if (this.birthdayTimeInStore.M === 1) {
                    this.birthdayTimeInStore.Y = this.birthdayTimeInStore.Y - 1
                    this.birthdayTimeInStore.M = 12
                } else {
                    this.birthdayTimeInStore.M = this.birthdayTimeInStore.M - 1
                }
                this.dataArray = this.getMouthData(this.birthdayTimeInStore)
            } else {
                if (this.birthdayTimeInStore.M === 12) {
                    this.birthdayTimeInStore.Y = this.birthdayTimeInStore.Y + 1
                    this.birthdayTimeInStore.M = 1
                } else {
                    this.birthdayTimeInStore.M = this.birthdayTimeInStore.M + 1
                }
                this.dataArray = this.getMouthData(this.birthdayTimeInStore)
            }
        },
        // 点击取消按钮
        close() {
            this.changCalendarFlag()
        },
        // 点击确定
        sureTime() {
            this.updatedBirthdayTimeInStore(this.birthdayTimeInStore)
            this.changCalendarFlag()
        },
        MYflagChange(flag) {
            this.MYflag = flag
            let This = this
            if (flag === false) {
                setTimeout(() => {
                    This.yearBoxTop()
                }, 10)
            } else {
                this.getMouthData(this.birthdayTimeInStore)
                
            }
        },
        // 控制滚动条
        yearBoxTop() {
            // 单个yearItem的高度
            const h = Math.ceil(document.querySelector('.box').clientHeight * 0.62 * 0.1428)
            let This = this
            let num = 0
            this.yearArray.forEach((element, i) => {
                if (element === This.selectData.Year) {

                    return num = i
                }
            })
            document.getElementById('YearChooseBox').scrollTop = Math.floor(h * num) - h * 0.5
        },
        // 当yearItem被单击
        changeSelectYear(Year) {
            this.selectData.Year = Year
            this.birthdayTimeInStore.Y = Year
            this.dataArray = this.getMouthData(this.birthdayTimeInStore)

        }

    }
}

</script>

<style lang='less' scoped>
.calendar {

    box-sizing: border-box;
    background-color: #fefefe;
    border-radius: 2%;
    padding: 14px;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.yearDayContainer {
    margin-top: 5%;
    width: 100%;
    height: 20%;
    background-color: #cd3d3d;
}

.MouthChoose {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 5%;
    width: 90%;
    height: 10%;
    // background-color: pink;
    color: #212121;
    font-weight: 700;

    .yearAndMouth {
        position: relative;
        top: -3px;
    }

}

.dayChoose {
    transition: opacity .5s;
    // box-sizing: border-box;
    // padding: 3px;
    margin-top: 5%;
    width: 90%;
    height: 51%;
    // background-color: blueviolet;

    .weekArea {
        width: 100%;
        display: flex;
        margin: 0;
        padding: 0;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #777777;

        .weekItem {
            // display: flex;
            flex: 0 0 14.285%;
            list-style-type: none;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }

    .dataArea {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        margin: 0;
        padding: 0;

        .dataItem {
            flex: 0 0 14.285%;
            width: 40px;
            height: 40px !important;
            line-height: 40px;
            list-style-type: none;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
        }

        .dayChoose {
            background-color: #cd3d3d;
            border-radius: 50%;
            margin: 0;
        }
    }
}

.yearDayContainer {
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: 25px;

    .yearChoose {
        font-size: 16px;
        color: #efc5c6;
    }

    .BigMouthAndDay {
        font-size: 32px;
        color: #ffffff;
    }
}

.YearChooseBox {
    width: 100%;
    height: 62%;
    // background-color: pink;
    overflow: hidden;
    overflow-y: scroll;

    /*总是显示滚动条*/
    .yearItem {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e0e0e0;
        height: 14.28%;
    }

    .theYear {
        font-size: 22px;
        color: #cd3d3d;
    }
}

.foot {
    position: absolute;
    display: flex;
    font-size: 14px;
    color: #f83b3c;
    font-weight: 600;
    right: 4%;
    bottom: 6%;

    .close {
        margin-right: 50px;
    }
}
</style>
