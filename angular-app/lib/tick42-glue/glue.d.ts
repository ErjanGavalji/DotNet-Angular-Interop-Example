import { Glue42Core } from "tick42-glue-core";
import { UnsubscribeFunction } from "callback-registry";

/**
 * Factory method that creates a new glue instance
 */
export default function Glue(config?: Glue42.Config): Promise<Glue42.Glue>;

/**
 * @docmenuorder 1
 * @docname Glue
 * @intro
 * GLUE42 is a real-time user experience (UX) integration product. UX integration is the process by which different applications are combined together at the user interface level to provide a better end user experience. UX integration makes it easier for users to access the data they need by reducing the need to switch between applications. GLUE 42 allows developers to connect web or desktop applications and have them interact with each other in real time.
 * GLUE for JavaScript enables JavasScript applications to participate in GLUE 42 by using a set of APIs.
 * ## Referencing
 * GLUE is a library available both as a single JavaScript file which you can include into your web applications using a `<script>` tag, and as a node.js module.
 * Because GLUE for JavaScript evolves, we’ve chosen the following the sematic version model:
 * _BreakingChangesVersion_._FeatureVersion_._FixVersion_
 * You can use GLUE in a `script` tag include, e.g.:
 *
 * ```html
 * <script type="text/javascript" src="tick42-glue-{GLUE_VER}.js"></script>
 * ```
 * ...or as a node.js module.
 *
 * ``` javascript
 * const Glue = require("tick42-glue");
 * ```
 * When deploying your application in production, we recommend that you always reference a specific **minified** version, e.g.:
 *
 * ```html
 * <script type="text/javascript" src="tick42-glue-{GLUE_VER}-min.js"></script>
 * ```
 *
 * ## Initialization
 * When included glue.js will register a global factory function called __Glue__ . This should be invoked with an optional configuration object to init the library. The factory function returns a Promise object.
 * Example
 *
 * ```javascript
 *   Glue()
 *     .then((glue) => {
 *       window.glue = glue;
 *       glue.agm.register({name: 'displayValue', accepts: "String value"}, displayValue);
 *     })
 *     .catch(function (err) {
 *       console.log(err);
 *     });
 * ```
 * ## See also
 * - [Using the JavaScript Library](../../../../using-glue-js/)
 */
export declare namespace Glue42 {
    export import AGM = Glue42Core.AGM;
    export import Connection = Glue42Core.Connection;
    export import Logger = Glue42Core.Logger;
    export import Metrics = Glue42Core.Metrics;
    export import Auth = Glue42Core.Auth;
    export import Channels = Glue42.Channels.API;
    export import ChannelContext = Glue42.Channels.ChannelContext;

    /** @ignore */
    export interface LoggerConfig {
        publish: string;
        console: string;
        metrics: string;
    }
    /**
        * @docmenuorder 2
        */
    export interface Config extends Glue42Core.Config {
        /**
         * Whether to initialize appManager or not.
         * Default is false.
         */
        appManager?: boolean | Glue42.AppManager.Mode | { mode?: Glue42.AppManager.Mode, logger?: Glue42Core.Logger.Settings };

        /**
         * Whether to initialize layouts or not.
         * Default is "slim".
         */
        layouts?: boolean | Glue42.Layouts.Mode | { mode?: Glue42.Layouts.Mode, logger?: Glue42Core.Logger.Settings };

        /**
         * Whether to initialize activities or not.
         * Default is "trackMyTypeAndInitiatedFromMe".
         */
        activities?: boolean | Glue42.Activities.ActivitiesModes | { mode?: Glue42.Activities.ActivitiesModes, logger?: Glue42Core.Logger.Settings, typesToTrack?: string[] };

        /** Context library configuration. If false the library is not initialized */
        contexts?: boolean | { mode?: boolean, logger?: Glue42Core.Logger.Settings };

        /** Windows library configuration. If false the library is not initialized */
        windows?: boolean | { mode?: boolean, logger?: Glue42Core.Logger.Settings };

        /**
        * Whether to initialize channels or not.
        * Default is false.
        */
        channels?: boolean;
    }

    /**
     * @docmenuorder 1
     */
    export interface Glue extends Glue42Core.GlueCore {
        windows?: Glue42.Windows.API;
        activities?: Glue42.Activities.API;
        appManager?: Glue42.AppManager.API;
        contexts?: Glue42.Contexts.API;
        layouts?: Glue42.Layouts.API;
        channels?: Glue42.Channels.API;
        hotkeys?: Glue42.Hotkeys.API;
    }

    /**
     * @docmenuorder 5
     * @intro
     * An activity is a **collection of windows** organized in a layout sharing a **private context**.
     *
     * The API is available via the `glue.activities` property.
     *
     * Activities are usually registered as components in ACS and can be instantiated either as "applications" from the ACS toolbar, or programmatically, on demand.
     *
     * An **activity type** is a definition template for an activity, consisting of a collection of **window types**, their layout and an initial **activity context**.
     *
     * A **window type** is a definition of a window, typically configured in ACS. However, the Activities API allows for an application to dynamically define both window types, and activity types at runtime.
     *
     * An **activity context** is an object containing a set of key/value pairs which hold the current state of an activity - examples are the currently selected party, instrument, order, etc.
     *
     * An **activity instance** is an instance of an **activity type** just like an object is an instance of a class in class-based languages (and just like 'John' is an instance of a 'Person'). Activity is often used as a synonym for activity instance.
     *
     * The Activities API enables:
     *
     * - the **definition of Window Types and ActivityTypes** (collection of Window Types, layout and an initial context)
     * - **starting an Activity instance** of a specific Activity Type
     * - **reacting to Activity events** from an Activity-aware window, such as **joining** and **leaving** an activity
     * - application state **synchronization** via Activity context management functions
     * - intra-activity application **collaboration** via Activity AGM extensions functions
     *
     * Each activity instance has a **single owner window** and can optionally have one or more **helper windows**.
     *
     * The **owner** window controls the **lifetime** of the activity - if the owner is closed the activity and all other windows are closed as well. The activity is running as long as the owner is running.
     *
     * **Helper windows** support the owner of the activity and may be defined in the activity type's configuration, or joined to the activity at runtime.
     *
     * ## See also
     * - [Activities Documentation](../../../../activity/)
     */
    namespace Activities {
        /** @ignore */
        export interface LoggerConfig {
            publish: string;
            console: string;
            metrics: string;
        }

        export interface Config {
            mode?: ActivitiesModes;
            typesToTrack: string[];
            /** @ignore */
            logger?: LoggerConfig;
        }

        export type ActivitiesModes = "trackMyOnly" | "trackMyTypeAndInitiatedFromMe" | "trackAll" | "trackTypes" | boolean;

        /**
         * @docmenuorder 1
         */
        export interface API {
            /** API version */
            version: string;

            /**
             * True if the current window is activity aware - meaning that the window has been created as
             * an activity participant - either a helper or an independent window.
             * Check this after the API is ready.
             */
            aware: boolean;

            /** Returns true if the current window is activity aware and is currently participating in activity */
            inActivity: boolean;

            /** A lightweight, single activity oriented subset of the API which should be used by most activity applications */
            my: My;

            /** Extended API that provides access to all running activities and windows and available activity and window types */
            all: ActivitiesManagement;

            /**
             * Note: Don't use if you're using glue - glue library is initialized when all containing libraries are initialized !
             * Using the ready promise/callback applications can be notified when the API is ready to be used.
             */
            ready(callback?: (api: API) => void): Promise<API>;

            /** Returns a list of frame colors that can be used as activity frame  */
            getAvailableFrameColors(): string[];
        }

        /**
         * A lightweight, single activity oriented subset of the API which should be used
         * by most activity applications
         *
         * @docmenuorder 2
         */
        export interface My {

            /** The current activity of the application . Can be undefined (if currently not part of any activity) */
            activity: Activity;

            /** The current activity window; can be undefined (if the window is not part of any activity) */
            window: ActivityWindow;

            /** The context of the activity the application is part of. To update use my.updateContext, to replace my.setContext */
            context: any;

            /**
             * Updates activity context using the properties from the context argument.
             * If old context is {a:1, b:2, c:3} and invoking updateContext({b:3, c:null}) will result a context
             * be {a:1, b:3}
             */
            updateContext(context: any, callback?: any): Promise<object>;

