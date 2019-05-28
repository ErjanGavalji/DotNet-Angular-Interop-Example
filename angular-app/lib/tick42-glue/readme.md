# Tick42 glue.js

## Info
glue.js is a JavaScript library that enables applications to use different glue APIs like:
* agm
* activities
* app-manager
* contexts
* layouts
* metrics

 glue.js should be used in applications running in Glue Desktop environment. Apps not running in GD can choose between [glue-core](https://stash.tick42.com/projects/TG/repos/js-glue-core/browse) or [glue4office](https://stash.tick42.com/projects/TG/repos/js-glue4office/browse) libs, which offer just a subset of the available APIs (by thus reducing the size of the final package).

## How to build

**_All examples assume the following project structure:_**

<pre><code>/projects
|-- glue
|-- |--node_modules
|-- node_modules (Created by npm scripts. No need to have this one. Added )
</code></pre>


### Useful npm scripts:
- `npm run init:dev` (Run after `npm install`) This command does several things:
    - Removes all `tick42-*` dependencies from `projects/glue/node_modules`
    - Creates new `node_modules` directory in the parent directory (`projects/node_modules`)
    - Clones all `tick42-*` dependencies from stash in the new `node_modules` and builds them
    Now the tick42 modules inside `projects/node_modules` are used as sources for **tick42-glue**.
    *NOTE: The command requires ssh access to the repository.*

- `npm run watch:dev`
    - Removes all `tick42-*` dependencies from `projects/glue/node_modules` (if any)
    - Starts `npm run watch` process
    Use in cases where you already have the correct project setup and don't want to clone and rebuild everything.

- `npm run watch:prod`
    - runs `npm install`
    - Starts `npm run watch` process
    This command reinstalls the missing tick42 modules inside `projects/glue/node_modules`.
    Now the tick42 modules inside  `projects/glue/node_modules` are used as sources for **tick42-glue**
    *NOTE: This command doesn't remove the content of `projects/node_modules`*
- `npm run watch`
    Watches for file changes in glue modules and triggers build on every file change.
    *NOTE: Triggers only dev build (unversioned and unminified) for better performance during dev.*
- `npm run clear:dev` - Removes the modules that were added to `projects/node_modules` by running `npm run init:dev`


### Typical dev workflow example:

1. `git clone ssh://git@stash.tick42.com:7999/tg/js-glue.git glue`
2. `cd glue`
3. `npm install`
4. `npm run init:dev` - The project now uses modules inside `projects/node_modules`.
5. `npm run watch:dev` - Start making changes to modules in `projects/node_modules` and see your changes in version `projects/glue/target`.
6. When you're happy with the result commit your changes to all modules that were modified (`projects/node_modules/*`) and publish new versions.
7. Go back to glue (`projects/glue`) and run `npm install` to install updated versions of tick42 modules that we previously deleted with `npm run init:dev`.
  The project now uses modules inside `projects/glue/node_modules`. Publish a new version.
  *NOTE: prepublish hook runs `npm run build:prod`*

8. Forgot a change and have to go back to dev mode again? It's easy. We already downloaded all modules the first time we ran `npm run init:dev`, no need to do it again.
9. Simply switch to dev mode  with `npm run watch:dev`. The project now uses modules inside `projects/node_modules` .
10. Repeat 1-8
