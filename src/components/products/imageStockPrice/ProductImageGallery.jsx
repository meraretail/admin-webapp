import React from 'react';

const ProductImageGallery = ({
  imageArr,
  imageDefaultHandler,
  imageDeleteHandler,
}) => {
  // console.log('imageArr: ', imageArr);
  return (
    <div>
      <div className="flex p-2 gap-2 w-full overflow-auto">
        {imageArr && imageArr.length === 0 ? (
          <span className="text-sm text-gray-600">No images found</span>
        ) : (
          imageArr &&
          imageArr.map((image, index) => (
            <div key={index} className="flex-shrink-0 relative group">
              <img
                src={image.mediumUrl}
                alt="product"
                className="w-36 h-36 object-cover rounded shadow-lg border group-hover:scale-110 group-hover:border-violet-600 group-hover:border-2 transition"
              />
              {image.isDefault && (
                <span className="absolute -top-1 -left-1 text-xs text-white bg-violet-600 px-1 py-1 rounded">
                  Default
                </span>
              )}
              <div className="text-xs py-2 hidden group-hover:block absolute -bottom-2 -left-2 -right-2 bg-white opacity-90 rounded border-violet-600 border-2">
                <div className="flex justify-between px-2">
                  <button
                    className="border border-violet-600 rounded py-0.5 px-1 hover:bg-violet-700 hover:text-white"
                    onClick={() =>
                      imageDefaultHandler(image.id, image.productOptionId)
                    }
                  >
                    Make default
                  </button>
                  <button
                    className="border border-red-600 rounded py-0.5 px-1 hover:bg-red-700 hover:text-white"
                    onClick={() => imageDeleteHandler(image.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