            /** Replaces the activity context with a new one */
            setContext(context: any, callback?: any): Promise<object>;

            /** Creates a new window and joins it to the activity */
            createWindow(windowType: string | WindowDefinition): Promise<ActivityWindow>;

            /** Creates a stacked set of windows and joins them to the */
            // tslint:disable-next-line:array-type
            createStackedWindows(windowTypes: (string | WindowDefinition)[], timeout?: number): Promise<ActivityWindow[]>;

            /** Subscribe for events when the current window joins an activity */
            onActivityJoined(callback: (activity: Activity) => void): void;

            /** Subscribe for events when the current window leaves an activity */
            onActivityLeft(callback: (activity: Activity) => void): void;

            /** Subscribe for context updates */
            onContextChanged(callback: (context: object, delta: object, removed: string[], activity: Activity) => void): void;

            /** Creates a new activity by cloning the current one */
            clone(options: CloneOptions, callback: (activity: Activity) => void): Promise<Activity>;

            /**
             * Attaches the current activity to another activity.
             * By thus the current activity is stopped. It can be restored by using the returned descriptor.
             */
            attach(activity: Activity | string, tag?: object): Promise<AttachedActivityDescriptor>;

            /** Sets the frame color of the current activity */
            setFrameColor(color: string, callback: () => void): Promise<Activity>;

            /** Returns the frame color of the current activity */
            getFrameColor(): string;

            /** Use to subscribe for activity frame color changed events */
            onFrameColorChanged(callback: () => void): void;
        }

        /**
         * Extended API that provides access to all running activities and windows and
         * available activity and window types
         *
         * @docmenuorder 3
         */
        export interface ActivitiesManagement {
            /** Access point to activity types */
            activityTypes: ActivityTypesAPI;

            /** Access point to window types */
            windowTypes: WindowTypesAPI;

            /** Access point to running activity windows */
            windows: WindowingAPI;

            /** Access point to running activity instances */
            instances: InstancesAPI;

            /** Subscribe for events when two activities are attached */
            onAttached(callback: (activity: Activity, descriptor: AttachedActivityDescriptor) => void): void;

            /** Subscribe for events when two activities are detached */
            onDetached(callback: (newActivity: Activity, oldActivity: Activity, descriptor: AttachedActivityDescriptor) => void): void;

            /** Subscribe for activity frame color changed event */
            onActivityFrameColorChanged(callback: (activity: Activity, frameColor: string) => void): void;
        }

        /**
         * @docmenuorder 4
         */
        export interface ActivityTypesAPI {
            /** Returns All known activity types or specific activity type by name */
            get(name?: string): ActivityType[] | ActivityType;

            /**
             * Registers a new activity type
             * @param activityTypeName      The name of the activity type to be created
             * @param ownerWindowType       The type of the owner window or a WindowDefinition for the owner window
             * @param helperWindowTypes     Types of helper windows (or WindowDefinitions for helper windows) for that activity type
             * @param layoutConfig          Layout config
             * @param description           Description for the new activity type
             * @param callback              (Optional) Callback for results - if not specified the method will return a promise
             */
            register(activityTypeName: string, ownerWindowType: string | WindowDefinition, helperWindowTypes?: string[] | WindowDefinition[], layoutConfig?: any, description?: string, callback?: (at: ActivityType) => void): Promise<ActivityType>;

            /**
             * Unregister existing activity type
             * @param type The name of the activity type to be removed
             */
            unregister(type: string): void;

            /**
             * Initiates a new activity from the given type.
             * @param activityType  The ActivityType to initiate
             * @param context       The initial context of the activity
             * @param callback      Callback for result
             * @returns             Promise for activity
             */
            initiate(activityType: string, context?: object, configuration?: OverrideTypeDefinition | WindowDefinition[], callback?: (act: Activity) => void): Promise<Activity>;

            /** Subscribe a handler for ActivityType events */
            subscribe(handler: (act: ActivityType, event: string) => void): void;

            /** Un-subscribe a handler for ActivityType events */
            unsubscribe(handler: (act: ActivityType, event: string) => void): void;
        }


        /**
         * @docmenuorder 5
         */
        export interface WindowTypesAPI {

            /** Get all window types or a specific by name */
            get(name?: string): WindowType[] | WindowType;

            /**
             * Allows you to subscribe for windows events, e.g. window type registered
             * @param handler   The handler to receive notifications
             * @returns {}
             */
            subscribe(handler: (act: WindowType, event: string) => void): void;

            /** Unregister a handler from receiving window events */
            unsubscribe(handler: (act: WindowType, action: string) => void): void;

            /**
             * Registers a factory for a given WindowType. The factory will be called once window of that type is requested
             * @param windowType      Window type that will be constructed from the factory. Can be a string (name of the window type)
             * or object that has name, description properties
             * @param factoryMethod   The factory that will construct Windows of that type
             * @returns {}
             */
            registerFactory(windowType: string | { name: string, description: string }, factoryMethod: (activityInfo: ActivityWindowCreateRequest) => Promise<void>): Promise<any>;
        }

        export interface ActivityWindowCreateRequest {
            activityId: string;
            type: string;
            gwToken?: string;
            configuration?: any;
        }

        /**
         * @docmenuorder 6
         */
        export interface WindowingAPI {
            /**
             * Returns activity windows based on some filter. If no filter supplied all activity windows are returned.
             * @param filter  Filter that
             * @returns Array of ActivityWindows that match the filter object
             */
            get(filter: { id?: string, type?: string, name?: string, activityId?: string }): ActivityWindow[];

            /**
             * Initialises activity for the current window - by doing this the window is announced as activity aware to the other participants
             * @param activityWindowId      The id of the window that was created
             * @param windowType            Type of window
             * @returns {}                  Promise for an activity window (joined to an activity, if the activity creation fails the promise will be rejected)
             */
            announce(activityWindowId?: string, windowType?: string): Promise<ActivityWindow>;

            /**
             * Creates a new window from a given type and joins it to an activity
             *
             * @param activity      Activity to join the window to
             * @param windowType    The window type to join (string or window definition)
             * @param callback      (Optional) Result callback
             * @returns             Promise for ActivityWindow
             */
            create(activity: Activity, windowType: string | WindowDefinition, callback?: (aw: ActivityWindow) => void): Promise<ActivityWindow>;

            /**
             * Allows you to subscribe for windows events, e.g. window joining to activity
             * @param handler   The handler to receive notifications
             * @returns {}
             */
            subscribe(handler: (activity: Activity, window: ActivityWindow, event: any) => void): void;

            /** Unsubscribe a handler from receiving notifications */
            unsubscribe(handler: (activity: Activity, window: ActivityWindow, event: any) => void): void;
        }

        /**
         * @docmenuorder 7
         */
        export interface InstancesAPI {
            /**
             * @returns All started activities
             * @param activityType Can be a string or @type ActivityType. If string a new activityType will be created using the string for name.
             * @returns Array of Activity objects
             */
            get(activityType?: string | ActivityType | string[] | ActivityType[]): Activity[];

            /**
             * Subscribe for activity status events
             * @param handler Handler function that will receive status notifications
             */
            subscribe(handler: (activity: Activity, newStatus: ActivityStatus, oldStatus: ActivityStatus) => void): void;

            /** Un-subscribe a handler from receiving activity status events */
            unsubscribe(handler: (activity: Activity, newStatus: ActivityStatus, oldStatus: ActivityStatus) => void): void;
        }

        /**
         * @docmenuorder 8
         */
        export interface Activity {
            /** Id of the activity */
            id: string;

            /** Type of the activity */
            type: ActivityType;

            /** Context of the activity */
            context: any;

            /** Status of the activity */
            status: ActivityStatus;

            /** Owner window */
            owner: ActivityWindow;

            /** List of all windows participating in the activity (including the owner) */
            windows: ActivityWindow[];

            /**
             * Creates a new window and join it to the activity
             */
            createWindow(windowType: string | WindowDefinition, callback?: (aw: ActivityWindow) => void): Promise<ActivityWindow>;

            /**
             * Creates a stacked set of windows and joins them to the activity
             */
            createStackedWindows(windowTypes: Array<(string | WindowDefinition)>, timeout?: number, callback?: (aw: ActivityWindow[]) => void): Promise<ActivityWindow[]>;

