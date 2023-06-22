import { defineStore } from 'pinia';
import { globalLogger } from 'src/boot/logger';
import { LANGUAGE_OPTIONS } from 'src/constants/appConstant';
import { Quasar } from 'quasar';
import { globalI18n } from 'src/boot/i18n';
import { WritableComputedRef } from 'vue';
import { initGettext } from 'src/services/poFileService';
import { globalRouter } from 'src/router';
import { cddaItemIndexer } from 'src/CddaItemIndexer';

export const useUserConfigStore = defineStore('userConfig', {
  state: initUserConfig,

  getters: {},

  actions: {
    selectVersion(newVersionId: string) {
      globalLogger.debug(`selected version change: [${this.versionId}] => [${newVersionId}]`);
      this.versionId = newVersionId;
      updateLocalStorage(this.$state);
      initGettext().catch((e) => globalLogger.error(e));
      cddaItemIndexer.init();
      const from = globalRouter.currentRoute.value;
      if (from.query.versionId !== this.versionId) {
        const toQuery = { ...from.query, versionId: this.versionId };
        globalRouter.replace({
          name: from.name ?? '',
          params: from.params,
          hash: from.hash,
          query: toQuery,
        });
      }
    },
    selectMods(newModIds: string[]) {
      globalLogger.debug(`selected mods change: [${this.modIds}] => [${newModIds}]`);
      this.modIds.splice(0, this.modIds.length, ...newModIds);
      updateLocalStorage(this.$state);
      const from = globalRouter.currentRoute.value;
      if (from.query.modIds !== this.modIds) {
        const toQuery = { ...from.query, modIds: this.modIds.join('.') };
        globalRouter.replace({
          name: from.name ?? '',
          params: from.params,
          hash: from.hash,
          query: toQuery,
        });
      }
    },
    selectLanguage(newLanguageCode: string) {
      globalLogger.debug(`selected language change: [${this.languageCode}] => [${newLanguageCode}]`);
      this.languageCode = newLanguageCode;
      changeLanguage(this.languageCode);
      updateLocalStorage(this.$state);
      const from = globalRouter.currentRoute.value;
      if (from.query.languageCode !== this.languageCode) {
        const toQuery = { ...from.query, languageCode: this.languageCode };
        globalRouter.replace({
          name: from.name ?? '',
          params: from.params,
          hash: from.hash,
          query: toQuery,
        });
      }
    },
  },
});

/**
 * init user config, recover if localStorage have record.
 * @returns user config object
 */
function initUserConfig() {
  let result: {
    versionId: string;
    modIds: string[];
    languageCode: string;
  };

  const userConfigValue = localStorage.getItem('userConfig');
  if (userConfigValue) {
    result = JSON.parse(userConfigValue);
  } else {
    result = {
      versionId: '',
      languageCode: LANGUAGE_OPTIONS[0].value,
      modIds: ['dda'],
    };
  }

  return result;
}

function updateLocalStorage(state: { versionId: string; modIds: string[]; languageCode: string }) {
  const stateJson = JSON.stringify(state);
  localStorage.setItem('userConfig', stateJson);
}

/**
 * change vue18n and quasar language setting
 * @param newLanguageCode new Language Code
 */
export function changeLanguage(newLanguageCode: string) {
  //TODO wrong type
  const locale: WritableComputedRef<string> = globalI18n.global.locale;
  locale.value = newLanguageCode;

  const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs');
  try {
    langList[`../../node_modules/quasar/lang/${newLanguageCode}.mjs`]().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  } catch (err) {
    globalLogger.error(`quasar language pakage '${newLanguageCode}' is not exits!`);
  }

  initGettext().catch((e) => globalLogger.error(e));
}

globalRouter.beforeResolve((to) => {
  const userConfig = useUserConfigStore();
  let reRoute = false;
  if (to.query.versionId === undefined) {
    to.query.versionId = userConfig.versionId;
    reRoute = true;
  } else if (to.query.versionId !== userConfig.versionId) {
    userConfig.selectVersion(to.query.versionId as string);
  }
  if (to.query.modIds === undefined) {
    to.query.modIds = userConfig.modIds.join('.');
    reRoute = true;
  } else if (to.query.modIds !== userConfig.modIds.join('.')) {
    userConfig.selectMods((<string>to.query.modIds).split('.'));
  }
  if (to.query.languageCode === undefined) {
    to.query.languageCode = userConfig.languageCode;
    reRoute = true;
  } else if (to.query.languageCode !== userConfig.languageCode) {
    userConfig.selectLanguage(to.query.languageCode as string);
  }
  if (reRoute) {
    globalLogger.debug('query sync route is trigger');
    return to;
  } else {
    return true;
  }
});
