<template>
  <mod-info-card v-if="modInfo" :cddaItem="props.cddaItem" :modInfo="modInfo" />
  <p v-else>miss class type</p>
</template>

<script setup lang="ts">
import { CddaItem } from 'src/classes/CddaItem';
import { ModInfo } from 'src/classes/item/ModInfo';
import ModInfoCard from './ModInfoCard.vue';

const props = defineProps<{
  cddaItem: CddaItem;
}>();

let modInfo: ModInfo | undefined;
if (props.cddaItem.data.itemVersion === 0) {
  modInfo = new ModInfo(props.cddaItem.data);
}
</script>
