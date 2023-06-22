<template>
  <q-item-label header> {{ $t('userConfig') }} </q-item-label>
  <q-list>
    <VersionSelect />
    <ModsSelect />
    <LanguageSelect />
  </q-list>
</template>

<script setup lang="ts">
import VersionSelect from './VersionSelect.vue';
import ModsSelect from './ModsSelect.vue';
import LanguageSelect from './LanguageSelect.vue';
</script>
