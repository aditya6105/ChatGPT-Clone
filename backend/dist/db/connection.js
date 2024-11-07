import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
<<<<<<< HEAD
        throw new Error("Could not Connect To MongoDB");
=======
        throw new Error("Cannot Connect To MongoDB");
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
<<<<<<< HEAD
        throw new Error("Could not Disconnect From MongoDB");
=======
        throw new Error("Cannot Connect To MongoDB");
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map