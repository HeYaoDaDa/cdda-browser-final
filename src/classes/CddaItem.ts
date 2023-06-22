import { CddaType, JsonType } from 'src/constants/type';
import { CddaItemData } from './item/CddaItemData';
import { Translation } from './Translation';

export interface CddaItem {
  jsonType: JsonType;
  cddaType: CddaType;
  modId: string;
  id: string;
  path: string;
  json: object;
  abstract: string;
  data: CddaItemData;
  name: Translation;
  description?: Translation;
}
