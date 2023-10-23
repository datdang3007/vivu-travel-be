import { TransformFnParams } from 'class-transformer';
import { MaybeType } from '../types/maybe.type';

export const Trim = (params: TransformFnParams): MaybeType<string> =>
  params.value?.trim();

export const ParseDecimal = (params: TransformFnParams): MaybeType<number> => {
  return Number.parseFloat(params.value);
};
