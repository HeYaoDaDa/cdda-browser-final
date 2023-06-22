import { shallowReactive } from 'vue';
import { getItems } from './apis/itemApi';
import { globalLogger } from './boot/logger';
import { CddaItem } from './classes/CddaItem';
import { Mod } from './classes/Mod';
import { Translation } from './classes/Translation';
import { CddaType, cddaType2JsonType, JsonType } from './constants/type';
import { getVersionDataByVersionId, saveVersionData } from './services/versionDataService';
import { useOptionStore } from './stores/optionStore';
import { useUserConfigStore } from './stores/userConfigStore';

export class CddaItemIndexer {
  byModIdAndJsonTypeAndId: Map<string, Map<JsonType, Map<string, CddaItem>>> = new Map();
  byModIdAndJsonType: Map<string, Map<JsonType, CddaItem[]>> = new Map();
  version = 0;

  async init() {
    globalLogger.debug('CddaItemIndexer init');
    const currentVersionId = useUserConfigStore().versionId;
    const dbVersionData = await getVersionDataByVersionId(currentVersionId);
    let itemMap: {
      id: string;
      items: CddaItem[];
    }[];
    if (dbVersionData) {
      globalLogger.debug(`db have ${currentVersionId} versionData`);
      itemMap = dbVersionData.mod;
    } else {
      globalLogger.debug(`db not have ${currentVersionId} versionData`);
      itemMap = await getItems(currentVersionId);
      saveVersionData({ id: currentVersionId, mod: itemMap });
    }

    itemMap.forEach((cord) => {
      const modId = cord.id;
      if (!this.byModIdAndJsonTypeAndId.has(modId)) this.byModIdAndJsonTypeAndId.set(modId, new Map());
      const byJsonTypeById = this.byModIdAndJsonTypeAndId.get(cord.id) as Map<JsonType, Map<string, CddaItem>>;
      if (!this.byModIdAndJsonType.has(modId)) this.byModIdAndJsonType.set(modId, new Map());
      const byJsonType = this.byModIdAndJsonType.get(modId) as Map<JsonType, CddaItem[]>;

      cord.items.forEach((cddaItem) => {
        cddaItem.name = new Translation(cddaItem.name.value, cddaItem.name.ctxt);
        if (cddaItem.description) cddaItem.description = new Translation(cddaItem.description.value, cddaItem.description.ctxt);

        if (!byJsonTypeById.has(cddaItem.jsonType)) byJsonTypeById.set(cddaItem.jsonType, new Map());
        byJsonTypeById.get(cddaItem.jsonType)?.set(cddaItem.id, cddaItem);

        if (!this.byModIdAndJsonType.has(cddaItem.modId)) this.byModIdAndJsonType.set(cddaItem.modId, new Map());
        if (!byJsonType.has(cddaItem.jsonType)) byJsonType.set(cddaItem.jsonType, []);
        byJsonType.get(cddaItem.jsonType)?.push(cddaItem);
      });
    });

    this.version++;
    globalLogger.debug('CddaItemIndexer init end');
  }

  findByTypeAndIdInCurrentMods(cddaType: CddaType, id: string): CddaItem[] {
    if (this.version < 1) return [];
    globalLogger.debug(`start find ${cddaType}/${id} cddaItem`);
    const currentMods = useOptionStore().getCurrentMods() as Mod[];
    const jsonTypes = cddaType2JsonType(cddaType);
    globalLogger.debug(`jsonTypes is ${jsonTypes.join(',')}`);
    const result = new Array<CddaItem>();

    currentMods.forEach((mod) => {
      const byJsonTypeById = this.byModIdAndJsonTypeAndId.get(mod.id) as Map<JsonType, Map<string, CddaItem>>;
      if (byJsonTypeById) {
        jsonTypes.forEach((jsonType) => {
          const byId = byJsonTypeById.get(jsonType);
          if (byId) {
            const item = byId.get(id);
            if (item) result.push(item);
          }
        });
      }
    });

    globalLogger.debug(`find ${cddaType}/${id} cddaItems length is ${result.length}`);
    return result;
  }
}

export const cddaItemIndexer = shallowReactive(new CddaItemIndexer());
