import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlueService } from './glue/glue.service';
import { Portfolio } from './glue/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public readonly title = 'Glue42 Angular Example';
  public currentPortfolio: Portfolio;
  public showPortfolio = false;

  private unsubscribeCallback: () => void;

  constructor(private readonly glueService: GlueService) { }

  public async ngOnInit(): Promise<void> {
    this.unsubscribeCallback = await this.glueService.subscribeToContextChanges('Portfolio', this.onContextChangeCallback);
  }

  public ngOnDestroy(): void {
    this.unsubscribeCallback();
  }

  private onContextChangeCallback = (context: any) => {
    if (context.PortfolioId) {
      this.showPortfolio = true;
      this.currentPortfolio = {
        id: context.PortfolioId,
        ricList: this.glueService.getRandomInstrumentsList()
      };

    }
  }

  public fetchInstrument(): Promise<void> {
    return this.glueService.fetchInstrument();
  }

  // public async interopExample() {
  //   // option 1 -> recommended
  //   await this.glueService.register('angular-example', () => console.log('invoked!'));

  //   // option 2
  //   await this.glueService.glue.agm.register('angular-example', () => console.log('invoked!'));

  //   // option 3
  //   await this.glueService.interop.register('angular-example', () => console.log('invoked!'));
  // }
}
