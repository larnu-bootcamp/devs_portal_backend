import { app } from './src/app';
import { defaultErrorHandler } from './src/middlewares/defaultErrorHandler';


const PORT = process.env.PORT || 3000;

// 1. connecting DB

// 2. mounting routers
app.use('/api/v1/ping', async (req, res, next) => {
  try {
    res.status(200).json({
      message: 'pong'
    });
  } catch (error) {
    next(error);
  }
});

app.use('/api/v1/', defaultErrorHandler);

// 3. starting the server
app.listen(PORT, () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
