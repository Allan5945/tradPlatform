<template>
    <div class="validation user-select">
        <div class="icon-v" @mousedown="bgmove" :style="{'left':jl + 'px'}">&#xe62a;</div>
        <div class="bg-box" :style="{'width':jl + 'px'}"></div>
        <div class="icon-mes" v-text="tltle" :class="{'icon-c':tltle.length == 4}"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                hkoff:false,
                mouWz:0,
                ksl:0,
                jl:0,
                tltle:"滑动验证码进行验证"
            } 
        },
        mounted:function(){
            document.addEventListener("mousemove",e => {
                this.mouWz = e.screenX;
                this.inithk();
            });
             document.addEventListener("mouseup",e => {
                this.hkoff = false;
                if(this.jl < 263){
                    this.jl = 0;
                }
            });
        },
        methods:{
           bgmove(){
               this.hkoff = true;
               this.ksl = this.mouWz;
           },
           inithk(){
               if(this.hkoff){
                   let jl = this.mouWz - this.ksl;
                   if(jl > 0){
                        if(jl > 263){
                            this.hkoff = false;
                            this.jl = 263;
                            this.tltle = "验证成功";
                            return;
                        };
                        this.jl = jl;
                   };
                   
               } 
           }
        }
    }  
</script>
<style lang="scss" scoped>
   .validation{
        height: 28px;
        border:1px solid #dfdfdf;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
   }
   .bg-box{
       background-color: #7ac13d;
       position: absolute;
       left: 0;
       height: 28px;
   }
   .icon-v{
       background-color: white;
       font-family: iconfont;
       color:#cccccc;
       height: 28px;
       width: 28px;
       line-height:28px;
       text-align:center;
       font-size:1.6rem;
       cursor: pointer;
       left: 0px;
       border-right:1px solid #ccc;
       border-left:1px solid #ccc;
       position: absolute;
       z-index: 3;
   }
   .icon-mes{
       text-align: center;
       line-height: 28px;
       color:#c5c2c2;
       position: relative;
       z-index: 2;
   }
    .icon-c{
       color:white;
   }
</style>