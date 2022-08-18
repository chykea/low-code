<template>
    <div class="all">
        <div class="head">
            <Header></Header>
        </div>
        <div class="content">
            <div class="nav">
                <div class="serch">
                    <input type="text" placeholder="请输入关键词进行搜索" />
                    <button></button>
                </div>

                <div class="cards">
                    <div class="card" v-for="item in cards" :key="item.id">{{item}}</div>
                </div>
            </div>

            <div class="libraries">
                <div class="library" v-for="item in libraries" :key="item.id">{{item.id}}</div>
            </div>
            <div class="pages">
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/views/PersonEdit/component/Header/index.vue';

export default {
    components: { Header },
    data() {
        return {
            cards: ["模板", "组件", "全部"],
            libraries: [
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
            ],
        }
    }
}
</script>

<style>
* {
    margin: 0;
}

.all {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: blueviolet; */
}

.head {
    /* height: 15%; */
    background-color: brown;
    line-height: 60px;
}

.content {
    flex: auto;
    background-color: burlywood;
}

.nav {
    display: flex;
    justify-content: space-between;
}

.serch {
    /* flex: 1; */
    position: relative;
    margin: 60px;
    background-color: cadetblue;
}

.serch input {
    width: 410px;
    height: 30px;
    padding: 10px 20px;
    border: 1px #000 solid;
    border-radius: 10px;
}

.serch button {
    position: absolute;
    width: 55px;
    height: 50px;
    top: 1px;
    right: 2px;
    background-color: #f5d94e;
    /* background-image: url(); */
    border-radius: 10px;
    border: none;
}

.cards {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex: 1; */
    background-color: chartreuse;
}

.card {
    width: 95px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    background-color: #f3f0f3;
    border: none;
    text-align: center;
    border-radius: 15px;
}

.libraries {
    display: flex;
    flex-wrap: wrap;
}

.library {
    width: 270px;
    height: 165px;
    margin: 20px 30px;
    background-color: coral;
}

.pages{
    display: flex;
    justify-content: center;
}
</style>