import { api } from 'src/boot/axios';
import { HOST } from 'src/constants/appConstant';
import { useUserConfigStore } from 'src/stores/userConfigStore';

export async function getPoFileByVersionAndLanguageCode(languageCode?: string) {
  const userConfig = useUserConfigStore();
  const myLanguageCode = languageCode ?? userConfig.languageCode;
  // const response = await api.get(url, { responseType: 'arraybuffer', decompress: false });
  const response = await api.get(`${HOST}/data/po/${userConfig.versionId}/${myLanguageCode}`);

  return response.data;
}