            /**
             * Get all windows participating in the activity from a given type
             */
            getWindowsByType(windowType: string): ActivityWindow[];

            /**
             * Replaces the activity context with a new one.
             */
            setContext(context: any, callback?: (activity: Activity) => void): Promise<object>;

            /**
             * Updates activity context using the properties from the context argument.
             * If old context is {a:1, b:2, c:3} and invoking updateContext({b:3, c:null}) will result a context
             * be {a:1, b:3}
             */
            updateContext(context: any, callback?: (activity: Activity) => void): Promise<object>;

            /** Subscribe for activity status change events */
            onStatusChange(handler: (activity: Activity, newStatus: ActivityStatus, oldStatus: ActivityStatus) => void): () => void;

            /** Subscribe for window related events, like joined, removed from activity */
            onWindowEvent(handler: (activity: Activity, window: ActivityWindow, event: ActivityWindowEvent) => void): () => void;

            /** Subscribe for context updates */
            onContextChanged(handler: ContextUpdateHandler): void;

            /** Stop the activity and close all windows */
            stop(): void;

            /** Creates a new activity with the same set of windows. */
            clone(options: CloneOptions): Promise<Activity>;

            /**
             * Attaches the current activity to another activity.
             * By thus the current activity is stopped. It can be restored by using the returned descriptor.
             */
            attach(activity: Activity | string, tag?: object): Promise<AttachedActivityDescriptor>;

            /** Subscribe for events when another activity is attached the this one */
            onActivityAttached(callback: (descriptor: AttachedActivityDescriptor) => void): void;

            /** Subscribe for events when another activity is detached the this one */
            onDetached(callback: (newActivity: Activity, descriptor: AttachedActivityDescriptor) => void): void;
        }

        export interface OverrideTypeDefinition {
            owner: WindowDefinition;
            helpers: WindowDefinition[];
        }

        /**
         * Context update handler
         *
         * @docmenuorder 10
         *
         * @param {Object} context The full context after the update
         * @param {Object} delta Object that contains only the changed properties
         * @param {string[]} removed Array of strings that contains the names of the removed properties
         * @param {Activity} activity The activity that was updated
         */
        type ContextUpdateHandler = (context: object, delta: object, removed: string[], activity: Activity) => void;

        /** activityStatus Defines activity instance status */
        interface ActivityStatus {
            getState(): string;

            getMessage(): string;

            getTime(): Date;
        }

        enum ActivityWindowEvent {
            Joined,
            Removed
        }

        /** Defines activity window  */
        interface WindowDefinition {
            type: string;
            name: string;
            isIndependent: boolean;
            left?: number;
            top?: number;
            width?: number;
            height?: number;
            relativeTo?: string | {
                type?: string;
                windowId?: string;
            };

            relativeDirection?: string;
            useExisting?: boolean;

            /** the context of the new window */
            context?: object;

            /** deprecated , don't use, to be removed */
            arguments?: object;
            windowStyleAttributes?: object;
        }

        /**
         * An activity type is a definition template for an activity, consisting of a collection of window types,
         * their layout and an initial activity context.
         */
        interface ActivityType {
            /** Name of the activity type */
            name: string;

            /** description for the activity type */
            description: string;

            /** A list of window types that should be created when initiating a new instance of that activity type */
            helperWindows: WindowDefinition[];

            /** Returns the definition of the owner window for that activity type */
            ownerWindow: WindowDefinition;

            /** Initiates a new activity of this type
             *
             * @param {object} context The initial context to be used for the new activity
             */
            initiate(context: object, callback?: (activity: Activity) => void, configuration?: OverrideTypeDefinition | WindowDefinition[]): Promise<Activity>;
        }

        /**  A window type is a definition of a window, typically configured in ACS. */
        interface WindowType {

            /** Name of the window type */
            name: string;

            /** Returns the ACS configuration related to this window type (as application object from AppManager API) */
            config: object;

            /**  All windows from that type */
            windows: ActivityWindow[];
        }

        interface WindowBounds {
            top?: number;
            left?: number;
            width?: number;
            height?: number;
        }

        /**
         * A window participating in an activity
         *
         * @docmenuorder 9
         *
         */
        interface ActivityWindow {

            /** The window id */
            id: string;

            /** The window name */
            name: string;

            /** The window type */
            type: WindowType;

            /**  The activity that the window is part of */
            activity: Activity;

            /** True if the window is the owner of the activity */
            isOwner: boolean;

            /** The agm instance of that window. You can use this to invoke AGM methods against that window */
            instance: Glue42Core.AGM.Instance;

            /** Returns the window as object from Windows API (Glue.windows) */
            underlyingWindow: Windows.GDWindow;

            /** True if this is an independent window */
            isIndependent(): boolean;

            /** Sets window's visibility */
            setVisible(isVisible: boolean, callback?: (aw: ActivityWindow) => void): Promise<ActivityWindow>;

            /** Activate window */
            activate(focus: boolean): Promise<ActivityWindow>;

            /** Return window's bounds */
            getBounds(): Promise<WindowBounds>;

            /** Sets window's bounds */
            setBounds(bounds: WindowBounds, callback?: (aw: ActivityWindow) => void): Promise<ActivityWindow>;

            /** Closes the window */
            close(): Promise<any>;

            /** Subscribe for events when the window joins an activity */
            onActivityJoined(callback: (activity: Activity) => void): void;

            /** Subscribe for events when the window leaves an activity */
            onActivityRemoved(callback: (activity: Activity) => void): void;
        }

        interface AttachedActivityDescriptor {
            ownerId: string;
            windowIds: string[];
            frameColor: string;
            context: object;
            tag: object;

            detach(descriptor?: AttachedActivityDescriptor): Promise<Activity>;
        }

        /** Options for cloning an activity */
        interface CloneOptions {
            /** Context for the new activity */
            context: object;
            /** Offset from the original activity */
            offset: { left: number, top: number };
        }
    }

    /**
     * @docmenuorder 4
     * @intro
     * The Application Management API provides a way to manage GLUE Desktop applications.
     *
     * It provides abstractions for:
     *
     * *Application* - A program as a logical entity registered in GLUE Desktop with some metadata (name, description, icon ,etc.) and with all the configuration needed to spawn one or more instances of it. The API provides facilities for retrieving app metadata and for detecting when an application is started.
     *
     * *Instance* - A running copy of an application. The API provides facilities for starting/stopping application instances, and for managing its windows.
     *
     * The API can be accessed using `glue.appManager`.
     *
     * ## See also
     * - [Application Management Documentation](../../../../app-management/)
     */
    namespace AppManager {

        export interface API extends AppManager, Entitlements {
            myInstance: Instance;
            ready(): Promise<{} | void>;
        }

        export interface AppManager {

            /** Returns app by name */
            application(name: string): Application;

            /** Returns an array with all registered applications for the current branch. */
            applications(): Application[];

            /** Returns an array with all running instances */
            instances(): Instance[];

            /** Notifies you when a new application instance has been started. */
            onInstanceStarted(callback: (instance: Instance) => any): UnsubscribeFunction;

            /** Notifies you when the start of a new instance has failed */
            onInstanceStartFailed(callback: (instance: Instance) => any): UnsubscribeFunction;

            /** Notifies you when an application instance has been stopped. */
            onInstanceStopped(callback: (instance: Instance) => any): UnsubscribeFunction;

            /** Notifies you when an application instance is updated. */
            onInstanceUpdated(callback: (instance: Instance) => any): UnsubscribeFunction;

            /** Notifies you when an application is registered in the environment. */
            onAppAdded(callback: (app: Application) => any): UnsubscribeFunction;

            /** Notifies you if the application is removed from the environment. */
            onAppRemoved(callback: (app: Application) => any): UnsubscribeFunction;

            /** Notifies you when an application is available and can be started. */
            onAppAvailable(callback: (app: Application) => any): UnsubscribeFunction;

            /** Notifies you when an application is no longer available and can not be started. */
            onAppUnavailable(callback: (app: Application) => any): UnsubscribeFunction;

            /** Notifies you when the configuration for some application has changed. */
            onAppChanged(callback: (app: Application) => any): UnsubscribeFunction;
        }

        /** @ignore */
        interface Entitlements {

