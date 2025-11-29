const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Soccer League Management API',
    description: 'API for players and matches with discipline rules. Protected routes require Google OAuth authentication.'
  },
  host: process.env.SWAGGER_HOST || 'localhost:8080',
  schemes: ['http', 'https'],
  definitions: {
    Player: {
      name: 'Alex Abebe',
      team: 'Team A',
      position: 'Forward',
      age: 25,
      nationality: 'Ethiopia',
      yellowCards: 0,
      redCards: 0,
      suspended: false
    },
    Match: {
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      homeScore: 2,
      awayScore: 1,
      matchDate: '2025-11-10T14:30:00.000Z',
      playersWithYellowCards: [],
      playersWithRedCards: []
    },
    Team: {
      name: 'St. George',
      city: 'Addis Ababa',
      wins: 0,
      draws: 0,
      losses: 0,
      yellowCards: 0,
      redCards: 0
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json generated');
});
