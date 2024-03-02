import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, StorageReference, UploadResult, getDownloadURL, getStorage, ref, uploadBytes, getBlob } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_APP_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export const uploadPdf = async (pdfName: string, pdfFile: File) => {
  const storage: FirebaseStorage = getStorage(app)
  const storagePath: string = "pdf/" + pdfName
  const storageRef: StorageReference = ref(storage, storagePath)
  let res: UploadResult = await uploadBytes(storageRef, pdfFile)
  console.log("🚀 ~ uploadFile ~ res:", res)
  const url = await getDownloadURL(res.ref)
  console.log("🚀 ~ uploadFile ~ url:", url)
  return {
    bookLink: url,
    bookPath: storagePath,
    response: res
  }
}

export const downloadPdf = async (pdfPath: string) => {
  const storage: FirebaseStorage = getStorage(app)
  const pdfRef: StorageReference = ref(storage, pdfPath);
  const fileBlob = await getBlob(pdfRef)
  console.log("🚀 ~ uploadFile ~ fileBlob:", fileBlob)
  let a = document.createElement("a");
  document.body.appendChild(a);
  // a.style = "display: none";
  let fileDownloadUrl = window.URL.createObjectURL(fileBlob);
  console.log("🚀 ~ uploadFile ~ fileDownloadUrl:", fileDownloadUrl)
  a.href = fileDownloadUrl;
  a.download = "book.pdf";
  a.click();
  window.URL.revokeObjectURL(fileDownloadUrl);
}

export const uploadPreviewImage = async (previewImageName: string, previewImageFile: File) => {
  const storage: FirebaseStorage = getStorage(app)
  const storagePath: string = "preview/" + previewImageName
  const storageRef: StorageReference = ref(storage, storagePath)
  let res: UploadResult = await uploadBytes(storageRef, previewImageFile)
  console.log("🚀 ~ uploadFile ~ res:", res)
  const url = await getDownloadURL(res.ref)
  console.log("🚀 ~ uploadFile ~ url:", url)
  return {
    previewImageLink: url,
    previewImagePath: storagePath,
    response: res
  }
}

export default app;