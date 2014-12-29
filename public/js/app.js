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
       "magnific-popup": "vendor/magnific-popup/jquery.magnific-popup",
       "picker": "vendor/pickadate/picker",
       "pickadate": "vendor/pickadate/picker.date",
       "pickatime": "vendor/pickadate/picker.time",
       "pickalegacy": "vendor/pickadate/legacy",
       "jquery-ui-custom": "vendor/fullcalendar/lib/jquery-ui.custom.min",
       "fullcalendar": "vendor/fullcalendar/fullcalendar.min",
      },
      shim:    {
        'react-router-shim': {
          exports: 'React'
        },
        'react-router': ['react-router-shim']
      },
      jsx: {
        fileExtension: '.jsx'
       }
      });

require(['jsx!react_components/router']);