import Dexie from 'dexie';
import { globalLogger } from './boot/logger';
import { PoFile } from 'src/classes/entity/PoFile';
import { VersionData } from './classes/entity/VersionData';

class CddaGameData extends Dexie {
  poFiles!: Dexie.Table<PoFile, string>;
  versionDatas!: Dexie.Table<VersionData, string>;

  constructor() {
    super('CddaGameData');
    this.version(1).stores({
      poFiles: '[versionId+languageCode]',
      versionDatas: 'id',
    });
  }
}

export const db = new CddaGameData();
db.open().catch((e) => globalLogger.error('open db fail', e));
