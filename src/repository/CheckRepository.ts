import { initializeApp } from "firebase/app";
import { doc, DocumentData, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { config } from "../util/config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectID,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderID,
  appId: config.appID
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);

interface Check extends DocumentData {
  users: { 
    id: string,
    name: string 
  }[];
}

export class CheckRepository {
  

  checkKey = "check";

  async getCheck(dateId: string): Promise<Check> {
    const docRef = doc(firestore, this.checkKey, dateId);
    const snapshot = await getDoc(docRef);
    return (await snapshot.data() as Check);
  }

  async createCheck(date: string) {
    await setDoc(doc(firestore, this.checkKey, date), {
        users: [
            { 
                id: null,
                name: null 
            }
        ]
    });
  }

  async addUser(userId: string, displayName: string, dateId: string){
    const data = await this.getCheck(dateId)

    if(data.users.some(user => user.id === userId)) return
    
    data.users.push({ 
        id: userId,
        name: displayName
    })

    await updateDoc(doc(firestore, this.checkKey, dateId), data)
  }
}

export const checkRepository: CheckRepository = new CheckRepository()