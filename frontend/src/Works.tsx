import { useEffect, useState } from 'react'
import './App.css'
import { FirebaseStorage, StorageReference, UploadResult, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import firebaseApp from './firebase/app'
import  { saveAs } from 'file-saver'

function App() {
  const [value, setValue]: any  = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState("")
  const [blob, setBlob]: any = useState(null)
  // const downloadUrl: string = "https://firebasestorage.googleapis.com/v0/b/bookshore-d046a.appspot.com/o/images%2Fastronaut.jpg?alt=media&token=9b0ad37d-b40f-4cb7-b0be-f554d1a1b84c"

  const handleChange = (event: any) => {
    // event.preventDefault()
    console.log(event.target.files[0])
    setValue(event.target.files[0])
  }

  const handleClick = (url: string, filename: string) => {
    saveAs(url, filename)
  }
  const handleClick1 = (fileBlob: any, filename: string) => {
    // saveAs(url, filename)
    let a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    let fileDownloadUrl = window.URL.createObjectURL(fileBlob);
    console.log("🚀 ~ uploadFile ~ fileDownloadUrl:", fileDownloadUrl)
    a.href = fileDownloadUrl;
    a.download = "image.jpg";
    a.click();
    // setUploaded(true)
    // setDownloadUrl
    window.URL.revokeObjectURL(fileDownloadUrl);

  }

  const uploadFile = async (): Promise<void> => {
    const storage: FirebaseStorage = getStorage(firebaseApp)
    const storageRef: StorageReference = ref(storage, "pdf/" + value.name)
    let res: UploadResult = await uploadBytes(storageRef, value)
    console.log("🚀 ~ uploadFile ~ res:", res)
    const url = await getDownloadURL(res.ref)
    console.log("🚀 ~ uploadFile ~ url:", url)
    const fileBlob = await getBlob(res.ref)
    setBlob(fileBlob)
    console.log("🚀 ~ uploadFile ~ fileBlob:", fileBlob)
    let a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    let fileDownloadUrl = window.URL.createObjectURL(fileBlob);
    console.log("🚀 ~ uploadFile ~ fileDownloadUrl:", fileDownloadUrl)
    a.href = fileDownloadUrl;
    a.download = "book.pdf";
    a.click();
    setUploaded(true)
    setDownloadUrl(fileDownloadUrl)
    window.URL.revokeObjectURL(url);
  }

  

  useEffect(()=>{
    console.log("value updated")
    if(!uploaded && value) {
      uploadFile()
    }
    if (downloadUrl) {
      console.log("download url for button1 is set")
    }
    if (blob) {
      console.log("file blob is set for button2")
    }
  }, [value, downloadUrl, blob])

  return (
    <>
    <h1 style={{color:'red'}}>
    {value ? value.name : "null"}
    </h1>
      <input type="file" name="pdf" id="pdf" onChange={handleChange} />
        <button onClick={()=>{
          handleClick(downloadUrl, "book1.pdf")
        }}>
        Download with url 
        </button>
        <button onClick={()=>{
          handleClick1(blob, "book2.pdf")
        }}>
        Download with blob 
        </button>
   
    </>
  )
}

export default App
