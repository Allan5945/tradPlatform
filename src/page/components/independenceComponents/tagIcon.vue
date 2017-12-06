<template>
    <div class="iconList">
        <div class="iconList-item" v-for="key in roleData"><img v-bind:src="key.iconUrl" alt="">{{key.name}}</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import hxxq from '../../../static/img/hxxq.png'
    import ylxq from '../../../static/img/ylxq.png'
    import fcqq from '../../../static/img/fcqq.png'
    import hd from '../../../static/img/hd.png'

    export default {
        data() {
            return {
                url: ""
            }
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
            roleData: function () {
                let iconList = [ {
                    name: "我发出的需求",
                    iconUrl: fcqq
                },
                    {
                        name: "航点",
                        iconUrl: hd
                    }];
                if(this.role != undefined){
                    switch (this.role.role) {
                        case '0':
                            iconList.push(
                                {
                                    name: "航线需求",
                                    iconUrl: hxxq
                                });
                            break;
                        case '1':
                            iconList.push(
                                {
                                    name: "运力需求",
                                    iconUrl: ylxq
                                });
                            break;
                        case '2':
                            iconList.push(  {
                                    name: "航线需求",
                                    iconUrl: hxxq
                                },
                                {
                                    name: "运力需求",
                                    iconUrl: ylxq
                                }
                            );
                            break;
                    }
                }
                return iconList;
            }

        },
        mounted: function () {
        }
    }
</script>
<style scoped lang="scss">
    .iconList {
        position: absolute;
        right: 40px;
        bottom: 40px;
        display: flex;
        flex-flow: row nowrap;
    }

    .iconList-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0 13px;
        font-size: 1.2rem;
        color: #605E7C;
        > img {
            margin-right: 6px;
        }
    }
</style>