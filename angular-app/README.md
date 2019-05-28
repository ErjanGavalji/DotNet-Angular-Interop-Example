# Glue42 Angular Example

This is a simple Angular project, which showcases Glue42 initiation and integration in a standard Angular application.

This project was generated with the standard Angular CLI version 1.4.9 using default settings. The project structure and organization is not modified in any way.

## Initiation steps

1. Clone the repository
2. Install the dependencies by `npm install`
3. Paste the `angular-example.json` file to `%localappdata%/Tick42/GlueDesktop/config/apps`
4. Run the example project by `npm run serve`. The application will run at the default ng port 4200
5. Start GD3 and select the application from the *Applications* dropdown menu.

## Glue initiation and usage

**Initiation**

The GlueJS library initiation is asynchronous, it is declared in *app/glue/glue.service.ts*. Since our entire app logic depends on Glue, we used `APP_INITIALIZER` to extend Angular's default bootstrap procedure. 

If the initiation is successful, you should see the loaded GlueJS version on the home screen. 

**Usage**

The GlueService, declared in *app/glue/glue.service.ts*, initializes and provides access to the **glue** object. It is recommended that the **glue** object remains encapsulated and only the needed functionality is exposed like the example *register* method. Alternatively this service could expose the entire **glue** object or some selected libraries like the shown *interop* property.

A sample Interop method registration is show at *app/app.component.ts*, where all three options described above are used.
