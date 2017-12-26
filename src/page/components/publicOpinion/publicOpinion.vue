<template>
    <div class="opinion">
       <div>
           <div class="opinion-head">
               <div class="opinion-input">
                   <input type="text">
                   <button class="">&#xe6c3;</button>
               </div>
           </div>
           <div class="opinion-box">
               <div class="box-head">
                   <span>&#xe624;</span>新闻舆情
               </div>
               <div class="box">
                   <div class="item" v-for="(key,i) in list" v-if="i >= ((indexPage * pageSize) - pageSize) && i < (indexPage * pageSize)">
                       <div class="item-img"><img src="./../../../static/img/145.jpg" alt=""></div>
                       <div class="item-nr">
                           <div class="item-title">
                               <h5><a>{{key.title}}</a></h5>
                               <div class="item-class">
                                   <span>舆情类型</span>
                                   <span>舆情类型</span>
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
               <el-pagination
                       class="pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage4"
                       :page-sizes="[10, 20]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="list.length">
               </el-pagination>
           </div>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentPage4: 1,
                pageSize:10,
                indexPage:1,
                list:[
                    {
                        img:"",
                        title:"成都-北京..........1",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........2",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........3",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........10",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........11",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........20",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........21",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........30",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    },
                    {
                        img:"",
                        title:"成都-北京..........31",
                        text:'型舆情类型',
                        from:"北京民航网",
                        time:"2015.12.23"
                    }
                ]
            }
        },
        computed:{
            setList:function () {
                let a = [];
                this.list.forEach((v)=>{

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
            }
        },
    }
</script>
<style lang="scss" scoped>
    .opinion-input{
        position: absolute;
        top:42px;
        right: 710px;
        height: 38px;
        width: 383px;
        >input{
            width: 290px;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 0 0 20px;
            font-size: 14px;
            color: #605E7C;
            border-radius: 8px;
        }
        >button{
            background-color: white;
            outline: none;
            color: rgba(96, 94, 124, 0.6);
            box-shadow: none;
            border: none;
            width: 60px;
            margin: 0;
            padding: 0;
            height: 100%;
            border-radius:8px;
            font-family: iconfont;
            font-size: 4rem;
            line-height: 38px;
            color: #3c78ff;
            vertical-align: top;
            cursor: pointer;
            box-shadow: 1px 1px 6px rgba(60, 120, 255, 0.6);
            &:hover{
                background-color: #71c8ff;
                color: white;
            }
            &:active{
                background-color: #6abbff;
                color: white;
            }
        }
    }
    .pagination{
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
        >div{
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