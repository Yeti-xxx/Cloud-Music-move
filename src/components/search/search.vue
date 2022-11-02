<template>
    <div class="searchContainer">
        <el-card>
            <!-- 头部 包含返回按钮 搜索框 搜素按钮 -->
            <div class="top">
                <div class="back" @click="goBack">
                    <el-icon :size="26" color="#f9f9f9">
                        <Back />
                    </el-icon>
                </div>
                <div class="mid">
                    <div class="inputLeft">
                        <el-icon :size="18" color="#777777">
                            <Search />
                        </el-icon>
                    </div>
                    <div class="inputMid">
                        <input ref="searchInput" />
                    </div>
                    <div class="inputRight"></div>
                </div>
                <div class="right">
                    <span @click="searchKeyword">搜索</span>
                </div>
            </div>
            <!-- content分为初始状态 搜索建议 搜索结果展示状态 三个状态-->
            <!-- 初始状态包含历史和热搜榜 -->
            <div class="searchInit" v-if="searchContentFlag === 'init'">
                <div class="historyBox">
                    <div class="historyBoxTop">
                        <span>历史</span>
                        <div class="deleteBtn">
                            <el-icon :size="20" color="#848484">
                                <Delete />
                            </el-icon>
                        </div>
                    </div>
                    <div class="historyContent">
                        <div class="historyItem">
                            sad
                        </div>
                    </div>
                </div>
                <div class="searchHotBox">
                    <div class="searchHotBoxTop">
                        <span>热搜榜</span>
                    </div>
                    <div class="searchHotContent" v-for="(item, i) in searchHotArray" :key="i">
                        <div class="searchHotItem">
                            <div :class="[(i + 1) <= 3 ? 'hotIndex' : 'index']">{{ i + 1 }}</div>
                            <div class="searchcontent">{{ item.searchWord }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 搜索建议展示 -->
            <div class="searchSuggest" v-if="searchContentFlag === 'suggest'">
                <div class="suggestItem" v-for="(item, i) in searchSuggestArray" :key="i">
                    <div class="icon">
                        <el-icon :size="16" color="#777777">
                            <Search />
                        </el-icon>
                    </div>
                    <div class="keywords">
                        {{ item.keyword }}
                    </div>
                </div>
            </div>
            <!-- 搜索结果展示 -->
            <div class="searchResult" v-if="searchContentFlag === 'result'">
                <div class="searchResultBox">
                    <div class="resultItem" v-for="(item, i) in searchResult">
                        <div class="ItemLeft">
                            <el-avatar :size="50" :src="item[0].picUrl">

                            </el-avatar>
                        </div>
                        <div class="ItemRight">
                            <!-- <div class="order">{{}}</div> -->
                            <div class="name">{{ item[0].name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            searchHotArray: [],
            searchContentFlag: 'init',
            searchSuggestArray: [],
            searchResult: []
        }
    },
    computed: {
        ...mapState('m_home', ['searchHot'])
    },
    created() {
        this.searchHotArray = this.searchHot
    },
    mounted() {
        this.searchInputLisenter()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        // 通过input内容发送请求 获取搜索建议
        getSearchSuggest(value) {
            return this.$h.get('/search/suggest?keywords=' + value + '&type=mobile')
        },
        // 获取搜索结果
        getSearchResult(value) {
            return this.$h.get('/search/multimatch?keywords=' + value)
        },
        //按键监听函数
        searchInputLisenter() {
            let This = this
            let timer = null
            this.$refs.searchInput.addEventListener('input', function () {
                const keyWords = This.$refs.searchInput.value.replace(/\s/g, '') //去除空格
                clearTimeout(timer)
                timer = setTimeout(async () => {
                    if (!keyWords) {
                        return This.searchContentFlag = 'init'
                    } else {
                        This.searchContentFlag = 'suggest'
                        This.searchSuggestArray = []
                        const res = await This.getSearchSuggest(keyWords)
                        This.searchSuggestArray = res.result.allMatch
                    }
                }, 400)
            })
        },
        //点击搜索按钮
        async searchKeyword() {
            const keyword = this.$refs.searchInput.value.replace(/\s/g, '')
            if (!keyword) {
                return
            } else {
                this.searchContentFlag = 'result'
                this.searchResult = []
                const { result: res } = await this.getSearchResult(keyword)
                Object.keys(res).forEach(v => {
                    let o = {}
                    o[v] = res[v]
                    // o[v][0].order = v
                    this.searchResult.push(o[v])
                })
                console.log(this.searchResult);
                this.searchResult.pop()
            }
        }

    },
}

</script>

<style lang='less' scoped>
::v-deep(.el-card) {
    --el-card-padding: 0;
    --el-card-border-color: 0;
    background-color: #141414;
    height: 100%;
}

.searchContainer {
    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
        background-color: #2c2c2c;

        .back {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 13%;
        }

        .mid {
            position: relative;
            height: 35px;
            width: 74%;
            // background-color: #3d3d3d;

            .inputLeft {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                height: 35px;
                width: 35px;
                border-radius: 50%;
                background-color: #3d3d3d;
            }

            .inputMid {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 237px;
                margin-left: 20px;
                height: 35px;
                z-index: 999;
                background-color: #3d3d3d;

                input {
                    color: #c4c4c4;
                    font-size: 15px;
                    background: #3d3d3d;
                    outline: none;
                    border: 0px;
                    height: 60%;
                }
            }

            .inputRight {
                position: absolute;
                top: 0;
                right: 0;
                height: 35px;
                width: 35px;
                border-radius: 50%;
                background-color: #3d3d3d;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 13%;
            color: #fdfdfd;
            font-weight: 600;
        }
    }

    .searchInit {
        .historyBox {
            padding: 5px 10px;

            .historyBoxTop {
                display: flex;
                justify-content: space-between;

                span {
                    color: #ebebed;
                    font-size: 14px;
                    font-weight: 600;
                }
            }

            .historyContent {
                // display: grid;
                margin-top: 5px;
                display: flex;
                flex-wrap: wrap;

                .historyItem {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 15px;
                    margin-right: 15px;
                    padding: 3px 5px;
                    width: fit-content;
                    background-color: #2d2d2d;
                    color: #b8b8b8;
                    border-radius: 20%;
                }
            }

        }
    }

    .searchSuggest {
        .suggestItem {
            display: flex;
            height: 30px;
            align-items: center;
            padding: 8px 0;

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 10%
            }

            .keywords {
                line-height: 30px;
                width: 90%;
                border-bottom: 1px solid #202020;
                color: #ececec;
            }

        }
    }

    .searchResult {
        .searchResultBox {
            margin-top: 10px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            background-color: #2b2b2b;
            border-radius: 3%;

            .resultItem {
                padding: 7px;
                display: flex;
                align-items: center;

                .ItemRight {
                    margin-left: 20px;
                    display: flex;
                    align-items: center;
                    color: #eeecef;

                    .name {
                        margin-left: 8px;
                    }
                }
            }

        }
    }

    .searchHotBox {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        color: #e8e8e8;
        background-color: #2c2c2c;
        font-weight: 600;
        border-radius: 5%;
        padding: 15px;
        margin-top: 10px;

        .searchHotBoxTop {
            border-bottom: 1px solid #333333;
            padding-bottom: 10px;
        }

        .searchHotContent {
            .searchHotItem {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-top: 8px;

                .index {
                    width: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #b6b6b6;
                }

                .searchcontent {

                    margin-left: 8px;

                }

                .hotIndex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 18px;
                    color: #e04651;
                }
            }

        }
    }
}
</style>
