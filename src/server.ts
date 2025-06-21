import { config } from './config';
import mongoose from 'mongoose';
import app from './app';




async function server(){
    const port = config.port;

    try{
        await mongoose.connect(config.databaseUrl!);
        console.log('✅ Connected to MongoDB');

        app.listen(port, () => {
            console.log(`✅ Server is running on http://localhost:${port}`);
        });
    }catch(error){
        console.error("❌An error occurred:", error);
    }
}

server();