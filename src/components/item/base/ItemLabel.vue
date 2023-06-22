<template>
  <dt>{{ props.label }}</dt>
  <dd><slot></slot></dd>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>
