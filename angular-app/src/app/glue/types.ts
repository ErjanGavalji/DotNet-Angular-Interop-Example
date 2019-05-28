import { Glue42 } from '../../../lib/tick42-glue';

export type MethodDefinition = Glue42.AGM.MethodDefinition;
export type Instance = Glue42.AGM.Instance;

export type Instrument = { ric: string };

export type Portfolio = {
    id: number,
    ricList: Instrument[]
};