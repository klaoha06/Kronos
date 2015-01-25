require.config({
     baseUrl: "js/",
     paths: {
       "react": "vendor/react-with-addons",
       "JSXTransformer": "vendor/JSXTransformer",
       "jquery": "vendor/jquery.min",
       "text": "vendor/text",
       "jsx": "vendor/jsx",
       "react-router": "vendor/react-router",
       "react-router-shim": "vendor/react-router-shim",
       "flux": "vendor/flux",
       "event-emitter": "vendor/eventemitter",
       "jquery-cookie": "vendor/jquery.cookie",
       "moment": "vendor/moment.min",
       "moment-twitter": "vendor/moment-twitter",
       "picker": "vendor/pickadate/picker",
       "pickadate": "vendor/pickadate/picker.date",
       "pickatime": "vendor/pickadate/picker.time",
       "pickalegacy": "vendor/pickadate/legacy",
       "jquery-ui-custom": "vendor/fullcalendar/lib/jquery-ui.custom.min",
       "fullcalendar": "vendor/fullcalendar/fullcalendar",
       "magnific-popup": "vendor/magnific-popup/jquery.magnific-popup"
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
