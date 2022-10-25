<!-- 日历组件 -->
<template>
    <div class="containerCalendar">
        <div :style="mt"></div>
        <div class="calendar" :style="screenChange">
            <div class="title">请选择</div>
            <div class="box">
                <div class="yearDayContainer">
                </div>
                <div class="MouthChoose"></div>
                <div class="dayChoose">
                    <ul class="weekArea">
                        <li class="weekItem" v-for="(item, i) in weekArray" :key="i">
                            {{ item }}
                        </li>
                    </ul>
                    <ul class="dataArea">
                        <li :class="['dataItem',item.isSelect?'dayChoose':'']" v-for="(item, i) in dataArray" :key="i" @click="chooseTheDay(item)">
                            {{ item.day }}
                        </li>
                    </ul>
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
            weekArray: ['日', '一', '二', '三', '四', '五', '六'],
            dataArray: Array(40).fill(0, 0, 40),
            selectData:{}
        }
    },
    created() {
        console.log(this.birthdayTimeInStore);
        this.dataArray = this.getMouthData(this.birthdayTimeInStore)
    },
    methods: {
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
            for (let i = 0; i < 6 - mouthStartWeekDay; i++) {
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
            if (item.type!=='normal') {
                return
            }
            this.dataArray.forEach(element=>{
                element.isSelect = false
            })
            item.isSelect = true
            this.selectData.day = item.day
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
    margin-top: 5%;
    width: 90%;
    height: 10%;
    background-color: pink;
}

.dayChoose {
    // box-sizing: border-box;
    // padding: 3px;
    margin-top: 5%;
    width: 90%;
    height: 51%;
    background-color: blueviolet;

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
        }

        .dayChoose {
            background-color: #cd3d3d;
            border-radius: 50%;
            margin: 0;
        }
    }
}
</style>
