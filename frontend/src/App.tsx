import { useEffect, useState } from 'react'
import './App.css'
import { FirebaseStorage, StorageReference, UploadResult, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import firebaseApp from './firebase/app'
import axios from 'axios'

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
    fetch(url, {
      method : "GET",
      headers : {
        "Access-Control-Allow-Origin" : "*"
      }
    })
    .then((res) => {
      console.log("🚀 ~ .then ~ axios res:", res)
    })
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
    setUploaded(true)
  }

  useEffect(()=>{
    console.log("value updated")
    if(!uploaded && value) {
      // uploadFile()
    }
  }, [value])

  return (
    <>
    <h1 style={{color:'red'}}>
    {value ? value.name : "null"}
    </h1>
    {/* <form onSubmit={handleSubmit}> */}
      <input type="file" name="pdf" id="pdf" onChange={handleChange} />
      {/* <a href="https://firebasestorage.googleapis.com/v0/b/bookshore-d046a.appspot.com/o/images%2Fastronaut.jpg?alt=media&token=9b0ad37d-b40f-4cb7-b0be-f554d1a1b84c" download={"newImage.jpg"} target='_blank'> */}
        <button onClick={()=>{handleClick(downloadUrl, "newImage.jpg")}}>
        Download
        </button>
      {/* </a> */}
    {/* </form> */}
    </>
  )
}

export default App
