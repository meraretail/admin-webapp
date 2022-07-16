import { RiImageAddFill } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import LoadingButton from '../formComponents/LoadingButton';

const MultiImageUpload = ({
  imageUploadHandler,
  progress,
  images,
  setImages,
  loading,
}) => {
  // Step 1: Handle input change on image input
  const handleImageChange = (e) => {
    const tempArr = [];
    [...e.target.files].forEach((file) => {
      //   console.log('file >>> ', file);
      tempArr.push({
        file: file,
        url: URL.createObjectURL(file),
      });
    });

    setImages((prevImages) => prevImages.concat(tempArr));
  };

  // console.log(images);
  return (
    <div className='sspace-y-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className='my-auto'>
        <form onSubmit={imageUploadHandler}>
          <div className='flex gap-4'>
            <label
              htmlFor='imageInput'
              className='block w-full py-1 px-2 rounded cursor-pointer border border-violet-700 bg-violet-50 hover:bg-violet-100 text-violet-700'
            >
              <span className='flex items-center gap-2'>
                <RiImageAddFill />
                <span className='text-sm'>Click to Add Images</span>
                <span className='font-barlow text-sm'>(max 10 images)</span>
              </span>
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                multiple
                onChange={handleImageChange}
                className='sr-only'
              />
            </label>
            {loading ? (
              <LoadingButton />
            ) : (
              <button className='text-sm py-1 px-4 rounded cursor-pointer border border-blue-700 bg-blue-50 hover:bg-blue-100 text-blue-700'>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
      {/* upload progress bar */}
      <div className='flex items-center'>
        <div className='bg-gray-200 w-full h-4 rounded-full overflow-hidden'>
          <div
            className='h-4 bg-violet-500 text-xs font-medium text-center p-0.5 leading-none rounded-full transition-all duration-75'
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
      {/* upload progress bar ends */}
      {/* image preview section */}
      <div>
        <ul className='flex flex-wrap gap-2'>
          {images &&
            images.length > 0 &&
            images.map((item, index) => (
              <li key={index} className='relative'>
                <img
                  src={item.url}
                  alt='preview'
                  className='w-20 h-20 object-cover rounded shadow-lg border hover:scale-110 transition duration-200'
                />
                <button
                  onClick={() => setImages(images.filter((e) => e !== item))}
                  className='absolute -top-2 -right-2'
                >
                  <MdOutlineCancel className='text-red-400 bg-white' />
                </button>
              </li>
            ))}
        </ul>
      </div>
      {/* image preview section ends */}
    </div>
  );
};

export default MultiImageUpload;
