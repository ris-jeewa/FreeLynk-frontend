import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

const CloudinaryUploadWidget = ({ uwConfig, setPublicId, setImageUrl }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const loadCloudinaryScript = () => {
      return new Promise((resolve, reject) => {
        if (window.cloudinary) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.async = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject(new Error('Failed to load Cloudinary script'));
        };

        document.body.appendChild(script);
      });
    };

    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Upload successful:", result.info);
              
              // Extract both publicId and full URL
              const publicId = result.info.public_id;
              const imageUrl = result.info.secure_url || result.info.url;
              
              if (setPublicId) {
                setPublicId(publicId);
              }
              if (setImageUrl) {
                setImageUrl(imageUrl);
              }
            }
            
            if (error) {
              console.error("Upload error:", error);
            }
          }
        );

        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    loadCloudinaryScript()
      .then(() => {
        setIsScriptLoaded(true);
        initializeUploadWidget();
      })
      .catch((error) => {
        console.error('Error loading Cloudinary script:', error);
      });

    return () => {
      const script = document.querySelector('script[src="https://upload-widget.cloudinary.com/global/all.js"]');
      if (script && script.parentNode) {
        script.remove();
      }
    };
  }, [uwConfig, setPublicId, setImageUrl]);

  return (
    // <button
    //   ref={uploadButtonRef}
    //   id="upload_widget"
    //   className="cloudinary-button"
    // >
    //   Upload
    // </button>

    <button
      ref={uploadButtonRef}
      className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors"
      disabled={!isScriptLoaded}
      type="button"
      aria-label="Upload profile image"
    >
      <FaEdit className="text-white" />
    </button>
  );
};

export default CloudinaryUploadWidget;