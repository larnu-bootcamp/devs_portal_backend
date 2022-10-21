import { app } from './src/app';


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  console.log(`[Server ⚡] running on port ${PORT}.`);
});
