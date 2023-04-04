import express from 'express';

const router = express.Router();

// welcome route

router.get('/', (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Welcome to TechSmiths</title>
      <style>
        /* Styling */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        h1 {
          font-size: 36px;
          text-align: center;
          margin-block-start: 100px;
          margin-block-end: 50px;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to TechSmiths</h1>
    </body>
  </html>
`);
});

export default router;
