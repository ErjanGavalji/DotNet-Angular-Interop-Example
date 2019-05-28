import { NgModule, APP_INITIALIZER } from '@angular/core';
import { GlueService } from '../glue/glue.service';

export function setupGlue(glueService: GlueService) {
    return () => glueService.initialize();
}

@NgModule({
    providers: [
        { provide: APP_INITIALIZER, useFactory: setupGlue, deps: [GlueService], multi: true },
    ]
})
export class AppLoadModule { }
