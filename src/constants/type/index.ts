import { CddaType } from './CddaType';
import { JsonType } from './JsonType ';

const jsonType2CddaTypeMap = new Map([
  [JsonType.MOD_INFO, CddaType.MOD_INFO],
  [JsonType.BODY_PART, CddaType.BODY_PART],
]);

function jsonType2CddaType(jsonType: JsonType): CddaType {
  return jsonType2CddaTypeMap.get(jsonType) as CddaType;
}

function cddaType2JsonType(cddaType: CddaType): JsonType[] {
  const result = new Array<JsonType>();
  jsonType2CddaTypeMap.forEach((value, key) => {
    if (value === cddaType) {
      result.push(key);
    }
  });
  return result;
}

export { CddaType, JsonType, jsonType2CddaType, cddaType2JsonType };
