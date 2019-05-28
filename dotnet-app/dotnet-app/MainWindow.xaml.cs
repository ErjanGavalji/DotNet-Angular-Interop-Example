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
        private IContext context;
        private const string ContextName = "Current";
        private const string PortfolioKey = "Portfolio";
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
            this.context.Update(ctx => {
                ctx[PortfolioKey] = lbPortfolios.SelectedItem;
            });
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            this.context = await this.glue.Contexts.GetContext(ContextName);
            this.context.ContextUpdated += Context_ContextUpdated;
        }

        private void Context_ContextUpdated(object sender, ContextUpdatedEventArgs e)
        {
            var context = sender as IContext;
            if (context == null)
            {
                return;
            }

            if (context.ContextName != ContextName)
            {
                return;
            }

            lblSelectedInstrumentName.Content = (string)context[SelectedInstrumentKey] ?? "None";
        }
    }
}
