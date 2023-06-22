<template>
  <q-page :style="{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '5px', padding: '5px' }">
    <template v-for="item in items" :key="item.modId + item.id">
      <template v-if="item.cddaType === CddaType.MOD_INFO">
        <mod-info :cddaItem="item" />
      </template>
      <json-card :cddaItem="item" />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { cddaItemIndexer } from 'src/CddaItemIndexer';
import JsonCard from 'src/components/item/base/JsonCard.vue';
import ModInfo from 'src/components/item/modInfo/ModInfo.vue';
import { CddaType } from 'src/constants/type';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const type = route.params.type as CddaType;
const id = route.params.id as string;
const items = computed(() => {
  return cddaItemIndexer.findByTypeAndIdInCurrentMods(type, id);
});
</script>
