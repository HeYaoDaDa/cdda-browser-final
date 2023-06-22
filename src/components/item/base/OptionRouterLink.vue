<template>
  <router-link v-if="props.route" :to="props.route">
    <format-text :text="props.text"></format-text>
    <slot></slot>
  </router-link>

  <template v-else>
    <format-text :text="props.text"></format-text>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import FormatText from './FormatText.vue';

const props = defineProps<{
  text: string | number | boolean;
  route?: RouteLocationRaw;
}>();
</script>
