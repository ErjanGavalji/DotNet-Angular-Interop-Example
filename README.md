.NET <-> Angular Web Application interop example
===

## Purpose
- Demonstrate the initialization of the Glue42 interop engine with
Shared Contexts as an interop model.
- Demonstrate a two-way interop between a WPF (Desktop) application and an
AngularJS (Web) one.

## Run
1. 
2. Clone the repo
3. Copy the `glue42/shared-context-demo-angular.json` file to the `%localappdata%\Tick42\GlueDesktop\config\apps` folder
4. Navigate to the `angular-app` folder
5. Run `npm install`
6. Run `npm run serve`
7. Start a Windows Explorer and navigate to the `dotnet-app` folder
8. Load the `dotnet-app.sln` file in Visual Studio and rebuild
9. Create the folder `%localappdata%\Tick42\Demos\SharedContextDemo-WPF`
10. Copy the files from the build output (e.g. `\bin\Debug`) to the `%localappdata%\Tick42\Demos\SharedContextDemo-WPF` folder
11. Use the AppManager (LaunchPad) to start the two applications
12. Selecting an entry from the WPF application listbox leads to a change in the portfolio display (JavaScript window)
13. Hitting the button in the JavaScript application results in an instrument displayed in the WPF application

## Troubleshooting
- Make sure you have enabled the [Nuget Package restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore-troubleshooting) option if you get errors like `The type of namespace DOT/ServiceContractAttribute/ServiceContract could not be found`.
