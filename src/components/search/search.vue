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
                        <input />
                    </div>
                    <div class="inputRight"></div>
                </div>
                <div class="right">
                    <span>搜索</span>
                </div>
            </div>
            <!-- content分为初始状态和搜索结果展示状态 -->
            <!-- 初始状态包含历史和热搜榜 -->
            <div class="searchInit">
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
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            searchHotArray: []
        }
    },
    computed: {
        ...mapState('m_home', ['searchHot'])
    },
    created() {
        this.searchHotArray = this.searchHot
        console.log(this.searchHotArray);
    },
    methods: {
        goBack() {
            this.$router.go(-1)
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
