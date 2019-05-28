GLUE42 is a real-time user experience (UX) integration product. UX integration is the process by which different applications are combined together at the user interface level to provide a better end user experience. UX integration makes it easier for users to access the data they need by reducing the need to switch between applications. GLUE 42 allows developers to connect web or desktop applications and have them interact with each other in real time.

GLUE for JavaScript enables JavasScript applications to participate in GLUE 42 by using a set of APIs.

## Referencing
GLUE is a library available both as a single JavaScript file which you can include into your web applications using a `<script>` tag, and as a node.js module.

Because GLUE for JavaScript evolves, we’ve chosen the following the sematic version model:

_BreakingChangesVersion_._FeatureVersion_._FixVersion_

You can use GLUE in a `script` tag include, e.g.:

```html
<script type="text/javascript" src="tick42-glue-3.6.5.js"></script>
```

...or as a node.js module.

When deploying your application in production, we recommend that you always reference a specific **minified** version, e.g.:

```html
<script type="text/javascript" src="tick42-glue-2.16.0-min.js"></script>
```

## Initialization

When included glue.js v3 will register a global factory function called __Glue__ . This should be invoked with an optional configuration object to init the library. The factory function returns a Promise object.

Example

```javascript
  Glue()
    .then((glue) => {
      window.glue = glue;
      glue.agm.register({name: 'displayValue', accepts: "String value"}, displayValue);
    })
    .catch(function (err) {
      console.log(err);
    });
```
