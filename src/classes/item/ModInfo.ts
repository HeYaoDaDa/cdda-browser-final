import { jsonObjectToTranslation, Translation } from '../Translation';
import { CddaItemData } from './CddaItemData';

export class ModInfo implements CddaItemData {
  itemVersion!: number;
  id!: string;
  name!: Translation;
  description!: Translation;
  authors: string[] = [];
  maintainers: string[] = [];
  version?: string;
  dependencies: string[] = [];
  core = false;
  obsolete = false;
  category!: Translation;
  constructor(cddaItemData: CddaItemData) {
    Object.assign(this, cddaItemData);
    this.name = jsonObjectToTranslation(this.name);
    this.description = jsonObjectToTranslation(this.description);
    this.category = jsonObjectToTranslation(this.category);
  }
}
