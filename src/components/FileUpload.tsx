import { useRef, useState } from "react";

import axios from "axios";


const FileUpload = () => {

    const [success, setSuccess] = useState<boolean>()
    const [error, setError] = useState<boolean>()

    const widgetRef = useRef<HTMLInputElement>(null);


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

    const handleFilesSelected = (event) => {
        const files = [...event.target.files];
        if (files && files.length > 0) {
            files.forEach((file) => {
                uploadToCloudinary(file)
            })
        }
    };


    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        ref={widgetRef}
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleFilesSelected}
                    />
                    {success &&
                        <div>
                            Thank you for your photos!
                        </div>
                    }
                </label>

            </div>
            {error &&
                <div>
                    * Some of your photos could not be uploaded, please text them to us
                </div>
            }
        </div>



    )
}
export default FileUpload;
