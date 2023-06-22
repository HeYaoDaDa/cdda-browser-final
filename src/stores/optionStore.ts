import { defineStore } from 'pinia';
import { getVersions } from 'src/apis/versionApi';
import { globalLogger } from 'src/boot/logger';
import { Version } from 'src/classes/Version';
import { useUserConfigStore } from './userConfigStore';

export const useOptionStore = defineStore('optionStore', {
  state: () => {
    const result = { versions: new Array<Version>() };
    return result;
  },
  getters: {
    getLatestVersion: (state) => {
      return state.versions[0];
    },
  },

  actions: {
    getVersionById(id: string) {
      return this.versions.find((version) => version.id === id);
    },
    getCurrentVersion() {
      const currentVersionId = useUserConfigStore().versionId;
      return this.getVersionById(currentVersionId);
    },
    getCurrentModById(id: string) {
      const currentVersion = this.getCurrentVersion();
      return currentVersion?.mods.find((mod) => mod.id === id);
    },
    getCurrentMods() {
      const currentModIds = useUserConfigStore().modIds;
      return currentModIds.map((modId) => this.getCurrentModById(modId)).filter((value) => value != undefined);
    },
    async initOption() {
      this.versions = await getVersions();
      globalLogger.debug(`init Option version; size is ${this.versions.length}`);
    },
  },
});
