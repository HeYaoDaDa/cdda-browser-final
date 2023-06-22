import { CddaItem } from '../CddaItem';

export interface VersionData {
  id: string;
  mod: { id: string; items: CddaItem[] }[];
}
