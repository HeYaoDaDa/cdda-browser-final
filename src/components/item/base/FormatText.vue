<template>{{ content }}</template>

<script setup lang="ts">
import { computed } from 'vue';
import { globalI18n } from 'src/boot/i18n';

const props = defineProps<{
  text: string | number | boolean;
}>();

const content = computed(() => {
  switch (typeof props.text) {
    case 'string':
      return props.text;
    case 'number':
      if (Number.isInteger(props.text)) {
        return Math.trunc(props.text).toString();
      } else {
        return props.text.toFixed(2).toString();
      }
    case 'boolean':
      return globalI18n.global.t('base.' + (props.text ? 'true' : 'false'));
    default:
      return props.text;
  }
});
</script>