            /** Returns the region under which the API operates. */
            getRegion(success?: (region: string) => any, error?: (err: any) => any): void | Promise<string>;

            /**
             * Returns the list of branches for which the user has coverage.
             * Returns an error if your application does not have access to App Management admin functionality.
             */
            getBranches(success?: (branches: Branch[]) => any, error?: (err: any) => any): void | Promise<Branch[]>;

            /**
             * Retrieves the user branch that the API operates under.
             * Returns an error if your application does not have access to App Management admin functionality.
             */
            getCurrentBranch(success?: (branch: Branch) => any, error?: (err: any) => any): void | Promise<Branch>;

            /**
             * Returns the effective entitlement value for a specific function.
             * Returns null if there's no such functional entitlement.
             * The entitlements depend on the branch that is selected.
             * Most applications will typically only care about the function name.
             * However, the API allows a functional entitlement to be associated with a scalar value.
             */
            getFunctionalEntitlement(funct: string, success?: (entitlement: string) => any, error?: (err: any) => any): void | Promise<string>;

            /** Same as getFunctionalEntitlement but you can specify a branch */
            getFunctionalEntitlementBranch(funct: string, branch: string, success?: (entitlement: string) => any, error?: (err: any) => any): void | Promise<string>;

            /**
             * Changes the current branch under which the API operates.
             * Functional entitlements and the list of applications
             * a user is entitled to run depend on the selected branch.
             */
            setCurrentBranch(branch: string, success?: (resMsg: string) => any, error?: (err: any) => any): void | Promise<string>;

            /** Changes the region under which the API operates. */
            setRegion(region: string, success?: (resMsg: string) => any, error?: (err: any) => any): void | Promise<string>;

            /** Returns  info about the currently logged on user. */
            currentUser(success?: (user: UserInfo) => any, error?: (err: any) => any): void | Promise<UserInfo>;

            /** Checks whether the currently logged on user is entitled to perform a certain function. */
            canI(functionName: string, success?: (allowed: boolean) => any, error?: (err: any) => any): void | Promise<boolean>;

            /** Checks whether the currently logged on user is entitled to perform a certain function on a given branch. */
            canIBranch(functionName: string, branch: string, success?: (allowed: boolean) => any, error?: (err: any) => any): void | Promise<boolean>;

            /** Allows you to track when branches collection has been modified */
            onBranchesChanged(callback: (branches: Branch[]) => any): void;

            /** Allows you to track when the current branch has changed */
            onBranchChanged?(callback: (branch: Branch) => any): void;

            /** Exits the App Manager, stops all application instances and closes all windows. */
            exit(options: ExitOpts): Promise<any>;
        }

        /** @ignore */
        type Mode = "startOnly" | "skipIcons" | "full";

        /** @ignore */
        interface Config {
            activities: Glue42.Activities.API;
            agm: Glue42Core.AGM.API;
            logger: Glue42Core.Logger.API;
            mode: Mode;
            windows: Glue42.Windows.API;
            gdMajorVersion: number;
        }

        interface Application {
            /** Application name */
            name: string;

            /** Application title */
            title: string;

            /** Application version */
            version: string;

            /**
             * If true the application is auto started with the framework
             * @since 3.1.0
             */
            autoStart: boolean;

            /**  */
            isShell: boolean;

            /**
             * The caption of the application
             * @since 3.1.0
             */
            caption: string;

            /**
             * If true the application should not be visible when building appManager like applications
             * @since 3.1.0
             */
            hidden: boolean;

            /** The container identifier */
            container: string;

            /**
             * The activity type associated with this application (populated only if this is activity application)
             * @since 3.1.0
             */
            activityType: string;

            /**
             * The activity window type associated with this application
             * @since 3.1.0
             */
            activityWindowType: string;

            /**
             * The window settings object passed to HtmlContainer (if this is a HC application). Contains all window settings configured in ACS.
             * @since 3.1.0
             */
            windowSettings: { [key: string]: any };

            /**
             * If true the application can be started multiple times , if false only single instance is allowed
             * @since 3.1.0
             */
            allowMultiple: boolean;

            /** If true the application is available and can be started */
            available: boolean;

            /** Base64 string of the app icon */
            icon: string;

            /** The urls of the app icon */
            iconURL: string;

            /** Sort indicator - if showing apps in a list they should be ordered based on that field */
            sortOrder: number;

            /** Custom configuration object attached to the application */
            userProperties: { [key: string]: any };

            /**
             * If true the application is an activity
             * @since 3.0.8
             */
            isActivity: boolean;

            /**
             * ACS configuration object for the application
             * These are kept for legacy applications - all are available in the app object now
             */
            configuration: LegacyAppConfigProperties;

            /** Instances of that app */
            instances: Instance[];

            /** Type of the application, can be window, activity or exe */
            type: string;

            /**
             * Mode of the application window. Can be:
             * * "flat", "html", "tab" - if the application runs in GD window
             * * "unknown" if the mode can not be determined (e.g. external apps, activity definitions)
             */
            mode: Glue42.Windows.WindowMode | "unknown";

            /**
             * Start an instance of the app
             * @param {Object} context - context to be passed to the started applications
             * @param {Object} options - options object - here you can specify:
             * * any window setting - these will be applied to the new window override the settings from ACS.
             * * additional options listed bellow:
             * @param {boolean} [options.waitForAGMReady=true] - if set the result Promise will be resolved when
             * the AGM server for the app is ready (so you can directly execute AGM methods against the application).
             * @since 3.0.5
             */
            start(context?: object, options?: ApplicationStartOptions): Promise<Instance>;

            /**
             * Will notify when instances of this application are started
             * @param callback The callback will be invoked when a new instance is started. It will receive the instance object as argument
             */
            onInstanceStarted(callback: (instance: Instance) => any): void;

            /**
             * Will notify when instances of this application are stopped
             * @param callback The callback will be invoked when an instance is stopped. It will receive the instance object as argument
             */
            onInstanceStopped(callback: (instance: Instance) => any): void;

            /**
             * Will notify when the application becomes available
             * @param callback
             */
            onAvailable(callback: (app: Application) => any): void;

            /**
             * Will notify when the application becomes unavailable
             * @param callback
             */
            onUnavailable(callback: (app: Application) => any): void;

            /**
             * Will notify when the application configuration has changed
             * @param callback
             */
            onChanged(callback: (app: Application) => any): void;

            /**
             * Will notify when the application was removed
             * @param callback
             */
            onRemoved(callback: (app: Application) => any): void;
        }

        export interface Instance {
            /** The instance id */
            id: string;

            /** The application object for that instance */
            application: Application;

            /** If the instance is part of an activity this returns the activity object (from Activity API) */
            activity: Activities.Activity;

            /**
             * If the instance is part of an activity returns the instances (as object of this API) of the
             * other windows of the activity
             * @since 3.0.8
             */
            activityInstances: Instance[];

            /**
             * If the instance is part of an activity this returns the instance (as object of this API) of
             * the owner window of the activity
             * @since 3.0.8
             */
            activityOwnerInstance: Instance;

            /**
             * The window (as an object from Windows API) associated with the instance.
             * This is undefined in the case of activity instance (isActivityInstance == true).
             * @since 3.0.8
             */
            window: Windows.GDWindow;

            /** The instance start-up context */
            context: object;

            /** Title of the instance */
            title: string;

            /**
             * Each activity app has a special instance that is not connected to any window,
             * but stays alive as long as the activity is running.
             * This instance is returned when you start an activity app.
             * @since 3.0.8
             */
            isActivityInstance: boolean;

            /**
             * The activity id (only if the apps is part of an activity)
             * @since 3.0.8
             */
            activityId: string;

            /**
             * True if the instance is running as part of an activity
             * @since 3.0.8
             */
            inActivity: boolean;

            /**
             * True if the instance is running as single window application (not part of an activity)
             * @since 3.0.8
             */
            isSingleWindowApp: boolean;

            /** AGM instance; use this to invoke methods against the app */
            agm: Partial<Glue42Core.AGM.Instance>;

            /** Stop the instance */
            stop(): Promise<void>;

            /** Activates the instance */
            activate(): Promise<Glue42Core.AGM.InvocationResult<any>>;

            onAgmReady(callback: (instance: Instance) => any): void;
            onStopped(callback: (instance: Instance) => any): void;
        }

