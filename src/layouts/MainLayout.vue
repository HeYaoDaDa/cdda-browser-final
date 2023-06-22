<template>
  <q-layout view="hHr LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Cdda Browser </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <UserConfig />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer side="right" bordered show-if-above> test </q-drawer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserConfig from 'src/components/userConfig/UserConfig.vue';
import { useOptionStore } from 'src/stores/optionStore';
import { cddaItemIndexer } from 'src/CddaItemIndexer';
import { changeLanguage, useUserConfigStore } from 'src/stores/userConfigStore';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// init option, itemIndexer, language
const optionStore = useOptionStore();
const userConfig = useUserConfigStore();
optionStore.initOption().then(() => {
  if (userConfig.versionId !== '') cddaItemIndexer.init();
  changeLanguage(userConfig.languageCode);
});
</script>
