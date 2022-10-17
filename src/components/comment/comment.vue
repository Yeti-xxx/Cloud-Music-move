<template>
    <div class="commentContainer" ref="commentContainer">
        <el-card class="box-card">
            <!-- 顶部 -->
            <div class="top">
                <div class="close" @click="closed">
                    <el-icon :size="20">
                        <ArrowLeft />
                    </el-icon>
                    <span>评论(40)</span>
                </div>
            </div>
            <!-- 评论内容区域 -->
            <div class="content">
                <div class="contentTop">
                    <div class="title">评论区</div>
                    <div class="choose">
                        <div :class="['recommend','chooseItem',getNum===1?'get':'']" @click="changeGetNum(1)">推荐</div>
                        <div :class="['hot','chooseItem',getNum===2?'get':'']" @click="changeGetNum(2)">最热</div>
                        <div :class="['new','chooseItem',getNum===3?'get':'']" @click="changeGetNum(3)">最新</div>
                    </div>
                </div>
                <div class="UserComment" v-for="(item,i) in commentArray" :key="i">
                    <div class="left">
                        <div class="avatar">
                            <el-avatar :size="30" :src=item.user.avatarUrl />
                        </div>
                    </div>
                    <div class="right">
                        <div class="userName">{{item.user.nickname}}</div>
                        <div class="time">{{item.timeStr}}<span class="location">来自 {{item.ipLocation.location}}</span>
                        </div>

                        <div class="Usercontent">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评论框 -->
            <el-card class="box-card commentInput">
                <div class="text">
                    <textarea rows="" cols="" ref="textArea" @focus="clearWord"></textarea>
                    <div class="sentBtn" @click="sentComment">发送</div>
                </div>
            </el-card>
        </el-card>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    name: 'comment',
    created: {

    },
    data() {
        return {
            type: null,         //判断需要获取的是 0: 歌曲 1: mv 2: 歌单 的评论
            id: null,
            sortType: '1',       //排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
            commentArray: [],     //评论数组
            prePath: '',        //保存上一页面地址
            getNum: 1

        }
    },
    methods: {
        async sentComment() {
            if (this.$refs.textArea.value == '') {
                return ElMessage({
                    showClose: false,
                    message: '评论内容为空',
                    center: true,
                })
            }
            console.log(this.$refs.textArea.value);
            const res = await this.$h.get('/comment?t=1&type=0&id=' + this.id + '&content=' + this.$refs.textArea.value)
            if (res.code === 200) {
                this.$refs.textArea.value = ''
                ElMessage({
                    showClose: false,
                    message: '发布成功',
                    center: true,
                })
                return this.changeGetNum(3)
            }
        },
        // 清除默认文本
        clearWord() {
            if (this.$refs.textArea.value === '这一次也许就是你上热评了') {
                this.$refs.textArea.value = ''
            }
        },
        // 默认文本
        textAreaWord() {
            this.$refs.textArea.value = '这一次也许就是你上热评了'
        },
        // 按需获取评论
        changeGetNum(num) {
            this.getNum = num
            this.sortType = num
            this.getComment(this.type, this.id, this.sortType)
        },
        closed() {
            // this.$router.push({
            //     path:this.prePath,
            //     query:{
            //         id:this.id
            //     }
            // })
            this.$router.go(-1)
            // 显示播放器
            this.DisplayMusictoApp()
        },
        //获取评论函数
        async getComment(type, id, sortType) {
            this.commentArray = []
            const res = await this.$h.get('/comment/new?type=' + type + '&id=' + id + '&sortType=' + sortType + '&pageSize=40&pageNo=1')
            for (let i = 0; i < res.data.comments.length; i++) {
                const resfilter = this.filterComment(res.data.comments[i], ['user', 'content', 'timeStr', 'ipLocation']);
                this.commentArray.push(resfilter)
            }
        },
        // 过滤getComment中得到的初步数据
        filterComment(obj, arr) {
            const res = {}
            Object.keys(obj).filter((key) => arr.includes(key)).forEach(key => {
                res[key] = obj[key]
            });
            return res
        },
        //判断是否需要继续获取数据
        getNewComment() {
            this.$refs.commentContainer.addEventListener('touchstart', function (e) {
                let clientHeight = document.documentElement.clientHeight; //浏览器高度
                let scrollHeight = document.body.scrollHeight;
                let scrollTop = document.documentElement.scrollTop;
                let distance = 170  //距离可视窗口多高时发起请求
                if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {

                }
            }, false)
        }
    },
    mounted() {
        this.getNewComment()
        this.textAreaWord()
    },
    inject: ['DisplayMusictoApp'],
    created() {
        // 隐藏播放器
        this.DisplayMusictoApp()
        // 判断需要获取的评论类型
        switch (this.$route.query.id.charAt(0)) {
            case 's':
                this.type = 0
                break;
            case 'm':
                this.type = 1
                break;
            case 'l':
                this.type = 2
                break;
        }
        // split 出id
        this.id = this.$route.query.id.split('sid')[1]
        this.getComment(this.type, this.id, this.sortType)
        // this.prePath = this.$route.query.pAth
    },

}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
    --el-card-padding: 0;
    --el-card-border-color: 0;
    background-color: #2b2b2b;
}

.commentContainer {
    background: #2b2b2b;

    // 被选中则添加该样式
    .get {
        color: #fefefe;
    }

    .top {
        display: flex;
        height: 50px;
        background: #2b2b2b;
        color: #fefefe;
        align-items: center;
        padding-left: 10px;
        font-weight: 600;

        .close {
            display: flex;
            align-items: center;

            span {
                margin-left: 10px;
            }
        }
    }

    .content {
        background: #141414;
        padding: 5px;

        .contentTop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;

            .title {
                padding: 10px;
                font-size: 14px;
                color: #fefefe;
            }

            .choose {
                display: flex;
                font-size: 14px;
                color: #959595;
            }

            .chooseItem {
                margin-right: 10px;
            }
        }

        .UserComment {
            margin-top: 15px;
            display: flex;

            .left {
                padding-left: 10px;
                padding-right: 5px;
            }

            .right {
                width: 318px;
                border-bottom: 1px solid #4b4949;

                .userName {
                    padding: 3px;
                    color: #e7e7e7;
                    font-size: 12px;
                    font-weight: 500;
                }

                .time {
                    color: #959595;
                    font-size: 12px;
                    transform: scale(0.85);
                    margin-left: -25px;

                    .location {
                        margin-left: 10px;
                    }
                }

                .Usercontent {
                    color: #dfdbdb;
                    margin-top: 5px;
                    font-size: 14px;
                    font-weight: 500;
                    padding: 2px;
                    padding-bottom: 5px;
                    overflow: hidden;
                    /*将对象作为弹性伸缩盒子模型显示*/
                    display: -webkit-box;
                    /*设置子元素排列方式*/
                    -webkit-box-orient: vertical;
                    /*设置显示的行数，多出的部分会显示为...*/
                    -webkit-line-clamp: 6;
                }
            }
        }
    }

    .commentInput {

        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 999;

        .text {
            width: 100%;
            display: flex;
            justify-content: center;

            textarea {
                padding: 10px;
                color: #fefefe;
                font-weight: 600;
                width: 80%;
                height: 30px;
                outline: none;
                resize: none;
                border: 0;
                background-color: #2b2b2b;
            }
        }

        .sentBtn {
            height: 50px;
            color: #efefef;
            line-height: 48px;
            font-size: 14px;
        }
    }
}
</style>
