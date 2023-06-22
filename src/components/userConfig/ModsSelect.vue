<template>
  <q-select
    :modelValue="userConfig.modIds"
    @update:model-value="updateValue"
    map-options
    :options="options"
    :optionLabel="getOptionLabel"
    :optionDisable="disableCoreModOption"
    multiple
    use-chips
    emit-value
    filled
  />
</template>

<script setup lang="ts">
import { useOptionStore } from 'src/stores/optionStore';
import { useUserConfigStore } from 'src/stores/userConfigStore';
import { computed } from 'vue';

const userConfig = useUserConfigStore();
const optionStore = useOptionStore();

const mods = computed(() => {
  return optionStore.getCurrentVersion()?.mods;
});

const options = computed(() => {
  const result = new Array<{
    label: string;
    value: string;
  }>();
  mods.value?.forEach((mod) => {
    result.push({
      label: mod.name.translate(),
      value: mod.id,
    });
  });

  return result;
});

function getOptionLabel(value: { label: string; value: string }) {
  return value.label;
}

function updateValue(newModIds: string[]) {
  const add = newModIds.length > userConfig.modIds.length;
  for (let i = newModIds.length - 1; i > -1; i--) {
    const modId = newModIds[i];
    const mod = optionStore.getCurrentModById(modId);
    mod?.allDepModIds.forEach((modId) => {
      if (!newModIds.includes(modId)) {
        if (add) {
          newModIds.push(modId);
        } else {
          newModIds.splice(i, 1);
        }
      }
    });
  }
  const sortedModIds = new Array<string>();
  mods.value?.forEach((mod) => {
    if (newModIds.includes(mod.id)) {
      sortedModIds.push(mod.id);
    }
  });
  userConfig.selectMods(sortedModIds);
}

function disableCoreModOption(option: string | { value: string }) {
  if (typeof option === 'string') return option === 'dda';
  else return option.value === 'dda';
}
</script>
