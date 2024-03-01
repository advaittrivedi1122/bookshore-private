import { useEffect, useState } from 'react'
import { SAVE_BOOK } from '../utils/Mutations';
import makeQuery from '../utils/AxiosQuery';
import Navbar from '../components/Navbar';
import { uploadPdf, uploadPreviewImage } from '../firebase/app';
import AllPdfCard from '../components/AllPdfCard';

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uploadedPdfName, setUploadedPdfName] = useState("");
    const [uploadedImageName, setUploadedImageName] = useState("");
    const [pdfError, setPdfError] = useState("");
    const [imageError, setImageError] = useState("");
    const [pdfNameByUser, setPdfNameByUser] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [pdfFile, setPdfFile]: any = useState(null);
    const [imageFile, setImageFile]: any = useState(null)
    const allowedPdfType: string = "application/pdf";
    const allowedImageType: string = "image/jpeg";

    
    // const storage: FirebaseStorage = getStorage(firebaseApp)
    // const storageRef: StorageReference = ref(storage, "pdf/" + value.name)
    // let res: UploadResult = await uploadBytes(storageRef, value)
    // console.log("🚀 ~ uploadFile ~ res:", res)
    // const url = await getDownloadURL(res.ref)
    // console.log("🚀 ~ uploadFile ~ url:", url)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (pdfFile) {
            const uploadedPdf: any = await uploadPdf(pdfFile.name, pdfFile)
            console.log("🚀 ~ handleSubmit ~ uploadedPdf:", uploadedPdf)
            const uploadedPreviewImage: any = await uploadPreviewImage(uploadedImageName, imageFile)
            const data = await makeQuery(SAVE_BOOK, {
                bookInput : {
                    bookName: pdfNameByUser,
                    uploadedBy: JSON.parse(localStorage.getItem('user') as string).id,
                    author: author,
                    bookLink: uploadedPdf.bookLink,
                    bookPath: uploadedPdf.bookPath,
                    previewImageLink: uploadedPreviewImage.previewImageLink,
                    previewImagePath: uploadedPreviewImage.previewImagePath,
                    tags: tags,
                    description: description
                }
            }, "Mutation")
            console.log("🚀 ~ handleSubmit ~ data:", data)
        }
    }

    const handlePdfUpload = async (e: any) => {
        e.preventDefault();
        const file: any = e.target.files[0];
        setUploadedPdfName(file.name);
        setPdfFile(file);
        if (file.type !== allowedPdfType) {
            setPdfError("Only PDF files are allowed!");
            setUploadedPdfName("");
            setPdfFile(null);
            return;
        } else {
            setPdfError("");
        }
    }

    const handleImageUpload = async (e: any) => {
        e.preventDefault();
        const file: any = e.target.files[0];
        console.log("🚀 ~ handleImageUpload ~ file:", file)
        setUploadedImageName(file.name);
        setImageFile(file);
        if (file.type !== allowedImageType) {
            setImageError("Only JPG/JPEG files are allowed!");
            setUploadedImageName("");
            setImageFile(null);
            return;
        } else {
            setImageError("");
        }
    }

    const handleReset = () => {
        setUploadedPdfName("");
        setUploadedImageName("");
        setPdfError("");
        setImageError("");
        setPdfNameByUser("");
        setAuthor("");
        setTags("");
        setDescription("");
    }

    useEffect(() => {
            
        console.log('uploadedImageName', uploadedImageName)
        console.log('uploadedPdfName', uploadedPdfName)
        console.log('pdfNameByUser', pdfNameByUser)
    }, [isLoggedIn, uploadedPdfName, uploadedImageName, pdfError, imageError, pdfNameByUser])

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <AllPdfCard />
        </div>
    )
}

export default Home;