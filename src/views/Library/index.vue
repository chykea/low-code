<template>
    <div class="all">
        <div class="head">
            <Header ref="headerRef"></Header>
        </div>

        <div class="content">敬请期待</div>

        <!-- <div class="content">
            <div class="second">
                <div class="serch">
                    <input type="text" placeholder="请输入关键词进行搜索" />
                    <div class="toSerch">
                        <img src="@/assets/images/library/search.png" />
                    </div>

                </div> -->

                <!-- <div class="cards">
                        <div class="card" @click="cur=0" :class="{active:cur==0}">模板</div>
                        <div class="card" @click="cur=1" :class="{active:cur==1}">组件</div>
                        <div class="card" @click="cur=2" :class="{active:cur==2}">全部</div>
                    </div> -->
            <!-- </div> -->

            <!-- <div class="allLibrary">
                <div class="libraries">
                    <div v-show="cur==0" class="libraryItem" v-for="item in mould" :key="item.id">
                        <div class="library"></div>
                        <p>{{item.id}}</p>
                    </div> -->

                    <!-- <div v-show="cur==1" class="libraryItem" v-for="item in com" :key="item.id">
                        <div class="library"></div>
                        <p>{{item.id}}</p>
                    </div>

                    <div v-show="cur==2" class="libraryItem" v-for="item in all" :key="item.id">
                        <div class="library"></div>
                        <p>{{item.id}}</p>
                    </div> -->
                <!-- </div>
            </div>

            <div class="pages">
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" current-page="1"></el-pagination>
                </div>
            </div> -->
        <!-- </div> -->
    </div>
</template>

<script setup>
    import { nextTick, onMounted, onBeforeMount, reactive, ref } from "vue";
    import Header from '@/views/PersonEdit/component/Header/index.vue';
    import { getPages } from '@/api/getPages';
    import { getMoulds } from '@/api/getMould';

    let flag = ref(false);

    let total = ref(50);

    let mould = ref([
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
        {
            id: 8,
        },
    ]);

    // 拦截头部鼠标滑过效果
    const headerRef = ref(null);
    const cut = () => {
        // console.log(headerRef);
        headerRef.value.test();
    };

    // 获取页面数量
    async function getpage() {
        // console.log("test");
        let res = await getPages();
        console.log(res.total);
        // total = (res.total) * 10;
    };

    // 获取模板
    const current = ref(1);
    // console.log(typeof(current.value));
    async function getMould() {
        const data = { cur: current.value };
        let res = await getMoulds('/public/getPage', data);
        console.log(res);
    };

    onMounted(() => {
        cut();
        getpage();
        getMould();
    })

</script>

<style scoped>
    .all {
        width: 100%;
        height: 100vh;
        /* background-color: blueviolet; */
    }

    .head {
        padding: 27px 0;
        width: 85%;
        margin: auto;
    }

    .head .Header {
        background-color: aquamarine;
    }

    .content {
        width: 85%;
        margin: auto;
        /* background-color: burlywood; */
    }

    .second {
        display: flex;
        align-items: center;
        /* background-color: blue; */
    }

    .nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        /* background-color: aquamarine; */
    }

    .serch {
        position: relative;
        /* background-color: cadetblue; */
    }

    .serch input {
        width: 431px;
        height: 52px;
        padding-left: 20px;
        border: 1px solid #17191a;
        border-radius: 10px;
    }

    .serch .toSerch {
        position: absolute;
        width: 55px;
        height: 50px;
        top: 2px;
        right: 2px;
        cursor: pointer;
        border-radius: 10px;
        border: none;
        background-color: #f5d94e;
    }

    .serch .toSerch img {
        width: 30px;
        height: 30px;
        margin: 10px 14px;
    }

    /* .cards {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: chartreuse;
    }

    .card {
        width: 95px;
        height: 51px;
        line-height: 51px;
        margin-left: 20px;
        background-color: #f3f0f3;
        border: none;
        text-align: center;
        background: #16191E;
        border-radius: 10px;
    } */

    /* .active {
        background-color: #17181f;
        color: white;
    } */

    .allLibrary {
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }

    .libraries {
        display: flex;
        flex-wrap: wrap;
        margin-top: 45px;
    }

    .libraryItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 28px 40px 28px;
    }

    .library {
        width: 266px;
        height: 163px;
        background: #f1f1f1;
        border-radius: 10px;
    }

    .libraryItem p {
        height: 13px;
        font-size: 16px;
        color: #17191a;
        line-height: 13px;
        margin: 15px auto 0 auto;
    }

    .pages {
        display: flex;
        margin-bottom: 30px;
        justify-content: center;
    }

    .el-pagination {
        color: #6e6c6c;
    }
</style>