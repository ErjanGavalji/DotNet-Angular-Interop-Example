import { Injectable } from '@angular/core';
import Glue, { Glue42 } from '../../../lib/tick42-glue';
import { MethodDefinition, Instance, Instrument } from './types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlueService {

    private _glue: Glue42.Glue;
    private readonly portfolioInstrumentsList: Instrument[] = [
        { ric: 'VOD:LD' },
        { ric: 'BMW:GR' },
        { ric: 'BARC:LN' },
        { ric: 'BMW:GR' },
        { ric: 'NFLX:US' },
        { ric: 'NFLX:US' },
        { ric: 'AAL:LN' },
        { ric: 'TSCO:L' },
        { ric: 'GOOGL:US' }
    ];

    public async initialize(): Promise<void> {
        this._glue = await Glue();
        (window as any).glue = this._glue;
    }

    public get glue(): Glue42.Glue {
        return this._glue;
    }

    public get glueVersion(): string {
        return this._glue.version;
    }

    public get interop(): Glue42.AGM.API {
        return this._glue.agm;
    }

    // recommended
    public async register(name: MethodDefinition | string, handler: (args: object, caller: Instance) => void): Promise<void> {
        return this._glue.agm.register(name, handler);
    }

    public updateContext(contextKeyName: string, data: any): Promise<void> {
        return this._glue.contexts.update(contextKeyName, data );
    }

    public fetchInstrument(): Promise<void> {
        const randomEndIndex: number = Math.floor(Math.random() * Math.floor(this.portfolioInstrumentsList.length));
        const entry = this.portfolioInstrumentsList[randomEndIndex];
        return this.updateContext('InstrumentSelection', { SelectedInstrument: entry.ric });
    }

    public getRandomInstrumentsList(): Instrument[] {
        const randomEndIndex = Math.floor(Math.random() * Math.floor(this.portfolioInstrumentsList.length));
        return this.portfolioInstrumentsList.slice(0, randomEndIndex);
    }

    public subscribeToContextChanges(contextKeyName: string, onContextChangedCb): Promise<() => void> {
        return this._glue.contexts.subscribe(contextKeyName, onContextChangedCb);
    }

}
