import { connectDb } from './src/data-source';
import { app } from './src/app';


const PORT = process.env.PORT || 3000;
connectDb();

app.listen(PORT, () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  console.log(`[Express Server ⚡] running on port ${PORT}.`);
  console.log('[Firebase Storage ⚡] connected.');
});
