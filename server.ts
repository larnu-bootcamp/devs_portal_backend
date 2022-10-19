import { app } from './src/app';
import { defaultErrorHandler } from './src/middlewares/defaultErrorHandler';


const PORT = process.env.PORT || 3000;

// connecting DB
// mounting routers

app.use('/api/v1/', defaultErrorHandler);

app.listen(PORT, () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
