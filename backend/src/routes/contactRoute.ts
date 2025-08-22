import express from "express"
import { verifyUser } from "../middlewares/auth.middlware";
import { addContact, deleteContact, getContactById, getContacts, updateContact } from "../controllers/contactController";
import { upload } from "../middlewares/multer.middleware";

export const contactRouter = express.Router();

contactRouter.post('/add',verifyUser,upload.single("user_photo"),addContact)
contactRouter.get('/get',verifyUser,getContacts)
contactRouter.get('/get/:id',verifyUser,getContactById)
contactRouter.patch('/update/:id',verifyUser,upload.single("user_photo"),updateContact)
contactRouter.delete('/delete/:id',verifyUser,deleteContact)