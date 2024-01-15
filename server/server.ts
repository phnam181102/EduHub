import { app } from './app';
import connectDB from './utils/db';
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
    connectDB();
});
