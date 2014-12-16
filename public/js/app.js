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
       "jquery-cookie": "vendor/jquery.cookie"
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