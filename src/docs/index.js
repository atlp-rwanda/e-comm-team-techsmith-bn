import servers from './servers.js';
import tags from './tags.js';
import paths from './paths.js';
import components from './components.js';

const options = {
  definition: {
    openapi: '3.0.3', // Present supported openapi version
    info: {
      title: 'Techsmiths E-Commerce', // Title (required)
      description: 'Docs for Techsmiths E-Commerce', // Description (required)
      version: '1.0.0', // Version (required)
      contact: {
        name: 'Techsmiths', // Name of the author
        email: '', // Email of the author
        url: '', // Website of the author
      },
    },
    servers, // Servers imported from src/docs/servers.js
    tags, // Tags imported from src/docs/tags.js
    components, // Components imported from src/docs/components.js,
    paths
  },
  apis: ['../routes/*.js', '../docs/**/*.js'], // Path to the API docs
};

export default options;
