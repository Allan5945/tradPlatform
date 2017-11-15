<template>
    <div class="demand-list">
        <div class="mes-body-h popup" v-for="(key,i) in data">
            <div class="mes-body-i0">
                <singleElection :single.sync="key.set" class="mes-body-ix"></singleElection>
                <img src="" alt="">
            </div>
            <div class="mes-body-i1 font-bold">{{key.lines}}</div>
            <div class="mes-body-i2">{{key.time}}</div>
            <div class="mes-body-i3">{{key.stage}}</div>
            <div class="mes-body-i3">{{key.timeKd}}</div>
            <div class="mes-body-i3">{{key.banqi}}</div>
            <div class="mes-body-i3">{{key.jixing}}</div>
            <div class="mes-body-i4">{{key.butie}}</div>
            <div class="mes-body-i4">{{key.instruction}}</div>
        </div>
    </div>
</template>
<script>
    import singleElection from './singleElection.vue'
    export default {
        data(){
            return{
                data:[
                    {
                        set:{set: false},
                        type:0,
                        lines:"成都双流-北京首都",
                        time:"2017.08.23",
                        stage:2,
                        timeKd:'08:00',
                        banqi:'1/3/5',
                        jixing:"A320",
                        butie:"定补，每班补贴",
                        instruction:"要求客座率不低于90%"
                    },
                    {
                        set:{set: false},
                        type:0,
                        lines:"成都双流-北京首都",
                        time:"2017.08.23",
                        stage:2,
                        timeKd:'08:00',
                        banqi:'1/3/5',
                        jixing:"A320",
                        butie:"定补，每班补贴",
                        instruction:"要求客座率不低于90%"
                    },
                ]
            }
        },
        filters: {
            capitalizeType:function (val) {
                return val;
            }
        },
        components: {
            singleElection
        }

    }
</script>
<style scoped lang="scss">
    .demand-list{
        padding: 0 20px;
    }
    .mes-body-h {
        /*background-color: white;*/
        display: flex;
        flex-flow: row nowrap;
        padding: 0;
        height: 60px;
        align-items: center;
        margin-bottom: 10px;
        box-shadow: 0 2px 11px rgba(85, 85, 85, .1);
        > div {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            margin-right: 20px;
            color: rgba( 96,94,124,1);
        }
    }

    .mes-body-i0 {
        width: 60px;
    }

    .mes-body-i1 {
        width: 120px;
        letter-spacing: 0.2px;
        font-weight: bold;
    }

    .mes-body-i2 {
        width: 80px;
         letter-spacing: 0.2px;
    }

    .mes-body-i3 {
        width: 60px;
         letter-spacing: 0.2px;
    }

    .mes-body-i4 {
        width: 161px;
         letter-spacing: 0.2px;
    }
    .mes-body-ix {
        margin: 0 6px 0 9px;
         letter-spacing: 0.2px;
    }

</style>