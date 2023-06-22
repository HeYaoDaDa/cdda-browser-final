import { Translation } from './Translation';

export interface Mod {
  id: string;
  name: Translation;
  description: Translation;
  obsolete: boolean;
  core: boolean;
  depModIds: string[];
  allDepModIds: string[];
}
