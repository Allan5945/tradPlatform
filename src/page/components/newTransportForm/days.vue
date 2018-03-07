<template>
    <div class="days-wrapper">
        <day class="day-wrapper" v-for="n in 7" :num="n" :dayNum="dayNum" @dayCheckedFn="dayCheckedFn(n)" @dayUncheckedFn="dayUncheckedFn(n)"></day>
    </div>
</template>
<script>
    import day from './day.vue'
    export default {
        data() {
            return {
                dayNum: [1,2,3,4,5,6,7],
                simulateData: '1,2,3,4,5',  // 模拟的外来数据
                simulateDataArr: [],
            }
        },
        components: {
            day,
        },
        mounted() {
            this.simulateData.split(',').forEach((val) => {
                this.simulateDataArr.push(parseFloat(val));
            });
            this.dayNum = this.simulateDataArr;
        },
        methods: {
            dayCheckedFn(n) {  // 选中
                if(this.dayNum.indexOf(n) == '-1') {
                    this.dayNum.push(n);
                    this.dayNum.sort();
                }
            },
            dayUncheckedFn(n) {  // 未选中
                let index = this.dayNum.indexOf(n);
                if(index != '-1') {
                    this.dayNum.splice(index, 1);
                    this.dayNum.sort()
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .days-wrapper {
        display: flex;
    }
    .day-wrapper {
        margin-right: 7px;
    }
</style>