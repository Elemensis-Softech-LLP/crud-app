import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import * as Api from './api.service';

//initialize express server
const app = express();

//initialize express server
// const AppRouter = express.Router({mergeParams: true});

app.use(cors({ origin: true }));

app.get('/users',Api.getAllUsers);
app.post('/users',Api.createUser);
app.get('/users/:userId',Api.getUserById);
app.delete('/users/:userId',Api.deleteUser);
app.put('/users/:userId',Api.updateUser);

// //add the path to receive request and set json as bodyParser to process the body 
// app.use('/api/v1', AppRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

app.get('/hello-world', (req: any, res: any) => {
  return res.status(200).send('Hello World!');
});



exports.app = functions.https.onRequest(app);