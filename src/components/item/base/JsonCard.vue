<template>
  <item-card flexBasis="100%">
    <q-expansion-item label="JSON">
      <pre>{{ JSON.stringify(props.cddaItem.json, null, 2) }}</pre>
    </q-expansion-item>
    <q-expansion-item label="DATA">
      <pre>{{ JSON.stringify(props.cddaItem.data, null, 2) }}</pre>
    </q-expansion-item>
  </item-card>
</template>

<script setup lang="ts">
import { CddaItem } from 'src/classes/CddaItem';
import ItemCard from './ItemCard.vue';

const props = defineProps<{
  cddaItem: CddaItem;
}>();
</script>

<style>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
