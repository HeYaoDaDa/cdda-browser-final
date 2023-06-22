import { api } from 'boot/axios';
import { CddaItem } from 'src/classes/CddaItem';
import { HOST } from 'src/constants/appConstant';

export async function getItems(versionId: string): Promise<{ id: string; items: CddaItem[] }[]> {
  const response = await api.get(`${HOST}/data/mods/${versionId}`);

  return response.data;
}
