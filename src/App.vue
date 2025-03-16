<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="root" id="root">
    <router-view v-slot="{ Component, route }">
      <div class="layout">
        <component :is="Component" :key="route.fullPath" />
      </div>
    </router-view>
  </div>
</template>


<style scoped>

</style>
