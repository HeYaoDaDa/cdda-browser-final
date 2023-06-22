import { globalGettext } from 'src/gettext';

export class Translation {
  value: string;
  ctxt?: string;

  constructor(value: string, ctxt: string | undefined = undefined) {
    this.value = value;
    this.ctxt = ctxt;
  }

  translate(): string {
    return globalGettext.pgettext(this.ctxt, this.value);
  }
}

export function jsonObjectToTranslation<T extends Translation | undefined>(object: T) {
  if (object) {
    return new Translation(object.value, object.ctxt);
  } else {
    return object;
  }
}
