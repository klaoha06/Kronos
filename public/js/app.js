require.config({
     baseUrl: "js/",
     config:{
      'serverUrl': '/api/v0/'
     },
     paths: {
       "react": "vendor/react-with-addons",
       "JSXTransformer": "vendor/JSXTransformer",
       "jquery": "vendor/jquery.min",
       "text": "vendor/text",
       "jsx": "vendor/jsx",
       "bluebird": "vendor/bluebird",
       "react-router": "vendor/react-router",
       "react-router-shim": "vendor/react-router-shim",
       "flux": "vendor/flux",
       "event-emitter": "vendor/eventemitter",
       "jquery-cookie": "vendor/jquery.cookie",
       "moment": "vendor/moment.min",
       "picker": "vendor/pickadate/picker",
       "pickadate": "vendor/pickadate/picker.date",
       "pickatime": "vendor/pickadate/picker.time",
       "pickalegacy": "vendor/pickadate/legacy"
      },
      // bundles: {
      //   'datepicker': ['picker', 'pickadate', 'pickalegacy'],
      //   'timepicker': ['picker', 'pickatime', 'pickalegacy']
      // },
      shim:    {
        'react-router-shim': {
          exports: 'React'
        },
       // 'pickadate':{
       //  deps:['picker', 'pickadate', 'pickalegacy'],
       //  exports: 'Pickadate'
       // },
       // 'pickatime':{
       //  deps:['picker', 'pickatime', 'pickalegacy'],
       //  exports: 'Pickatime'
       // },
        'react-router': ['react-router-shim']
      },
      jsx: {
        fileExtension: '.jsx'
       }
      });

require(['jsx!react_components/router']);