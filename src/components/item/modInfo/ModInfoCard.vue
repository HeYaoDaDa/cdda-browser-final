<template>
  <item-card flexBasis="100%">
    <p :class="['text-weight-bold', 'text-h3']">
      <span>{{ props.modInfo.name.translate() }}</span>

      <q-badge :class="['text-weight-bold', 'text-h6']">{{ modName }}</q-badge>
    </p>

    <p v-if="props.cddaItem.description">{{ props.cddaItem.description.translate() }}</p>

    <dl>
      <item-label v-if="!isEmpty(props.modInfo.authors)" :label="$t('author')"
        ><inline-texts-or-router-links :texts="props.modInfo.authors"></inline-texts-or-router-links
      ></item-label>
    </dl>
  </item-card>
</template>

<script setup lang="ts">
import { CddaItem } from 'src/classes/CddaItem';
import { ModInfo } from 'src/classes/item/ModInfo';
import ItemLabel from '../base/ItemLabel.vue';
import ItemCard from '../base/ItemCard.vue';
import InlineTextsOrRouterLinks from '../base/InlineTextsOrRouterLinks.vue';
import { isEmpty } from 'src/utils';
import { computed } from 'vue';
import { useOptionStore } from 'src/stores/optionStore';

const props = defineProps<{
  cddaItem: CddaItem;
  modInfo: ModInfo;
}>();

const modName = computed(() => useOptionStore().getCurrentModById(props.cddaItem.modId)?.name.translate());
</script>
