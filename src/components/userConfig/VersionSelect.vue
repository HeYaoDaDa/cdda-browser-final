<template>
  <q-select
    filled
    label="version"
    :modelValue="userConfig.versionId"
    @update:model-value="updateValue"
    :options="optionStore.versions"
    optionLabel="releaseName"
    optionValue="id"
    mapOptions
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { Version } from 'src/classes/Version';
import { useOptionStore } from 'src/stores/optionStore';
import { useUserConfigStore } from 'src/stores/userConfigStore';

const userConfig = useUserConfigStore();
const optionStore = useOptionStore();

function updateValue(value: Version) {
  userConfig.selectVersion(value.id);
}
</script>
