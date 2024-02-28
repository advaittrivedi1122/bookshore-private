import { useEffect, useState } from 'react'
import './App.css'
import { FirebaseStorage, StorageReference, UploadResult, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import firebaseApp from './firebase/app'
import  { saveAs } from 'file-saver'

function App() {
  const [value, setValue]: any  = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const downloadUrl: string = "https://firebasestorage.googleapis.com/v0/b/bookshore-d046a.appspot.com/o/images%2Fastronaut.jpg?alt=media&token=9b0ad37d-b40f-4cb7-b0be-f554d1a1b84c"

  const handleChange = (event: any) => {
    // event.preventDefault()
    console.log(event.target.files[0])
    setValue(event.target.files[0])
  }

  const handleClick = (url: string, filename: string) => {
    saveAs(url, filename)
    // fetch(url, {
    //   method : "GET",
    //   headers : {
    //     "Access-Control-Allow-Origin" : "*"
    //   }
    // })
    // .then((res) => {
    //   console.log("🚀 ~ .then ~ axios res:", res)
    // })
    
  }

  const uploadFile = async (): Promise<void> => {
    const storage: FirebaseStorage = getStorage(firebaseApp)
    const storageRef: StorageReference = ref(storage, "images/" + value.name)
    let res: UploadResult = await uploadBytes(storageRef, value)
    console.log("🚀 ~ uploadFile ~ res:", res)
    const url = await getDownloadURL(res.ref)
    console.log("🚀 ~ uploadFile ~ url:", url)
    const fileBlob = await getBlob(res.ref)
    console.log("🚀 ~ uploadFile ~ fileBlob:", fileBlob)
    let a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    let fileDownloadUrl = window.URL.createObjectURL(fileBlob);
    console.log("🚀 ~ uploadFile ~ fileDownloadUrl:", fileDownloadUrl)
    a.href = fileDownloadUrl;
    a.download = "image.jpg";
    a.click();
    window.URL.revokeObjectURL(url);
    setUploaded(true)
  }

  

  useEffect(()=>{
    console.log("value updated")
    if(!uploaded && value) {
      uploadFile()
    }
  }, [value])

  return (
    <>
    <h1 style={{color:'red'}}>
    {value ? value.name : "null"}
    </h1>
    {/* <form onSubmit={handleSubmit}> */}
      <input type="file" name="pdf" id="pdf" onChange={handleChange} />
      {/* <a href="blob:http://localhost:5173/2822c54e-5dc9-4f8a-b812-d1e241699141" download={"newImage.jpg"}> */}
        <button onClick={()=>{
          handleClick("blob:http://localhost:5173/3101d4b1-a65d-416e-91e1-f4a7bef1df32", "newImage.jpg")
        }}>
        Download
        </button>
      {/* </a> */}
    {/* </form> */}
    </>
  )
}

export default App
