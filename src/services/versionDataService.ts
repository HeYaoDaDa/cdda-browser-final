import { VersionData } from 'src/classes/entity/VersionData';
import { db } from 'src/db';

export async function saveVersionData(versionData: VersionData) {
  await db.versionDatas.add(versionData);
}

export async function getVersionDataByVersionId(id: string) {
  return await db.versionDatas.get({ id });
}
