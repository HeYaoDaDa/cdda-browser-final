<template>
  <q-select filled :options="LANGUAGE_OPTIONS" :modelValue="userConfig.languageCode" @update:model-value="(value:string)=>userConfig.selectLanguage(value)" emit-value map-options>
    <template v-slot:prepend> <q-icon name="language" /> </template>
  </q-select>
</template>

<script setup lang="ts">
import { useUserConfigStore } from 'src/stores/userConfigStore';
import { LANGUAGE_OPTIONS } from 'src/constants/appConstant';

const userConfig = useUserConfigStore();
</script>
