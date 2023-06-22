import { Mod } from './Mod';

export interface Version {
  id: string;
  releaseName: string;
  tagName: string;
  commitHash: string;
  status: string;
  experiment: boolean;
  tagDate: number;
  mods: Mod[];
  pos: string[];
}
