import { getPoFileByVersionAndLanguageCode } from 'src/apis/poFileApi';
import { globalLogger } from 'src/boot/logger';
import { PoFile } from 'src/classes/entity/PoFile';
import { LANGUAGE_OPTIONS } from 'src/constants/appConstant';
import { db } from 'src/db';
import { globalGettext } from 'src/gettext';
import { useUserConfigStore } from 'src/stores/userConfigStore';

export async function savePoFile(poFile: PoFile) {
  const result = await db.poFiles.add(poFile);

  globalLogger.debug('save poFile result is ', result);
}

export async function getSavePoFileByVersion(versionId: string, languageCode: string) {
  return await db.poFiles.get({ versionId, languageCode });
}

export async function initGettext() {
  const userConfig = useUserConfigStore();

  if (userConfig.languageCode === LANGUAGE_OPTIONS[0].value) {
    globalLogger.debug(`language code is ${userConfig.languageCode}, no need use gettext.`);
    globalGettext.clear();

    return;
  }

  let poStr = (await getSavePoFileByVersion(userConfig.versionId, userConfig.languageCode))?.po;

  if (poStr) {
    globalLogger.debug('db has po', userConfig.languageCode);
  } else {
    globalLogger.debug('db no has po', userConfig.languageCode);

    poStr = await getPoFileByVersionAndLanguageCode(userConfig.languageCode);
    if (poStr) {
      await savePoFile({
        versionId: userConfig.versionId,
        languageCode: userConfig.languageCode,
        po: poStr,
      });
    } else {
      globalLogger.error(`server no return po ${userConfig.versionId}+${userConfig.languageCode}`);
    }
  }

  globalGettext.changeGettext(poStr as string);
}
