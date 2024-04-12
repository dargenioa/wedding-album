import { useEffect, useRef, useState } from "react";

import axios from "axios";


const FileUpload = () => {

    const [success, setSuccess] = useState<boolean>()
    const [error, setError] = useState<boolean>()
    const [files, setFiles] = useState<any>([])

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

    const handleFilesSelected = (event: any) => {
        const file = [...event.target.files];
        setFiles(file);
    };

    const handleSubmit = () => {
        files?.forEach((file: any) => {
            uploadToCloudinary(file)
        })
    }


    return (
        <div className="container mx-auto bg-black">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Share The Love!</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                We would love for you to contribute to our wedding album by uploading your cherished photos from our special day. Whether it's a candid shot of us dancing, a sweet moment captured during the ceremony, or a group photo with friends and family, we can't wait to see the moments you've captured.                            </p>
            <section className="bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/dusgzehfe/image/upload/v1712952541/assests/kwpefi7tfszdpk8mqlva.jpg')] bg-blend-multiply">
                <div className="px-10 mx-auto max-w-screen-xl text-center py-24 lg:py-56">

                    <div className="inline-flex mt-20 pt-40 justify-center w-fit">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="px-4 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                </div>
            </section>


            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-6">
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Submit
                </a>
                <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                    Submit
                </a>
            </div>




            {error && success != undefined || true &&
                <div>
                    * Some of your photos could not be uploaded, please text them to us
                </div>
            }
            <button type="submit" onClick={handleSubmit}>Submit</button>

        </div>



    )
}
export default FileUpload;
