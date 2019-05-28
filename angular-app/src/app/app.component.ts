import { Component } from '@angular/core';
import { GlueService } from './glue/glue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly title = 'Glue42 Angular Example';

  constructor(private readonly glueService: GlueService) { }

  // public async interopExample() {
  //   // option 1 -> recommended
  //   await this.glueService.register('angular-example', () => console.log('invoked!'));

  //   // option 2
  //   await this.glueService.glue.agm.register('angular-example', () => console.log('invoked!'));

  //   // option 3
  //   await this.glueService.interop.register('angular-example', () => console.log('invoked!'));
  // }
}
