<template>
  <div class="banner-nav" :style="{'top':(models.height/2 - 82) + 'px'}">
      <ul>
          <li :class="{'banner-nav-set':setBan == i}" v-for="(key,i) in ban" @click="setBaner(i)">
              <div>{{key.n}}</div>
              <div>{{key.s}}</div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    data(){
        return{
            models:{
                width:0,
                height:0
            },
            ban:[{
                    n:"01",
                    s:"产品介绍"
                },
                {
                    n:"02",
                    s:"优势"
                },
                {
                    n:"03",
                    s:"联系我们"
                }
            ],
            setBan:0
        }
    },
    props:["updata"],
    watch:{
        updata:function(){
            let num = Math.round(document.getElementById("case").scrollTop/document.getElementById("case").offsetHeight +1)
            console.log(num);
            switch(num){
                case 1:
                case 2:
                case 3:
                this.setBan = 0;
                break;
                case 4:
                this.setBan = 1;
                break;
                case 5:
                this.setBan = 2;
            }
        }
    },
    mounted:function(){
       this.initBox();
    },
     methods:{
        initBox(){
            let bd = document.getElementsByTagName("body");
            this.models = {
                width:bd[0].offsetWidth,
                height:bd[0].offsetHeight,
            };
        },
        setBaner(i){
            let tl = 0 ;
            switch(i){
                case 0:
                    tl = 0;
                break;
                case 1:
                    tl = 3;
                break;
                case 2:
                    tl = 4;
                break;
            };
            document.getElementById("case").scrollTop = document.getElementById("case").offsetHeight  * tl;
            this.$emit("reqUp");
        }
    }
}
</script>
<style lang="scss" scoped>
    .banner-nav{
        position: fixed;
        left:55px;
        >ul{
            list-style: none;
             color:rgba(0,0,0,.4);
             >li{
                 cursor: pointer;
                 margin-bottom:20px;
                 width: 145px;
                 height:23px;
                 display:flex;
                 font-weight: 600;
                 &:hover{
                    color: rgb(47, 0, 255);
                 }
                 >div:nth-child(1){
                     border-right:1px solid rgba(0,0,0,.4);
                     padding:0 5px;
                     font-size: 1.4rem;
                     width: 20px;
                 };
                 >div:nth-child(2){
                     padding:0 5px;
                     font-size: 1.2rem;
                 }
             }
        }
    }
    .banner-nav-set{
        font-size: 1.6rem;
        height:38px !important;
        color: rgba(0,0,0,.8) !important;
         >div:nth-child(1){
            font-size: 1.7rem !important;
         };
        >div:nth-child(2){
            padding:0 5px !important;
            font-size: 1.7rem !important;
         }
    }
    //  .banner-nav-set1{
    //     font-size: 1.4rem !important;
    //     color: rgba(0,0,0,.6) !important;
    //      >div:nth-child(1){
    //         font-size: 1.4rem !important;
    //      };
    //     >div:nth-child(2){
    //         padding:0 5px !important;
    //         font-size: 1.4rem !important;
    //      }
    // }
</style>


