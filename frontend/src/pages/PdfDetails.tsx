import { useEffect, useState } from 'react'
import makeQuery from '../utils/AxiosQuery'
import { GET_BOOK, INCREASE_DOWNLOADS, INCREASE_VIEWS } from '../utils/Queries'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { downloadPdf } from '../firebase/app'

const PdfDetails = () => {

    const [pdf, setPdf]: any = useState({});
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [views, setViews] = useState(0);
    const [downloads, setDownloads] = useState(0);

    const { id: bookId } = useParams();

    const getBook = async (id: string) => {
        const data: any = await makeQuery(GET_BOOK, {id}, "Query")
        setPdf(data.book)
        setIsDataFetched(true);
        setViews(data.book.views);
        setDownloads(data.book.downloads);
    }

    const handleViewPdf = async () => {
        await makeQuery(INCREASE_VIEWS, { id : bookId }, "Query")
        setViews(views + 1);
    }
    
    const handleDownloadPdf = async (e: any) => {
        e.preventDefault();
        downloadPdf(pdf.bookPath);
        await makeQuery(INCREASE_DOWNLOADS, { id : bookId }, "Query")
        setDownloads(downloads + 1);
    }

    useEffect(() => {
        if (!isDataFetched) {
            getBook(bookId as string)
        }
    }, [isDataFetched, pdf, views, downloads])

    return (
        <div>
            <Navbar isLogin={false} />
            <div className='flex flex-row justify-center bg-slate-900 min-h-scree h-full'>
                <div className='flex justify-center items-center h-[90vh] w-[100vw]'>
                    <div className='mx-4 flex flex-col border-emerald-500 rounded-lg border- h-[70vh] w-[35vw]'>
                        <div className='flex justify-center items-center h-1/2 w-full '>
                            {!pdf.previewImageLink && (
                                <div className='flex justify-center items-center h-[16rem] w-[16rem] border-2 bg-red-500 text-3xl text-white font-mono font-bold rounded-lg'>
                                PDF
                            </div>
                            )}
                            {pdf.previewImageLink && (
                                <div className='flex justify-center items-center h-[16rem] w-[16rem] border-2 text-3xl text-white font-mono font-bold rounded-lg bg-cover bg-center' style={{backgroundImage : `url('${pdf.previewImageLink}')`}}>
                            </div>
                            )}
                        </div>
                        <div className='flex flex-col h-1/2 w-full'>
                        <div className='flex justify-center items-center h-1/2 w-full'>
                            
                            <span className='flex justify-center items-center mx-2 h-[4rem] w-[12rem] border-emerald-500 border- text-emerald-500 text-lg font-mono font-bold rounded-xl'>
                                <span className='underline underline-offset-4'>Views</span> : { views }
                            </span>
                            <span className='flex justify-center items-center mx-2 h-[4rem] w-[12rem] border-emerald-500 border- text-emerald-500 text-lg font-mono font-bold rounded-xl'>
                            <span className='underline underline-offset-4'>Downloads</span> : { downloads }
                            </span>
                        </div>
                        {/* <div className='flex justify-center items-center h-1/2 w-full'>
                            <button className='h-[3rem] w-[10rem] border-emerald-500 border-2 text-emerald-500'>Add to Favourites</button>
                        </div> */}
                            
                            {/* <div className='h-1/2 w-1/2 border-2'></div> */}

                        </div>
                    </div>
                    <div className='mx-4 flex flex-col border-emerald-500 rounded-lg border- h-[70vh] w-[35vw]'>
                        <div className='py-[2rem] flex justify-center items-center text-center text-wrap font-mono text-2xl font-bold border-b-emerald-500 border-r-transparent border-t-transparent border-l-transparent border-2 text-emerald-500 h-1/6 w-full'>
                            { pdf.name }
                        </div>
                        
                        <div className='mx-4 border-b-emerald-500 border-r-transparent border-t-transparent border-l-transparent border- '>

                        <div className='flex mx-8 mt-6 items-center text-right text-wrap font-mono text-xl font-bold text-emerald-500 h-1/6 w-full '>
                            Author : { pdf.author }
                        </div>
                        </div>
                        <div className='mx-4 border-b-emerald-500 border-r-transparent border-t-transparent border-l-transparent border-'>
                        <div className='flex flex-row mx-8 my-2 font-mono text-lg font-bold text-emerald-500 h-1/6 '>
                            Description :  { pdf.description }
                        </div>
                        </div>
                        <div className='mx-4 border-b-emerald-500 border-r-transparent border-t-transparent border-l-transparent border-'>
                        <div className='flex flex-row mx-8 my-2 font-mono text-lg font-bold text-emerald-500 h-1/6 '>
                            Tags : { pdf.tags }
                        </div>
                        </div>
                        
                        <div className='flex justify-center items-end font-mono text-xl font-bold text-black h-full w-full'>

                            <button className='mx-8 relative bottom-8 h-12 w-[8rem] bg-blue-500 rounded-lg' onClick={handleViewPdf}>
                            <a href={pdf.bookLink} target='_blank'>
                                View
                            </a>
                            </button>
                            <button className='mx-8 relative bottom-8 h-12 w-[8rem] bg-blue-500 rounded-lg' onClick={handleDownloadPdf}>
                                Download
                            </button>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfDetails