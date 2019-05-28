using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Tick42;
using Tick42.Contexts;
using Tick42.StickyWindows;

namespace dotnet_app
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Glue42 glue;
        private IContext instrumentSelectionContext;
        private IContext portfolioContext;
        private const string PortfolioContextName = "Portfolio";
        private const string PortfolioIdKey = "PortfolioId";
        private const string InstrumentSelectionContextName = "InstrumentSelection";
        private const string SelectedInstrumentKey = "SelectedInstrument";

        public MainWindow()
        {
            InitializeComponent();

            // Initialize the portfolios
            var portfolios = new string[] { "High-risk", "Moderate", "Low-risk" };
            lbPortfolios.ItemsSource = portfolios;

            this.glue = new Glue42();
            this.glue.Initialize("DotNetApp", useContexts: true);

            // Initialize Window Stickiness and read from config:
            var swOptions = this.glue.StickyWindows?.GetStartupOptions() ?? new SwOptions();
            this.glue.StickyWindows?.RegisterWindow(this, swOptions);
        }

        private void LbPortfolios_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            this.portfolioContext.Update(ctx => {
                ctx[PortfolioIdKey] = lbPortfolios.SelectedItem;
            });
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            this.portfolioContext = await this.glue.Contexts.GetContext(PortfolioContextName);
            this.instrumentSelectionContext = await this.glue.Contexts.GetContext(InstrumentSelectionContextName);
            this.instrumentSelectionContext.ContextUpdated += InstrumentSelectionContext_ContextUpdated;
        }

        private void InstrumentSelectionContext_ContextUpdated(object sender, ContextUpdatedEventArgs e)
        {
            var context = sender as IContext;
            if (context == null)
            {
                return;
            }

            Application.Current.Dispatcher.BeginInvoke(new Action(() =>
            {
                lblSelectedInstrumentName.Content = ((string)context[SelectedInstrumentKey]) ?? "None";
            }));
            
        }
    }
}