        export interface Branch {
            Name: string;
            Roles: Array<Roles>;
        }

        export interface UserInfo {
            FirstName: string;
            LastName: string;
            LoginName: string;
        }

        export interface ExitOpts {
            autoSave: boolean;
        }

        export interface ApplicationStartOptions extends Partial<Glue42.Windows.WindowSettings> {
            waitForAGMReady?: boolean;
            ignoreSavedLayout?: boolean;
        }

        export interface LegacyAppConfigProperties {
            autoStart?: boolean;
            caption?: string;
            hidden?: boolean;
            container?: string;
            activityType?: string;
            allowMultiple?: boolean;
        }

        export type Roles = "Full" | "ReadWrite" | "ReadOnly";

    }

    /**
     * @docmenuorder 8
     * @intro
     * A module that deals with contexts. Context is a pair of name and value, where the values is a simple object.
     *
     * An example for context would be the common applications theme settings that define the style of all running applications.
     * This data is meant to be used by different applications.
     *
     * ## See also
     * - [Shared Contexts Documentation](../../../../contexts/)
     */
    namespace Contexts {
        export interface API {
            /**
             * Returns all known contexts names. Using context name you can subscribe for changes, update or set context value
             */
            all(): string[];

            /**
             * Updates a context with some object. The object properties will replace the context properties, any other
             * context properties will remain in the context. If the context does not exists the update call will create it.
             *
             * @example
             * ```javascript
             * // if theme does not exists creates a context called theme with initial value
             * glue.contexts.update("theme", {font:10, "font-family":"Arial"})
             *
             * // increases font to 11, after that call context is { font:10, font-family:"Arial"}
             * glue.contexts.update("theme", {font:11})
             * ```
             * @param name Name of the context to be updated
             * @param data The object that will be applied to the context
             */
            update(name: string, data: any): Promise<void>;

            /**
             * Replaces a context
             * @param name Name of the context to be updated
             * @param data The object that will be applied to the context
             */
            set(name: string, data: any): Promise<void>;

            /**
             * Subscribe for context events
             * @param name name of the context to subscribe for
             * @param callback function that will receive updates.
             * @returns Function execute the returned function to unsubscribe
             */
            subscribe(name: string, callback: (data: any, delta: any, removed: string[], unsubscribe: () => void) => void): Promise<() => void>;
        }

        /** @ignore */
        export interface ContextsConfig {
            connection: Glue42Core.Connection.API;

            logger: Glue42Core.Logger.API;

            gdMajorVersion: number;
        }

        export interface ContextDelta {
            added: { [index: string]: any };

            updated: { [index: string]: any };

            removed: string[];

            reset: { [index: string]: any };
        }

        export type ContextName = string;
        export type ContextSubscriptionKey = number;

    }

    /**
     * @docmenuorder 6
     * @intro
     * Layouts allow you to save the layouts of any set of applications running in Glue Desktop as a named layout and later restore it.
     *
     * The API can be accessed using:
     *
     * ```javascript
     * glue.layouts
     * ```
     *
     * Layouts library supports different types of layouts:
     *
     * * Global layouts
     *
     * Global save and restore is an operation in which all applications running on a user's PC's are saved to a named layout and which can then be restored.
     *
     * * Activity layouts
     *
     * Activity layout is the saved layout of a running activity that can be later restored.
     *
     * The layout can be restored:
     * * as a new activity instance - in this case the restore activity will appear at the exact position the layout was saved
     * * and joined to existing activity instance - in this case the layout will be arranged around the owner of the existing activity
     *
     * * Application's default layouts
     *
     * When an application is started from the Toolbar, the initial size and position is defined in the application properties. Users often want to place it at an alternative position and so move it. GlueDesktop remembers the last location of a window and use that as the new start position.
     *
     * Saving the last position is enabled by default for all applications (single windows or activities), but can be disabled per application by configuration.
     *
     * Also if the user holds Shift key while starting an application it will appear on default screen position (as defined in properties) – this does not require change in AppManager.
     *
     * ## See also
     * - [Layouts Documentation](../../../../layouts/)
     */
    namespace Layouts {

        /**
         * Supported layout types:
         * * Global layout - saves all running applications and their state. By default ignores hidden windows
         * * Activity layout - saves applications running in an activity the activity state and individual windows state.
         *      By default saves the activity of the current application but can be configured to save any activity.
         *      Activity layouts can be restored as new activity instances or joined to any running activity.
         *
         * @docmenuorder 11
         *
         */
        export type LayoutType = "Global" | "Activity";

        /**
         * Library initialization mode
         * * slim - in this mode the application:
         *   * will be able to store custom data when a layout is saved (opt in)
         *   * will be able to not track layout events
         *   * will not be able to manage layouts(create, delete, rename)
         * * full - in this mode the application:
         *   * will be able to store custom data when a layout is saved (opt in)
         *   * will be able to track layout events
         *   * will be able to manage layouts(create, delete, rename)
         * * fullWaitSnapshot - same as full but the library will raise ready when
         *   it receives the snapshot of layouts. In full mode ready is called when
         *   the lib is successfully subscribed to stream (a bit earlier)
         *
         * @docmenuorder 10
         */
        export type Mode = "slim" | "full" | "fullWaitSnapshot";

        /**
         * Controls import behavior. If replace (default) all existing layouts will be removed.
         * If merge layouts will be imported over the existing layouts
         *
         * @docmenuorder 12
         *
         */
        export type ImportMode = "replace" | "merge";

        export interface Configuration {
            agm: Glue42Core.AGM.API;
            logger: Glue42Core.Logger.API;
            mode: Mode;
            appManager: Glue42.AppManager.API;
            activityGetter: () => Glue42.Activities.API;
        }

        /**
         * Layouts API
         *
         * @docmenuorder 1
         *
         */
        export interface API {
            ready(): Promise<void>;

            /** Lists all layouts */
            list(): Layout[];

            /**
             * Saves a new layout
             */
            save(layout: NewLayoutOptions): Promise<Layout>;

            /**
             * Imports one or more layouts
             */
            import(layouts: Layout[], mode?: ImportMode): Promise<void>;

            /**
             * Returns all layouts in the system
             */
            export(): Promise<Layout[]>;

            /**
             * Restores a layout
             */
            restore(options: RestoreOptions): Promise<void>;

            /**
             * Removes a layout
             * @param type type of the layout to remove
             * @param name name of the layout to remove
             * @returns {Promise}
             */
            remove(type: string, name: string): Promise<void>;

            /**
             * Renames a layout
             * @param layout existing layout to rename
             * @param newName the new name of the layout
             */
            rename(layout: Layout, newName: string): Promise<void>;

            /**
             * Updates a layout's metadata
             * @param layout existing layout to update its metadata
             */
            updateMetadata(layout: Layout): Promise<void>;

            /**
             * Notifies when a new layout is added.
             * @returns Invoke the function to unsubscribe from events
             */
            onAdded(callback: (layout: Layout) => void): () => void;

            /**
             * Notifies when a layout is removed
             * @returns Invoke the function to unsubscribe from events
             */
            onRemoved(callback: (layout: Layout) => void): () => void;

            /**
             * Notifies when a layout is changed
             * @returns Invoke the function to unsubscribe from events
             */
            onChanged(callback: (layout: Layout) => void): () => void;

            /**
             * Notifies when a layout was renamed
             * @returns Invoke the function to unsubscribe from events
             */
            onRenamed(callback: (layout: Layout) => void): () => void;

            /**
             * Subscribe for raw stream events. For debugging purposes only
             */
            onEvent(callback: (event: any) => void): () => void;

            /**
             * Subscribe for layout save requests. The callback passed as argument will be
             * invoked when a layout save is requested. Your app have the option to save some
             * data (context) which will be restored when the layout is restored.
             *
             * @returns {function} Function that can be used to unsubscribe
             */
            onSaveRequested(callback: (context?: object) => SaveRequestResponse): () => void;
        }

        /**
         * Describes a layout with all of its state
         *
         * @docmenuorder 2
         *
         */
        export interface Layout {
            /** Name of the layout - name is unique per layout type */
            name: string;

            /** Type of the layout */
            type: LayoutType;

            /** Array of components describing the applications that are saved in the layout */
            components: LayoutComponent[];

            /** Context passed when the layout was saved */
            context: any;

