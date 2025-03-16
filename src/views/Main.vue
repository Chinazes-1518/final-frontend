<script setup>
import test from '@/assets/test.json'
import {APIRequest} from "@/utils/http.js";
import {onBeforeMount, ref} from "vue";

function getColor(value){
  //value from 0 to 1
  const val = 100 / 255 * value / 100
  const clr = ((1 - val) * 120).toString(10);
  return ["hsl(",clr,",100%,50%)"].join("");
}

const list = ref([])
const link = ref(' https://olimp.miet.ru/ppo_it/api')
const listener = ref([])
const sender = ref([])

async function getMap() {
  const data = await APIRequest('/project/get_map', 'GET', {}, {})

  if (data.status === 200) {
    list.value = data.json
  }
}

async function setLink() {
  const data = await APIRequest('/project/setlink', 'GET', {
    link: link.value,
  }, {})

  if (data.status === 200) {
    await getMap()
  }
}

async function getCoords() {
  const data = await APIRequest('/project/get_coords', 'GET', {}, {})
  if (data.status === 200) {
    listener.value = data.json.listener
    sender.value = data.json.sender
  }
}

onBeforeMount(async () => {
  await getMap()
})
// const l = [[1, 234, 42], [7, 111, 98], [22, 22, 255]]

</script>

<template>
<main class="root">
  <h1 class="title">Карта местности</h1>
  <div class="input-block">
    <div class="input-text">Введите адрес сервиса с данными</div>
    <div class="input-place">
      <input type="text" class="input-input" placeholder=" https://olimp.miet.ru/ppo_it/api" v-model="link">
      <button @click="setLink()" class="input-button">Сохранить</button>
    </div>
  </div>
  <div class="main-map">
    <div class="main-map-wrapper">
<!--      <div class="base purple" :style="{top: `calc((100px - 127px) * 2)`, left: `calc((100px - 127px) * 2)` }">-->
<!--        <div class="base-body purple"></div>-->
<!--      </div>-->
<!--      <div class="base blue" :style="{top: `calc((100px - 63px) * 2)`, left: `calc((100px - 63px) * 2)` }">-->
<!--        <div class="base-body blue"></div>-->
<!--      </div>-->
      <div class="base blue"></div>
      <div class="rows" v-for="i in list">
        <div class="row" v-for="j in i">
          <div class="pixel" :style="{background: getColor(j)}">
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>
.root {
  width: 1300px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.main-map {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-map-wrapper {
  position: relative;
  border: 6px solid red;
}

.rows {
  display: flex;
}
.pixel {
  min-width: 2px;
  min-height: 2px;
}

.base {
  background: rgba(70, 107, 255, 0.5);
  border: 1px solid rgba(70, 107, 255, 0.7);
  position: absolute;
  border-radius: 50%;
  //top: calc(100px * 2);
  //left: calc(100px * 2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.base.blue {
  width: 5px;
  height: 5px;
  background: rgba(70, 107, 255);
}

.base.purple {
  width: 127px;
  height: 127px;
  background: rgba(255, 53, 209, 0.5);
  border: 1px solid rgba(248, 53, 255, 0.7);
}

.base-body {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.base-body.blue {
  background: rgba(70, 107, 255);
}

.base-body.purple {
  background: rgb(174, 46, 145);
}

.input-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.input-input {
  margin-top: 8px;
  width: 256px !important;
  background: #f3ceac;
  border: 1px solid #ffbd73;
  padding: 10px 20px;
  font-weight: 200;
  border-radius: 0.5rem;
  outline: 0;
  transition:
      border,
      background 0.25s ease;
}

.input-input:hover {
  border: 1px solid #fca952;
}

.input-input:focus {
  border: 1px solid #fd9a2f;
  background: #fcc697;
}

.input-button {
  background: #f3ceac;
  border: 1px solid #ffbd73;
  padding: 10px 20px;
  border-radius: 0.5rem;
  border: 1px solid #ffbd73;
  margin-left: 10px;
  cursor: pointer;
}

.input-button:hover {
  border: 1px solid #fca952;
}
</style>