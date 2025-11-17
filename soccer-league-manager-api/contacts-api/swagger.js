// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API for CSE341'
  },
  host: process.env.SWAGGER_HOST || 'localhost:8080', // will be set by Render
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'Contact management operations'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // include main server file to detect route mounting

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json generated');
});