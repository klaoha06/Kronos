require.config({
     baseUrl: "js/",

     paths: {
       "react": "vendor/react-with-addons",
       "JSXTransformer": "vendor/JSXTransformer",
       "text": "vendor/text",
       "jsx": "vendor/jsx"
     },

     jsx: {
        fileExtension: '.jsx'
      }
   });

require(['jsx!react_components/main']);