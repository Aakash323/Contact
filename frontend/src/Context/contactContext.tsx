import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export interface Contact{
   id: number;
  username: string;
  user_email: string;
  user_phone: string;
  property_type: string;
  properties: string;
  company: string;
  user_photo?: string;
}


interface contactContextType {
  contacts: Contact[] | [];
  loading: boolean;
  addContact:(data:FormData)=>Promise<void>;
  updateContact:(id:number,data:FormData)=>Promise<void>;
  deleteContact:(id:number)=>Promise<void>;
  fetchContactsByID:(id:number)=>Promise<Contact | null>;
}

interface ContactProviderProps {
  children: ReactNode;
}

const contactContext = createContext<contactContextType>({
  contacts:[],
  loading: true,
  addContact:async()=>{},
  updateContact:async()=>{},
  deleteContact:async()=>{},
  fetchContactsByID:async()=>null,
});

export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/contact/get",{
          headers:{Authorization:`Bearer ${token}`},
        });
        console.log(res.data);

        setContacts(res.data.contacts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    
    const fetchContactsByID = async (id:number) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/contact/get/${id}`,{
          headers:{Authorization:`Bearer ${token}`}
        });
        console.log(res.data);
        return res.data.contact
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchContacts();
    },[]);

  const addContact= async (data:FormData)=>{
    try{
      await axios.post("http://localhost:3000/api/contact/add",data,{
        headers:{Authorization:`Bearer ${token}`},
      });
      fetchContacts();
    }
    catch(err){
      console.error(err);
    }
  }

  const updateContact = async (id:number,data:FormData)=>{
    try {
      await axios.patch(`http://localhost:3000/api/contact/update/${id}`,data,{
        headers:{Authorization:`Bearer ${token}`},
      })
      fetchContacts();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteContact = async (id:number)=>{
    try {
      await axios.delete(`http://localhost:3000/api/contact/delete/${id}`,{
        headers:{Authorization:`Bearer ${token}`},
      });
      fetchContacts();
    } catch (error) {
      console.error(error);
      
    }
  }



  return (
    <contactContext.Provider value={{ contacts, loading,addContact,fetchContactsByID,updateContact,deleteContact }}>
      {children}
    </contactContext.Provider>
  );
};

export const useData = () => useContext(contactContext);
