<template>
    <div class="opinion">
        <div>
            <div class="opinion-head">
                <div class="opinion-input">
                    <input type="text" v-model="inputText" @keydown="quResData($event)">
                    <button @click="quResData()">&#xe6c3;</button>
                </div>
            </div>
            <div class="opinion-box">
                <div class="box-head">
                    <span>&#xe624;</span>新闻舆情
                </div>
                <div class="box">
                    <div class="item" v-for="(key,i) in list">
                        <div class="item-img"><img :src="key.img" alt=""></div>
                        <div class="item-nr">
                            <div class="item-title">
                                <h5><a @click="openWindow(key.src)">{{key.title}}</a></h5>
                                <div class="item-class">
                                    <span>舆情类型</span>
                                </div>
                            </div>
                            <p>{{key.text}}</p>
                            <div class="item-time">
                                <span>{{key.from}}</span>
                                {{key.time}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-item" v-if="nopo">没有匹配到舆情</div>
                <el-pagination
                        v-if="list.length > 0"
                        class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :total="totalLength">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import noimg from './../../../static/img/pubo/noimg.png';
    import { Loading } from 'element-ui';
    export default {
        data() {
            return {
                initText: false,
                inputText: '',      // 模糊查询的文字
                totalLength: 0,   // 总条数
                currentPage4: 1, // 下标的页数
                pageSize: 10,    // 每页的条数
                indexPage: 1,    // 最开始的页数
                list: [],
                nopo:false,
                loading:null
            }
        },
        mounted: function () {
            tabulationBoxTrigger.$on("moreNews",val=>{
                this.inputText = val;
                alert(val)
            });
            this.resData();
        },
       /* beforeDestory(){
             tabulationBoxTrigger.$on("moreNews",val=>{
                this.inputText = val;
                alert("ddddd")
            });
         },*/
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
            setList: function () {
                let a = [];
                this.list.forEach((v) => {

                });
                return a;
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.indexPage = val;
                this.resData();
            },
            openWindow(src) {
                window.open(src);
            },
            quResData: function (e) {
                if( e != undefined){
                    if(e.keyCode != 13){
                        return;
                    }
                };
                this.indexPage = 1;
                this.list = [];
                this.resData();
            },
            custrol(data) {
                if (data.opResult == "0") {
                    if (data.obj != undefined && data.obj != null && data.obj[0].length != 0) {
                        this.totalLength = Number(data.obj[0].articleCount);
                        let arr = [];
                        data.obj.forEach((val) => {
                            arr.push({
                                img: val.articleImage == "" ? noimg : val.articleImage,
                                title: val.articleTitle,
                                text: val.articleContent,
                                from: val.articleFrom,
                                time: val.articleTime,
                                src: val.articleUrl
                            })
                        });
                        this.list = arr;
//                        if (this.list.length == 0) {
//                            this.list = arr;
//                        } else {
//                            this.list = this.list.concat(arr);
//                        }
                    }
                }else if(data.opResult == "1"){
                    this.list = [];
                };
                if(this.list.length == 0){
                    this.nopo = true;
                }else{
                    this.nopo = false;
                }
            },
            resData: function () {
                this.loading = Loading.service({
                    text:"努力加载中..."
                });
                let text = {
                    code: this.inputText,
                    type: this.inputText == "" ? 1 : 0,
                    codeType: 2,
                    page: this.indexPage
                };
                this.$ajax({
                    method: 'post',
                    url: '/getPublicOpinionList',
                    params: text,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        this.custrol(response.data);
                        this.loading.close();
                    })
                    .catch((error) => {
                            this.loading.close();
                            console.log(error);
                        }
                    );
            }
        },
    }
</script>
<style lang="scss" scoped>
    .no-item{
        color: red;
    }
    .opinion-input {
        position: absolute;
        top: 42px;
        right: 710px;
        height: 38px;
        width: 383px;
        > input {
            width: 290px;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 0 0 20px;
            font-size: 14px;
            color: #605E7C;
            border-radius: 8px;
        }
        > button {
            background-color: white;
            outline: none;
            color: rgba(96, 94, 124, 0.6);
            border: none;
            width: 60px;
            margin: 0;
            padding: 0;
            height: 100%;
            border-radius: 8px;
            font-family: iconfont;
            font-size: 4rem;
            line-height: 38px;
            color: #3c78ff;
            vertical-align: top;
            cursor: pointer;
            box-shadow: 0px 2px 16px rgba(4, 7, 156, 0.4) !important;
            &:hover {
                /*background-color: rgba(225,225,225,.6);*/
                /*color: white;*/
            }
            &:active {
                background-color: rgba(60,120,225,.9);
                color: white;
            }
        }
    }

    .pagination {
        float: right;
        margin-bottom: 83px;
    }

    .item-class {
        > span {
            padding: 3px 12px;
            background-color: #97c889;
            color: white;
            border-radius: 5px;
            margin-right: 3px;
        }
    }

    .item-time {
        color: rgba(96, 94, 124, .8);
        > span {
            margin-right: 18px;
        }
    }

    .item-nr {
        padding-left: 26px;
        flex: 1;
        > p {
            text-indent: 25px;
            height: 55px;
            padding: 0;
            margin: 0 0 5px 0;
            width: 850px;
            color: #605E7C;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px
        }
    }

    .item-title {
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > h5 {
            padding: 0;
            margin: 0;
            font-size: 1.4rem;
            > a {
                cursor: pointer;
                text-decoration: underline;
                &:hover {
                    color: #51a2ff;
                }
                &:active {
                    color: #3c78ff;
                }
            }
        }
    }

    .item-img {
        width: 170px;
        height: 110px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        > img {
            /*width: 100%;*/
            height: 100%;
        }
    }

    .item {
        padding: 10px;
        height: 128px;
        border: 1px solid #e2e2e2;
        display: flex;
        margin: 4px 0;
    }

    .opinion {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 12;
        background-color: #f8f8f8;
        overflow-y: scroll;
        > div {
            background-color: #f8f8f8;
            overflow: hidden;
        }
    }

    .opinion-head {
        height: 120px;
        background-color: #3c78ff;
        position: fixed;
        top: 0;
        width: 100%;
    }

    .opinion-box {
        width: 1068px;
        margin: 120px auto 0;
        padding: 25px 16px 0 16px;
        background-color: white;
    }

    .box-head {
        height: 66px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e2e2e2;
        color: #605E7C;
        font-weight: bold;
        font-size: 1.4rem;
        margin-bottom: 20px;
        > span {
            font-weight: normal;
            font-family: iconfont;
            font-size: 1.6rem;
            margin-right: 10px;
            /*transform: translateY(0px);*/
        }
    }

    .box {
        margin-bottom: 38px;
    }
</style>
