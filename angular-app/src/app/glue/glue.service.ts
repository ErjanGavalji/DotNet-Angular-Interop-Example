import { Injectable } from '@angular/core';
import Glue, { Glue42 } from '../../../lib/tick42-glue';
import { MethodDefinition, Instance } from './types';

@Injectable()
export class GlueService {

    private _glue: Glue42.Glue;

    public get glueVersion(): string {
        return this._glue.version;
    }

    public get interop(): Glue42.AGM.API {
        return this._glue.agm;
    }

    public get glue(): Glue42.Glue {
        return this._glue;
    }

    public async initialize(): Promise<void> {
        this._glue = await Glue();
        (window as any).glue = this._glue;
    }

    // recommended
    public async register(name: MethodDefinition | string, handler: (args: object, caller: Instance) => void): Promise<void> {
        return this._glue.agm.register(name, handler);
    }
}
