import { RiImageAddFill } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import LoadingButton from '../../formComponents/LoadingButton';

const ImageUploader = ({
  loading,
  progress,
  images,
  setImages,
  imageUploadHandler,
}) => {
  // console.log('images', images);

  return (
    <div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="my-auto">
          <form onSubmit={imageUploadHandler}>
            <div className="flex gap-4">
              <label
                htmlFor="categoryImages"
                className="block w-full py-1 px-2 rounded cursor-pointer border border-violet-700 bg-violet-50 hover:bg-violet-100 text-violet-700"
              >
                <span className="flex items-center gap-2">
                  <RiImageAddFill />
                  <span className="text-sm">Click to Add Images</span>
                  <span className="font-barlow text-sm">(max 10 images)</span>
                </span>
                <input
                  type="file"
                  id="categoryImages"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages([...images, ...e.target.files])}
                  className="sr-only"
                />
              </label>
              {loading ? (
                <LoadingButton />
              ) : (
                <button className="text-sm py-1 px-4 rounded cursor-pointer border border-blue-700 bg-blue-50 hover:bg-blue-100 text-blue-700">
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
        {/* upload progress bar */}
        <div className="flex items-center">
          <div className="bg-gray-200 w-full h-4 rounded-full overflow-hidden">
            <div
              className="h-4 bg-violet-500 text-xs font-medium text-center p-0.5 leading-none rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            >
              <span
                className={`ml-2 ${
                  progress === 0 ? 'text-gray-600' : 'text-blue-100'
                }`}
              >
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* upload progress bar ends */}
      {/* image preview section */}
      <div className="mt-2">
        <h4 className="py-2 text-sm font-semibold text-gray-600">
          Image preview:
        </h4>
        <ul className="flex flex-wrap gap-2">
          {images &&
            images.length > 0 &&
            images.map((item, index) => (
              <li key={index} className="relative">
                <img
                  src={URL.createObjectURL(item)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded shadow-lg border hover:scale-110 transition duration-200"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((img) => img !== item))
                  }
                  className="absolute -top-2 -right-2"
                >
                  <MdOutlineCancel className="text-red-400 bg-white" />
                </button>
              </li>
            ))}
        </ul>
      </div>
      {/* image preview section ends */}
    </div>
  );
};

export default ImageUploader;
