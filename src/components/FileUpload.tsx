import { useEffect, useState } from "react";


declare global {
    interface Window { cloudinary: any; }
}

window.cloudinary = window.cloudinary || {};
const FileUpload = () => {
    const [cloudinaryReady, setCloudinaryReady] = useState(false);
    const cloudinaryWidgetScript = document.getElementById('cloudinaryWidget');
    useEffect(() => {
        if (!cloudinaryWidgetScript) {
            const createCloudinaryScript = document.createElement("script")
            createCloudinaryScript.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
            createCloudinaryScript.onload = () => {
                setCloudinaryReady(true);
            };
            document.head.appendChild(createCloudinaryScript);
        }

    }, []);

    const [uploadConfig] = useState({
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_PRESET,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: ["local", "camera", "dropbox", "google_drive"],
        // multiple: false,  //restrict upload to a single file
        folder: "wedding-album", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images", ], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
    });

    const openCloudinaryWidget = () => {
        // Cloudinary upload widget configuration
        const widget = window.cloudinary.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDNAME,
            uploadPreset: process.env.REACT_APP_PRESET,
            folder: "wedding-album",
            sources: ["local", "camera", "dropbox", "google_drive"],
            theme: "purple", //change to a purple theme

        }, (error: any, result: any) => {
            if (!error && result && result.event === "success") {
                console.log('Upload success:', result.info);
            }

            if (error) {
                alert(`we countered and error ${error} please text your photos to the couple 973-632-1861`)
            }

        });
        // Open the widget
        widget.open();

    };
    return (
        cloudinaryReady ?
            <button onClick={openCloudinaryWidget}>
                Upload
            </button>
            :
            <div>Loading</div>
    )
}
export default FileUpload;
