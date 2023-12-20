<template>
    <div class="CropperContainer">
        <div class="cropperBtn">
            <div class="close" @click="closeCropper">
                <el-icon :size="24" color="#f2eeeb">
                    <Back />
                </el-icon>
                <span>图片裁剪</span>
            </div>
            <div class="save" @click="cropperImg">确认</div>
        </div>
        <vueCropper style="background-image:none" ref="cropper" :img="option.img" :outputSize="option.size"
            :outputType="option.outputType" :info="option.info" :full="option.full" :canMove="option.canMove"
            :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
            :enlarge="option.enlarge">
        </vueCropper>
    </div>
</template>

<script>
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
import { mapState, mapMutations } from 'vuex'
import { ElMessage } from 'element-plus'
import axios from 'axios'
export default {
    name: 'myCropper',
    components: {
        VueCropper
    },
    computed: {
        ...mapState('m_my', ['cookie'])
    },
    props: {
        imgurl: String
    },
    watch: {
        imgurl(newV, oldV) {
            this.option.img = this.imgurl
        }
    },
    created() {

    }
    ,
    data() {
        return {
            option: {
                img: '',
                outputSize: 1, //剪切后的图片质量（0.1-1）
                full: false,//输出原图比例截图 props名full
                outputType: 'png',
                canMove: true,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                autoCropWidth: 375,
                autoCropHeight: 375,
                fixedBox: false,
                blobImg: null,
                enlarge: 0.13333
            },
        }
    },
    inject: ['closeCropper'],
    methods: {
        cropperImg() {
            let This = this
            this.$refs.cropper.getCropBlob(data => {
                This.blobImg = data
                This.upload(This.blobImg)
            })
        },
        async upload(file) {
            let This = this
            const formData = new FormData()
            formData.append('imgFile', file)
            const { data: res } = await axios({
                method: 'post',
                // https://service-mlkn7ujm-1310291392.gz.apigw.tencentcs.com/release
                url: 'https://service-mlkn7ujm-1310291392.gz.apigw.tencentcs.com/release/avatar/upload?cookie=' + This.cookie + 'imgSize=375',
                // url: 'https://netease-cloud-music-api-nxzt.vercel.app/avatar/upload?cookie=' + This.cookie + 'imgSize=375',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            })
            if (res.code === 200) {
                ElMessage({
                    message: '保存成功！',
                    type: 'success',
                })
                return this.closeCropper()
            } else {
                return ElMessage({
                    message: '保存失败！',
                })
            }

        }
    }
}

</script>

<style lang='less' scoped>
.CropperContainer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;

    .cropperBtn {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-weight: 800;

        .close {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }
    }
}
</style>
