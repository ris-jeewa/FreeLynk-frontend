import React, { useEffect, useRef, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import axios from 'axios';

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);
              setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
    >
      Upload Profile Image
    </button>
  );
};

const TestCloudinary = () => {
  // Configuration
  const cloudName = 'dcn64hytu';
  const uploadPreset = 'freelynk';

  // State
  const [publicId, setPublicId] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local'],
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    maxFiles: 1,
    defaultSource: 'local',
    resourceType: 'image',
    folder: 'freelynk/1/profileimg',
    styles: {
      palette: {
        window: '#ffffff',
        sourceBg: '#f4f4f5',
        windowBorder: '#90a0b3',
        tabIcon: '#000000',
        inactiveTabIcon: '#555a5f',
        menuIcons: '#555a5f',
        link: '#000000',
        action: '#000000',
        inProgress: '#464646',
        complete: '#000000',
        error: '#cc0000',
        textDark: '#000000',
        textLight: '#fcfffd',
      },
    }
  };

  // Load Cloudinary script
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

    loadCloudinaryScript()
      .then(() => {
        setIsScriptLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading Cloudinary script:', error);
      });

    return () => {
      const script = document.querySelector('script[src="https://upload-widget.cloudinary.com/global/all.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Handle image upload to backend
  useEffect(() => {
    const uploadImageToBackend = async () => {
      if (!publicId) return;

      try {
        const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
        const response = await axios.post(
          `http://localhost:8080/api/users/1/image`,
          {
            imageUrl: imageUrl
          }
        );
        console.log("Image uploaded successfully", response.data);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };

    uploadImageToBackend();
  }, [publicId, cloudName]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h3 className="text-xl font-semibold mb-4">Profile Image Upload</h3>
      
      {isScriptLoaded ? (
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      ) : (
        <button 
          disabled 
          className="bg-gray-300 text-gray-500 px-6 py-2 rounded-full cursor-not-allowed"
        >
          Loading...
        </button>
      )}

      {publicId && (
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
          <AdvancedImage
            cldImg={cld.image(publicId)}
            plugins={[responsive(), placeholder()]}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <a
            href="https://cloudinary.com/documentation/upload_widget"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Upload Widget User Guide
          </a>
        </p>
      </div>
    </div>
  );
};

export default TestCloudinary;
