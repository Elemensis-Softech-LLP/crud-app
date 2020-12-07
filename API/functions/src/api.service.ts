import * as admin from 'firebase-admin';
import { IUser } from './IUser';


var serviceAccount = require("../test-crud.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';

//get all users
export async function getAllUsers(req: any, res: any) {
  try {
      const userQuerySnapshot = await db.collection(userCollection).get();
      const users: any[] = [];
      userQuerySnapshot.forEach(
          (doc: any)=>{
              users.push({
                  id: doc.id,
                  data:doc.data()
          });
          }
      );
      res.status(200).json(users);
  } catch (error) {
      res.status(500).send(error);
  }
};

//Create new user
export async function createUser(req: any, res: any) {
  try {
      const user: IUser = {
          firstName: req.body['firstName'],
          lastName: req.body['lastName'],
          email: req.body['email'],
          id: Date.now(),
          contactNumber:req.body['contactNumber']
      }

      const newDoc = await db.collection(userCollection).add(user);
      res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
      res.status(400).send(`User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
  }
};

//get a single contact
export async function getUserById(req: any, res: any) {
  const userId = req.params.userId; 
  db.collection(userCollection).doc(userId).get()
  .then((user: any) => {
      if(!user.exists) throw new Error('User not found');
      res.status(200).json({id:user.id, data:user.data()})})
  .catch(error => res.status(500).send(error));
      
};

// Delete a user
export async function deleteUser(req: any, res: any) {
  db.collection(userCollection).doc(req.params.userId).delete()
  .then(()=>res.status(204).send("Document successfully deleted!"))
  .catch(function (error: any) {
          res.status(500).send(error);
  });
};

// Update user
export async function updateUser(req: any, res: any) {
  await db.collection(userCollection).doc(req.params.userId).set(req.body,{merge:true})
  .then(()=> res.json({id:req.params.userId}))
  .catch((error: any)=> res.status(500).send(error))
};
