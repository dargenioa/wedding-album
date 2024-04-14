import { useEffect, useRef, useState } from "react";

import axios from "axios";


const FileUpload = () => {

    const [success, setSuccess] = useState<boolean>()
    const [error, setError] = useState<boolean>()
    const [files, setFiles] = useState<any>([])
    const [text, setText] = useState<string>('');

    const widgetRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        handleError();
    })

    const uploadToCloudinary = async (file: any) => {
        const uploadPreset = process.env.REACT_APP_PRESET as any
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/auto/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Upload response:', response.data);
            setSuccess(true)
        } catch (error) {
            console.error('Upload error:', error);
            setError(true)
        }
    };

    const handleFilesSelected = (event: any) => {
        const file = [...event.target.files];
        setFiles(file);
    };

    const handleSubmit = () => {
        files?.forEach((file: any) => {
            uploadToCloudinary(file)
        })
    }

    const handleError = () => {
        if (success) {
            setText('Thank you for your photos!')
        } else if (success != undefined || true && error) {
            setText('Some of your files could not be uploaded. Please send them to the couple directly')
        }
    }


    return (
        <div className="px-10 pt-48 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <div className="mb-4 text-4xl font-DancingScript text-black md:text-5xl lg:text-6xl">
                <h1>The DelPesce's</h1>
                <h1>Wedding Ablum</h1>

            </div>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    {files.length > 0 ?
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Please Click Submit</span></p>
                        :
                        <div>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="px-4 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    }

                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    ref={widgetRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFilesSelected}
                />
            </label >
            < div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-6" >
                <button type="submit" onClick={handleSubmit} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Submit
                </button>
            </div >
            <div className="text-black text-center mt-8 font-DancingScript">{text}</div>

        </div >



    )
}
export default FileUpload;
