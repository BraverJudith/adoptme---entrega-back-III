import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'AdoptMe API',
        version: '1.0.0',
        description: 'API para la gestión de usuarios y mascotas en AdoptMe',
        },
        servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor local',
        },
        ],
    },
    apis: ['./src/routes/*.js'], 
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);


    export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    };