            /** Metadata passed when the layout was saved */
            metadata: any;
        }

        export type ComponentType = "activity" | "application";

        /**
         * Saved component (single window application or activity) with its state (bounds, context)
         */
        export interface LayoutComponent {
            /** Type of the component - can be application or activity */
            ComponentType: ComponentType;

            /** Object describing application bounds, name, context, etc. per window */
            State: any;
        }

        export interface NewLayoutOptions {
            /** Name of the layout to be saved. */
            name: string;

            /** Type of the layout to be saved. Default is Global */
            type: LayoutType;

            /**
             * Context to be saved with the layout.
             * Use to transfer application specific data to restored application.
             */
            context?: any;

            /**
             * Metadata to be saved with the layout.
             */
            metadata?: any;

            /** Only if layout type is global. If true the layout will not include hidden apps. True by default */
            ignoreHidden?: boolean;

            /** Only if layout type is global. Ignore current instance when saving the layout. False by default */
            ignoreMyInstance?: boolean;

            /**
             * Only if layout type is Activity. Will save the layout of the activity with the supplied id.
             * If not passed will use the activity that the calling application participates in. If the current
             * application is not in activity an error will be raised.
             */
            activityId?: string;
        }

        export interface RestoreOptions {

            /**
             * Name of the layout to restore
             */
            name: string;

            /**
             * Type of the layout to restore. Default is Global
             */
            type?: string;

            /**
             * If true will close all running visible instances before restoring.
             * Exceptions (that won't be closed) are current application and also the AppManager application.
             * Default is true for Global layouts and false for Activity.
             */
            closeRunningInstance?: boolean;

            /**
             * Context object that will reach restored apps.These will merge with the saved context.
             */
            context?: object;

            /**
             * Only if type is Activity.If true will try to reuse existing windows when restoring. Default is true.
             */
            reuseWindows?: boolean;

            /**
             * Only if type is Activity.If set the activity will be restored and joined to the specified activity.
             * If not set a new activity instance will be created from the saved layout.
             */
            activityIdToJoin?: string;

            /**
             * Only if type is Activity.If true will set the activity context upon restore. Default is true.
             */
            setActivityContext?: boolean;

            /**
             * Only if type is Activity and activityId is set. If true will restore the activity owner. Default is false.
             */
            restoreActivityOwner?: boolean;

            /**
             * Only if type is Activity and activityId is set.
             * Using this you can specify that certain window types should not be restored
             */
            ignoreActivityWindowTypes?: string[];

            /**
             * Restore splash options
             */
            splash: RestoreSplashOptions;

            /**
             * Restore timeout option
             */
            timeout?: number;
        }

        export interface RestoreSplashOptions {
            text: string;
            textColor: string;
            backgroundColor: string;
            animationColor: string;
        }

        /**
         * Object returned as a result to save layout request.
         */
        export interface SaveRequestResponse {

            /** Context specific to the window/application. */
            windowContext: object;

            /** If activity owner the app can return activity context. On restore will be merged into the activity context (glue.activities.my().context) */
            activityContext: object;
        }

    }

    /**
     * @docmenuorder 3
     * @intro
     * The Window Management API lets you create and manipulate windows and is the basis of the Application Management and Activities APIs.
     *
     * The Window Management API is exposed in `glue.windows`, and gives you the following features, not found in any normal browser:
     *
     * - create 3 types of windows: metro/flat, HTML or tab
     * - completely control and customize the chrome of many of these windows:
	 * - visibility: e.g. create hidden windows, show them later
	 * - size: set minimum and/or maximum bounds
	 * - control what the user can do with the windows, e.g. allow a window to be sticky, to have minimize/maximize/close buttons
	 * - add custom buttons on the windows and react to the user clicking these
	 * - organize windows into tabs which the user can tear off
     *
     * ## See also
     * - [Window Management Documentation](../../../../window-management/)
     */
    namespace Windows {

        export interface WindowSettings {
            /** Coordinate on the vertical axis */
            top?: number;

            /** Coordinate on the horizontal axis */
            left?: number;

            /** Width of the app's window */
            width?: number;

            /** Height of the app's window */
            height?: number;

            /** If false window will not contain close button */
            allowClose?: boolean;

            /** If false tab header will not contain close button */
            allowTabClose?: boolean;

            /** If false window will not contain collapse button */
            allowCollapse?: boolean;

            /** If false window will not contain activity related forward button */
            allowForward?: boolean;

            /** If false window will not contain maximize button */
            allowMaximize?: boolean;

            /** If false window will not contain minimize button */
            allowMinimize?: boolean;

            /** If false window won’t be able to be unstuck */
            allowUnstick?: boolean;

            /** If false window will not contain lock/unlock button */
            allowLockUnlock?: boolean;

            /** If true when move operation ends the window will snap to the one of the approaching edges (if any the approaching edges are marked with red) */
            autoSnap?: boolean;

            /** When true a snapped window will adjust its bounds in order to have equal width/height and/or to occupy the space between other windows (if any) */
            autoAlign?: boolean;

            /** Image as Base64 string that will be used as taskbar icon for the window */
            base64ImageSource?: string;

            /** Can be a colour name such as “Red”, or a hex-encoded RGB or ARGB value */
            borderColor?: string;

            /** Defines the height of the window when collapsed */
            collapseHeight?: number;

            /** If true allows opening dev console (using F12) for the new window */
            devToolsEnable?: boolean;

            /** Object that defines file download behavior in the window */
            downloadSettings?: DownloadSettings;

            /** If true the window will start collapsed */
            isCollapsed?: boolean;

            /** If true the window will open as popup, sharing lifetime and environment with the opener */
            isPopup?: boolean;

            /** If true the window will stick to other sticky windows forming groups */
            isSticky?: boolean;

            /** If false window will not take focus when created */
            focus?: boolean;

            /** If false a window in HTML mode can not be moved */
            hasMoveAreas?: boolean;

            /** If false a window cannot be resized by dragging its borders, maximizing, etc. */
            hasSizeAreas?: boolean;

            /** If true the window will be started as hidden */
            hidden?: boolean;

            /** If true will allow users to navigate back (CTRL+Left) and forward (CTRL+Right) through the web page history */
            historyNavigationEnabled?: boolean;

            /** Specify maximum window’s height */
            maxHeight?: number;

            /** Specify maximum window’s width */
            maxWidth?: number;

            /** Specify minimum window’s height */
            minHeight?: number;

            /** Specify minimum window’s width */
            minWidth?: number;

            /** HTML Container window type. */
            mode?: WindowMode;

            /** How much of the outer window area to be considered as sizing area (meaning you can move the window using it). The string value corresponded to the left, top, right, bottom borders. */
            moveAreaThickness?: string;

            /** HTML Container window can contains move area thickness top margin. The margin is related to the top border of ‘moveAreaThickness’ only. The string value corresponded to the left, top, right, bottom */
            moveAreaTopMargin?: string;

            /** If true window will appear in the topmost z-order */
            onTop?: boolean;

            /** The window id of the window that will be used to relatively position the new window. Can be combined with relativeDirection */
            relativeTo?: string;

            /** Direction (bottom, top, left, right) of positioning the window relatively to relativeTo window. Considered only if relativeTo is supplied */
            relativeDirection?: RelativeDirection;

            /** If false window will not appear into the windows taskbar */
            showInTaskbar?: boolean;

            /** Whether window will have a window title bar */
            showTitleBar?: boolean;

            /** How much of the outer window area to be considered as sizing area (meaning you can resize using that area) . The string value corresponded to the left, top, right, bottom borders */
            sizeAreaThickness?: string;

            /** Specifies active Sticky Window snapping edges. Possible combinations are: “top”, “left”, “right”, “bottom”, “all” and any combination of them (e.g. “left, right”) */
            snappingEdges?: string;

            /** Specifies start window location - possible options are Automatic (HC decides where window will be positioned) and CenterScreen */
            startLocation?: string;

            /** Specifies sticky frame color. Accepts hex color as string (e.g. “#666666”) or named Html colors (e.g. 'red’) */
            stickyFrameColor?: string;

            /** If set the sticky window can only stick to windows that have the same group. */
            stickyGroup?: string;

            /** Specifies tab’s group id. If two or more tab windows are defined with same id they will be hosted into the same tab window */
            tabGroupId?: string;

