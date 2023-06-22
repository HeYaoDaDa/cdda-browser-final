import { api } from 'boot/axios';
import { Translation } from 'src/classes/Translation';
import { Version } from 'src/classes/Version';
import { HOST } from 'src/constants/appConstant';

export async function getVersions() {
  const response = await api.get(`${HOST}/option/versions`);

  const versions: Version[] = response.data;

  versions.forEach((version) => {
    version.mods.forEach((mod) => {
      mod.name = new Translation(mod.name.value, mod.name.ctxt);
      mod.description = new Translation(mod.description.value, mod.description.ctxt);
    });
  });

  return versions;
}
