module.exports = {
  'secret':'RESTFULAPIs',
  'mongoUri': 'mongodb://localhost:27017/test'
};

const config = {
    // .. rest of config object

    // Server Configuration options
    devServer: {
        // .. rest of devserver options

        host: '0.0.0.0',
        disableHostCheck: true
    },

    // .. rest of config object
};