            /** Specifies tab’s position index. Tab windows in the same tab group are ordered by their position index. Use negative index to make the tab active. */
            tabIndex?: number;

            /** If it true, the tab will be activated  */
            tabSelected?: boolean;

            /** The title of the Tab Window */
            tabTitle?: string;

            /** The tab tooltip of the Tab Window */
            tabToolTip?: string;

            /** Sets the window title. To work properly there should be a title HTML tag in the page */
            title: string;

            /** Object that defines loader behavior */
            loader?: Loader;

            /** Required. The url to load in the new window */
            url: string;

            /** */
            useRandomFrameColor?: boolean;

            /** If set window will start in the specified state (maximized, minimized, normal) */
            windowState?: WindowState;

            /** Required. The name of the window - should be unique */
            windowName: string;

        }

        export interface DownloadSettings {
            /** If true will auto save the file (without asking the user where to save it). If false a system save dialog will appear. */
            autoSave?: boolean;

            /** If true will open the folder that contains the downloaded file after the download is completed */
            autoOpenPath?: boolean;

            /** If true will open the download file after the download is completed */
            autoOpenDownload?: boolean;

            /** If true enables windows to download files */
            enable?: boolean;

            /** If true a download bar tracking progress will appear on the bottom of the window when downloading. If false the download process will be invisible */
            enableDownloadBar?: boolean;
        }

        export interface ButtonInfo {
            /** Unique id for the button */
            buttonId: string;

            /** The position */
            order?: number;

            /** Tooltip */
            tooltip?: string;

            /** The image in base64 format */
            imageBase64: string;

        }

        export interface Bounds {
            top?: number;
            left?: number;
            width?: number;
            height?: number;
            [key: string]: number | undefined;
        }

        /**
         * Controls window loader settings.
         * Check https://docs.glue42.com/g4e/window-management/index.html#loader_overview
         */
        export interface Loader {
            enabled?: boolean;

            /** Use this in order to hide the loader once the page is loaded. Default is true. */
            loaderHideOnLoad?: boolean;

            /** Changes the loader animation speed. Default is 1 */
            loaderSpeed?: number;

            /** Changes the background of the loader page */
            loaderBackground?: string;

            /** Type of the loading animation. */
            loaderType?: string;

            /** Use this to set a specific size (in pixels) to the loader animation */
            loaderSize?: number;

            /** Use this to set a size to the loader animation as a factor of the window size */
            loaderSizeFactor?: number;

            /** Text that will show bellow the loader animation */
            loaderText?: string;

            /** Size of the loader text. Default is 12 */
            loaderTextSize?: number;

            /** Text color for the loader text */
            loaderTextColor?: string;

            /** If set will auto hide the loader after some period (in ms) */
            timeout?: number;
        }

        export interface DetachOptions {
            relativeTo?: GDWindow;
            relativeDirection?: RelativeDirection;
            width?: number;
            height?: number;
            bounds?: Bounds;
            hideTabHeader?: boolean;
        }

        export type RelativeDirection = "top" | "left" | "right" | "bottom";

        export type WindowMode = "html" | "flat" | "tab";

        export type WindowState = "normal" | "maximized" | "minimized";

        /**
         * Provides access to window groups.
         * @docmenuorder 3
         */
        export interface GroupsAPI {

            /** Returns current group of the window */
            my: Group;

            /** List all groups */
            list(success?: (groups: Group[]) => void): Group[];

            /** Finds a group by given window object or window id */
            findGroupByWindow(winId: string | GDWindow, success?: (group: Group) => void): Group;
        }

        /**
         * Using sticky windows the user can group windows together.
         * One or more windows stuck together form a group.
         *
         * @docmenuorder 4
         */
        export interface Group {

            /** The id of the current group */
            id: string;

            /** List all window in the group */
            windows: GDWindow[];

            /** Returns if the header of the group is visible or not */
            isHeaderVisible: boolean;

            /** Find window by id or window object */
            find(window: string | GDWindow, success?: (window: GDWindow) => void): GDWindow;

            /** Restore the group */
            restore(success?: (group: Group) => void, error?: (error: string) => void): void;

            /** Minimize the group */
            maximize(success?: (group: Group) => void, error?: (error: string) => void): void;

            /** Shows the header of the group */
            showHeader(success?: (group: Group) => void, error?: Glue42Core.AGM.InvokeErrorHandler): Promise<Group>;

            /** Hides the header of the group */
            hideHeader(success?: (group: Group) => void, error?: () => void): Promise<Group>;

            /** Will notify when the group's header visibility is changed */
            onHeaderVisibilityChanged(callback: (group: Group) => void): UnsubscribeFunction;

            /** Will notify when a new window is added in the group */
            onWindowAdded(callback: (group: Group) => void): UnsubscribeFunction;

            /** Will notify when a window is removed from the group */
            onWindowRemoved(callback: (group: Group) => void): UnsubscribeFunction;
        }

        /**
         * @docmenuorder 1
         */
        export interface API {

            /** Returns the API for manage the groups */
            groups: GroupsAPI;

            /** Returns current window */
            my(): GDWindow;

            /** Opens a new HC window */
            open(name: string, url: string, options?: WindowSettings, success?: (window: GDWindow) => void, error?: (error: object) => void): Promise<GDWindow>;

            /** Finds a window by name */
            find(name: string, success?: (window: GDWindow) => void, error?: (error: string) => void): GDWindow;

            /** Finds a window by id */
            findById(id: string, success?: (window: GDWindow) => void, error?: (error: string) => void): GDWindow;

            /** List all windows */
            list(success?: (windows: GDWindow[]) => void): GDWindow[];

