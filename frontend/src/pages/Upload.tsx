import React, { useEffect, useState } from 'react'
import { LOGIN_USER, SAVE_BOOK } from '../utils/Mutations';
import makeQuery from '../utils/AxiosQuery';
import Navbar from '../components/Navbar';
import { FirebaseStorage, getStorage, StorageReference, ref, UploadResult, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseApp, { uploadPdf, uploadPreviewImage } from '../firebase/app';

const Upload = () => {

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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (pdfFile) {
            const uploadedPdf: any = await uploadPdf(pdfFile.name, pdfFile)
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
            
    }, [isLoggedIn, uploadedPdfName, uploadedImageName, pdfError, imageError, pdfNameByUser])

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='absolute top-0 flex flex-col h-screen w-screen bg-slate-900 justify-center items-center text-emerald-500 font-bold text-xl'>
                <div className='flex mt-14 h-[80vh] w-[60vw] lg:w-[70vw] md:w-[80vw] rounded-lg'>
                    <div className="flex flex-col w-1/2 h-full rounded">
                        <div className='flex flex-col items-center justify-center w-full h-1/2'>
                            <div className='flex flex-col items-center justify-center border-2 border-emerald-500 border-dashed shadow-2xl shadow-emerald-500/10 h-[80%] w-[60%] rounded-xl relative cursor-pointer'>
                                <input type="file" name="uploadPdf.pdf" className='absolute opacity-0 w-full h-full cursor-pointer' id="pdfFile" onChange={handlePdfUpload} />
                                <div className='w-[3rem] h-[4rem]'>
                                    <svg fill="#10b981" version="1.1" id="Capa_1"
                                        viewBox="0 0 294.156 294.156">
                                        <g>
                                            <path d="M227.002,108.256c-2.755-41.751-37.6-74.878-80.036-74.878c-42.447,0-77.298,33.141-80.038,74.907
		C28.978,113.059,0,145.39,0,184.184c0,42.234,34.36,76.595,76.595,76.595h116.483c3.313,0,6-2.687,6-6s-2.687-6-6-6H76.595
		C40.977,248.778,12,219.801,12,184.184c0-34.275,26.833-62.568,61.087-64.411c3.184-0.171,5.678-2.803,5.678-5.991
		c0-0.119-0.003-0.236-0.01-0.355c0.09-37.536,30.654-68.049,68.211-68.049c37.563,0,68.132,30.518,68.211,68.063
		c-0.005,0.116-0.009,0.238-0.009,0.329c0,3.196,2.505,5.831,5.696,5.992c34.37,1.741,61.292,30.038,61.292,64.421
		c0,19.526-8.698,37.801-23.864,50.138c-2.571,2.091-2.959,5.87-0.868,8.44c2.091,2.571,5.87,2.959,8.44,0.868
		c17.98-14.626,28.292-36.293,28.292-59.447C294.156,145.269,265.08,112.926,227.002,108.256z"/>
                                            <path d="M140.966,141.078v76.511c0,3.313,2.687,6,6,6s6-2.687,6-6v-76.511c0-3.313-2.687-6-6-6S140.966,137.765,140.966,141.078z"
                                            />
                                            <path d="M181.283,152.204c1.536,0,3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485l-34.317-34.317
		c-2.343-2.343-6.143-2.343-8.485,0l-34.317,34.317c-2.343,2.343-2.343,6.142,0,8.485c2.343,2.343,6.143,2.343,8.485,0
		l30.074-30.074l30.074,30.074C178.212,151.618,179.748,152.204,181.283,152.204z"/>
                                        </g>
                                    </svg>
                                </div>
                                {!pdfError && (
                                    <div className='text-wrap text-center'>
                                        {
                                            uploadedPdfName ? uploadedPdfName : "Upload PDF"
                                        }
                                    </div>
                                )}
                                {pdfError && (
                                    <div className='text-red-500 text-wrap text-center'>
                                        {
                                            pdfError
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full h-1/2'>
                            <div className='flex flex-col items-center justify-center border-2 border-emerald-500 border-dotted shadow-2xl shadow-emerald-500/10 h-[80%] w-[60%] rounded-xl relative cursor-pointer'>
                                <input type="file" name="uploadImage.jpg" className='absolute opacity-0 w-full h-full cursor-pointer' id="imageFile" onChange={handleImageUpload} />
                                <div className='w-[3rem] h-[4rem] '>
                                    <svg fill="#10b981" version="1.1" id="Capa_1"
                                        viewBox="0 0 294.156 294.156">
                                        <g>
                                            <path d="M227.002,108.256c-2.755-41.751-37.6-74.878-80.036-74.878c-42.447,0-77.298,33.141-80.038,74.907
		C28.978,113.059,0,145.39,0,184.184c0,42.234,34.36,76.595,76.595,76.595h116.483c3.313,0,6-2.687,6-6s-2.687-6-6-6H76.595
		C40.977,248.778,12,219.801,12,184.184c0-34.275,26.833-62.568,61.087-64.411c3.184-0.171,5.678-2.803,5.678-5.991
		c0-0.119-0.003-0.236-0.01-0.355c0.09-37.536,30.654-68.049,68.211-68.049c37.563,0,68.132,30.518,68.211,68.063
		c-0.005,0.116-0.009,0.238-0.009,0.329c0,3.196,2.505,5.831,5.696,5.992c34.37,1.741,61.292,30.038,61.292,64.421
		c0,19.526-8.698,37.801-23.864,50.138c-2.571,2.091-2.959,5.87-0.868,8.44c2.091,2.571,5.87,2.959,8.44,0.868
		c17.98-14.626,28.292-36.293,28.292-59.447C294.156,145.269,265.08,112.926,227.002,108.256z"/>
                                            <path d="M140.966,141.078v76.511c0,3.313,2.687,6,6,6s6-2.687,6-6v-76.511c0-3.313-2.687-6-6-6S140.966,137.765,140.966,141.078z"
                                            />
                                            <path d="M181.283,152.204c1.536,0,3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485l-34.317-34.317
		c-2.343-2.343-6.143-2.343-8.485,0l-34.317,34.317c-2.343,2.343-2.343,6.142,0,8.485c2.343,2.343,6.143,2.343,8.485,0
		l30.074-30.074l30.074,30.074C178.212,151.618,179.748,152.204,181.283,152.204z"/>
                                        </g>
                                    </svg>
                                </div>
                                {!uploadedImageName && !imageError && (
                                    <div className='text-center'>
                                        Upload Preview Image
                                        <div className='text-sm'>
                                            (Optional)
                                        </div>
                                    </div>
                                )}
                                {uploadedImageName && (
                                    <div className='text-wrap text-center'>
                                        {uploadedImageName}
                                    </div>
                                )}
                                {imageError && (
                                    <div className='text-red-500 text-wrap text-center'>
                                        {imageError}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-center border-emerald-500 border-0 w-1/2 h-inherit rounded">
                        <div className='border-2 border-emerald-500 w-[80%] h-[95%] rounded-lg'>
                        <div className='text-center mt-[1rem] text-2xl'>
                        Add PDF to Cloud Storage
                    </div>

                    <div className='text-center mt-[2rem] text-md'>
                        {/* PDF Name */}
                        <input type="text" placeholder='Pdf Name' className='p-3 rounded w-[25vw]' onChange={(e) => { setPdfNameByUser(e.target.value) }} value={pdfNameByUser} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* Author Name */}
                        <input type="text" placeholder='Author Name' className='p-3 rounded w-[25vw]' onChange={(e) => { setAuthor(e.target.value) }} value={author} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* Tags */}
                        <input type="text" placeholder='Tags (optional) - science, fiction' className='p-3 rounded w-[25vw]' onChange={(e) => { setTags(e.target.value) }} value={tags} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* Description */}
                        <input type="text" placeholder='Description (optional)' className='p-3 rounded w-[25vw]' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                    </div>
                    <div className='flex justify-evenly h-[2.5rem] mt-[2rem] text-md'>
                                    <button className='w-[40%] h-[2.5rem] bg-white rounded-lg text-red-500' onClick={handleReset}>Reset</button>
                                    <button className='w-[40%] h-[2.5rem] bg-white rounded-lg' onClick={handleSubmit}>Submit</button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload