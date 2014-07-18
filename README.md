# grunt-process-tags

> Task to process HTML tags.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-process-tags --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-process-tags');
```

## The "processTags" task

### Overview
In your project's Gruntfile, add a section named `processTags` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  processTags: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.processors
Type: `Object`
Default value: `{}`

An object with keys as a functions. Provided functions can be used to process tags.

#### options.patterns
Type: `Array`
Default value: `[]`

An array containing RegExp patters to match content. Pattern must contain 1st subgroup.

### Usage Examples

#### Default Options
In this example, the default options are used. 

```js
grunt.initConfig({
  processTags: {
    options: {},
    files: {
      'dest/index.html': 'src/index.html',
    },
  },
})
```

```html
<!-- process-tags prefix('first/') -->
<script src="should/be/prefixed/by/first"></script>
<!-- end-process-tags -->
```

#### Custom Options
In this example, custom options are used.

```js
grunt.initConfig({
  processTags: {
    options: {
      processors: {
        asFn: function (content) {
          return content;
        },
        asFactoryFn: function (parameter) {
          return function (content) {
            return parameter;
          }
        }
      }
    },
    files: {
      'dest/index.html': 'src/index.html',
    },
  },
})
```

```html
<!-- process-tags asFn -->
<script src="should/be/left/as/it/is"></script>
<!-- end-process-tags -->

<!-- process-tags asFactoryFn('result/content') -->
<script src="should/be/replaced/by/result/content"></script>
<!-- end-process-tags -->
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Wix.com. Licensed under the MIT license.