            /** Will notify when a new window is opened. For backward compatibility you can also use windowAdded */
            onWindowAdded(callback: (window: GDWindow) => void): UnsubscribeFunction;
            windowAdded(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a window is closed. For backward compatibility you can also use windowRemoved */
            onWindowRemoved(callback: (window: GDWindow) => void): UnsubscribeFunction;
            windowRemoved(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a tab window is attached to another tab group.
             * This is a generic event handler that provides information for both the window being attached
             * and the group of tab windows that the tab is attached to.
             * There is also similar event handler per window - window.onTabAttached
             */
            onTabAttached(callback: (tabWindow: GDWindow, newTabGroupId: string, tabHeaderVisible: boolean) => void): Promise<void>;

            /**
             * Will notify you when a tab window is detached from another tab group.
             * This is a generic event handler that provides information for both the window being detached
             * and the group of tab windows that the tab is detaching from.
             * There is also similar event handler per window - window.onTabDetached
             */
            onTabDetached(callback: (window: GDWindow, tabGroupId: string, oldTabGroupId: string) => void): Promise<void>;

            /** Will notify when a window's frame color is changed */
            onWindowFrameColorChanged(callback: (window: GDWindow) => void): Promise<UnsubscribeFunction>;

            /** Will notify when a window receives focus */
            onWindowGotFocus(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a window loses focus */
            onWindowLostFocus(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Returns a promise that is resolved when library is ready. Wrap your code inside the resolve callback to avoid initialization issues on startup */
            ready(): Promise<any>;

            onEvent(callback: (stream: any) => void): UnsubscribeFunction;

        }

        /**
         * @docmenuorder 2
         */
        export interface GDWindow {
            windowType: "electron" | "remote";
            /** The name of the current window. Names are unique per Html Container */
            name: string;

            /** The AGM instance that the window runs in. */
            hostInstance: Glue42Core.AGM.Instance | string;

            agmInstance: {
                application: string,
            };

            /** The url of the current window. */
            url: string;

            /** The id of the current window. */
            id: string;

            /** The application associated with the current window (can be undefined if the window was not started as application) */
            application: AppManager.Application | undefined;

            /** The title of the current window. */
            title: string;

            /** The window styles of the current window. Absolute */
            windowStyleAttributes: WindowSettings;

            /** The settings of the current window. */
            settings: WindowSettings;

            /**
             * The tab group id of the current window. When several windows reside in a common tab container they
             * have the same tab group id.
             */
            tabGroupId: string;

            /** Returns all frame buttons */
            frameButtons: ButtonInfo[];

            /** Returns mode of the window - 'Html', 'Flat', 'Tab'  */
            mode: WindowMode;

            /** Returns the state of the window - 'Normal', 'Maximized' or 'Minimized' */
            state: WindowState;

            /** Returns true if the window is collapsed */
            isCollapsed: boolean;

            /** Returns true if the window is visible */
            isVisible: boolean;

            /** Returns true if the window is locked */
            isLocked: boolean;

            /** Returns if the window is focused or not */
            isFocused: boolean;

            /** Returns if the group header of window is visible or hidden */
            isGroupHeaderVisible: boolean;

            /** Returns the context of the window */
            context: any;

            /** Returns the bounds of the window */
            bounds: Bounds;

            /** Returns the color of the window's frame */
            frameColor: string;

            /** Returns if the window is open */
            opened: boolean;

            /** Returns the group of the window */
            group: Group;

            /** Returns the group id of the window */
            groupId: string;

            /** Returns top neighbours of the window */
            topNeighbours: GDWindow[];

            /** Returns left neighbours of the window */
            leftNeighbours: GDWindow[];

            /** Returns right neighbours of the window */
            rightNeighbours: GDWindow[];

            /** Returns bottom neighbours of the window */
            bottomNeighbours: GDWindow[];

            /** Returns the id of the activity the window participates in (undefined if the window is not part of an activity) */
            activityId: string;

            /** Returns the id of the window in terms of Activities API (undefined if the window is not part of an activity) */
            activityWindowId: string;

            /** Available only when window is in 'Tab' mode. Returns all tabs that are in the same tab group as the current window
             */
            tabs: GDWindow[];

            /** Returns if the tab header of window is visible or hidden */
            isTabHeaderVisible: boolean;

            /** Returns if the tab window is selected */
            isTabSelected: boolean;

            /** Attach tab window to current tab window */
            attachTab(tab: GDWindow | string, index: number, success?: () => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Detach the window from current tab window */
            detachTab(opt: DetachOptions, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Maximize a window */
            maximize(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Restore a window */
            restore(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Minimize a window */
            minimize(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Maximize or restore the current window */
            maximizeRestore(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Collapse a window */
            collapse(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Expand a window */
            expand(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Toggle will collapse or expand the current window based on its current state(collapse if expanded, expand if collapsed) */
            toggleCollapse(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Focus the current window */
            focus(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Active the current window */
            activate(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /**  Move and/or resize the window */
            moveResize(dimension: Bounds, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Set title of the current window */
            setTitle(title: string, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Set window style to the current window */
            setStyle(styles: WindowSettings, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Navigate the window to a new URL */
            navigate(url: string, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Add a frame button to the window */
            addFrameButton(buttonInfo: ButtonInfo, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Remove a frame button from the window */
            removeFrameButton(buttonId: string, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Hiding or showing the current window */
            setVisible(toBeVisible?: boolean, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Close the window */
            close(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Snap the  window to another window */
            snap(target: string | GDWindow, direction?: RelativeDirection, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Show loader animation for the window or update its properties (like animation type, background or text) */
            showLoader(options?: Loader): Promise<GDWindow>;

            /** Hide loader animation for the window */
            hideLoader(): Promise<GDWindow>;

            /** Update window context */
            updateContext(context: any, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Lock the window - when in locked state moving the window will result in moving the whole group */
            lock(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Unlock window - when in unlocked state moving the window will result in tearing it out from the group of windows (if it is part of any) */
            unlock(success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Get icon for the window */
            getIcon(success?: (icon: string) => void, error?: Glue42Core.AGM.InvokeErrorHandler): Promise<string>

            /** Set icon for the window */
            setIcon(base64Image: string, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Set frame color for the window */
            setFrameColor(frameColor: string, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Hiding or showing the tab header of the current window */
            setTabHeaderVisible(toBeVisible?: boolean, success?: (window: GDWindow) => void, error?: (error: string) => void): Promise<GDWindow>;

            /** Will notify when a tab is attached to current window */
            onWindowAttached(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a tab is detached to current window */
            onWindowDetached(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's tab header is hidden or shown */
            onTabHeaderVisibilityChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is closed */
            onClose(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's is changed */
            onUrlChanged(callback: (url: string, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the title of the window is changed */
            onTitleChanged(callback: (title: string, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a frame button is added */
            onFrameButtonAdded(callback: (buttonInfo: ButtonInfo, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a frame button is removed */
            onFrameButtonRemoved(callback: (buttonInfo: ButtonInfo, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when a frame button is clicked */
            onFrameButtonClicked(callback: (buttonInfo: ButtonInfo, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is collapsed */
            onCollapsed(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is expanded */
            onExpanded(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is minimized */
            onMinimized(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is maximized */
            onMaximized(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is restored from minimized/maximized state to normal state */
            onNormal(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the current window is attached */
            onAttached(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the current window is detached */
            onDetached(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is hidden or shown */
            onVisibilityChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's context is updated */
            onContextUpdated(callback: (context: any, window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window is locked or unlocked */
            onLockingChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's location is changed */
            onBoundsChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's frame color is changed */
            onFrameColorChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's focus is changed */
            onFocusChanged(callback: (window: GDWindow) => void): UnsubscribeFunction;

            /** Will notify when the window's group is changed */
            onGroupChanged(callback: (window: GDWindow, newGroup: Group, oldGroup: Group) => void): UnsubscribeFunction;

            /** Will notify when a active tab is changed */
            onTabSelectionChanged(callback: (selectedWindow: GDWindow, previousWindow: GDWindow, window: GDWindow) => void): UnsubscribeFunction;
        }



    }

    /**
     * @docmenuorder 7
     * @intro
     *
     *
     *
     * ## See also
     * - [Channels Documentation](../../../../channels/)
     */
    namespace Channels {
        export interface API {
            /**
             * Track the data in the current channel
             */
            subscribe(callback: (data: any, context: ChannelContext) => () => void): () => void;

            /**
             * Update the context of a channel
             * Throws if your application is not on a channel
             */
            publish(data: any): Promise<void>;

            // advanced 1 (list, join, leave) - use-cases:
            // * draw my own selector in my application or join leave channels based on some other condition
            // * participate if not in SW

            /** @ignore */
            all(): Promise<string[]>;

            /** @ignore */
            join(id: string): Promise<void>;

            /** @ignore */
            leave(): Promise<void>;

            /** Returns the name of the channel that your application is currently on */
            current(): string;

            /** Subscribe for channel changed events  */
            changed(callback: (channel: string) => () => void): void;

            // advanced 2 - manage channels at runtime - use-cases:
            // * give the user of the system the ability to define/update channels from some UI
            // meta(id: string, meta: object): Promise<void>; // updates the meta of some context

            /** @ignore */
            add(info: ChannelContext): Promise<ChannelContext>;
            // remove(id: string): void; // ???
            // onChannelAdded(cb: () => void): void;
            // onChannelRemoved(cb: () => void): void;

            // advanced 3 - discover peers that are on the same channel:
            // * some apps might be interested who else is on their channel
            // * there might be some UI logic that for example groups all windows that are on the blue channel
            // apps(channelId?: string): Promise<any[]>;
        }

        export interface ChannelContext {
            /** unique id of the context */
            name: string;
            /** things like displayName, color, image, etc.. */
            meta: any;
            /** the actual data */
            data: any;
        }
    }

    /**
     * @docmenuorder 8
     * @intro
     */
    namespace Hotkeys {
        interface HotkeyInfo {
            hotkey: string;
            description?: string;
        }

        interface HotkeyCallback {
            (): void;
        }

        interface API {
            /**
             * Registers a global shortcut of accelerator.
             * Note that your application can register the same accelerator just once.
             * 
             * @param hotkey 
             * @param callback the
             */
            register(hotkey: string | HotkeyInfo, callback: HotkeyCallback): Promise<void>;
            
            /**
             * Unregister a hotkey - your application will no longer receive notifications for that key
             * @param hotkey 
             */
            unregister(hotkey: string): Promise<void>;

            /**
             * Unregister all hotkeys registered by your application
             */
            unregisterAll(): Promise<void>;

            /**
             * Returns true if this application has registered an accelerator
             * @param hotkey 
             */
            isRegistered(hotkey: string): void;
        }
    }
}

declare module 'glue42' {
    export = Glue42;
}

interface NodeRequireFunction {
    (moduleName: 'glue42'): typeof Glue42;
}
