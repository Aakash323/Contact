import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlware";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/contact.entity";
import { User } from "../entity/user.entity";
import { Not } from "typeorm";


export const addContact = async (req: AuthRequest, res: Response) => {
  try {

    const userId = req.userId;
    if (!userId) {
      return res.json({ message: "Unauthorized. User ID not found." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    const {
      username,
      user_email,
      user_phone,
      property_type,
      properties,
      company,
    } = req.body;

    if (
      !username ||
      !user_email ||
      !user_phone ||
      !property_type ||
      !properties ||
      !company
    ) {
      return res.json({ message: "please fill all fields" });
    }

    const existingContact = await contactRepo.findOne({
      where: { user_email, user: { id: userId } },
    });

    if (existingContact) {
      return res.json({ message: " Email already exists." });
    }

     const user_photo = req.file ? `${req.file.filename}` : undefined;

    const contact = contactRepo.create({
      username,
      user_photo,
      user_email,
      user_phone,
      property_type,
      properties,
      company,
      user,
    });

    await contactRepo.save(contact);

    return res.json({ message: "Contact created successfully.", contact });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Failed to create contact." });
  }
};

export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ message: "Unauthorized. User ID not found." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);

    const contacts = await contactRepo.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    return res.json({ contacts });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Failed to fetch contacts." });
  }
};

export const getContactById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const contactId = parseInt(req.params.id!);
    if (!userId) {
      return res.json({ message: "Unauthorized. User ID not found." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);

    const contact = await contactRepo.findOne({
      where: { id: contactId, user: { id: userId } },
      relations: ["user"],
    });

    if (!contact) {
      return res.json({ message: "Contact not found." });
    }

    return res.json({ contact });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Failed to fetch contact." });
  }
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const contactId = parseInt(req.params.id!);
    if (!userId) {
      return res.json({ message: "Unauthorized. User ID not found." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);

    const contact = await contactRepo.findOne({
      where: { id: contactId, user: { id: userId } },
    });

    if (!contact) {
      return res.json({ message: "Contact not found." });
    }

      const user_photo = req.file ? `${req.file.filename}` : contact.user_photo;
    const {
      username,
      user_email,
      user_phone,
      property_type,
      properties,
      company,
    } = req.body;

    if (
      !username ||
      !user_email ||
      !user_phone ||
      !property_type ||
      !properties
    ) {
      return res.json({ message: "Missing required fields." });
    }

    const existingContact = await contactRepo.findOne({
      where: { user_email, user: { id: userId }, id: Not(contactId) },
    });
    if (existingContact && existingContact.id !== contactId) {
      return res.json({message:'Email already exists'});
}

    contactRepo.merge(contact, {
      username,
      user_photo,
      user_email,
      user_phone,
      property_type,
      properties,
      company,
    });

    await contactRepo.save(contact);

    return res.json({ message: "Contact updated successfully.", contact });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Failed to update contact." });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const contactId = parseInt(req.params.id!);
    if (!userId) {
      return res.json({ message: "Unauthorized. User ID not found." });
    }

    const contactRepo = AppDataSource.getRepository(Contact);

    const contact = await contactRepo.findOne({
      where: { id: contactId, user: { id: userId } },
    });

    if (!contact) {
      return res.json({ message: "Contact not found." });
    }

    await contactRepo.remove(contact);

    return res.json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Failed to delete contact." });
  }
};
