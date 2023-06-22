<template>
  <template v-for="(text, index) in props.texts" :key="text">
    <option-router-link :text="text" :route="props.routes?.at(index)"></option-router-link>
    <template v-if="index < props.texts.length - 1">{{ props.separator ?? ', ' }}</template>
  </template>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import OptionRouterLink from './OptionRouterLink.vue';

const props = defineProps<{
  texts: (string | number | boolean)[];
  separator?: string;
  routes?: (RouteLocationRaw | undefined)[];
}>();
</script>
