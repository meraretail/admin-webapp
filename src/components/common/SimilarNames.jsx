const SimilarNames = ({ label, array }) => {
  return (
    <div>
      <h2 className='font-bold my-2 text-sm'>{label}</h2>
      <ul className='flex flex-wrap gap-2'>
        {array &&
          array.length > 0 &&
          array.map((item) => (
            <li
              key={item.id}
              className='rounded-lg border bg-gray-100 px-2 py-1 text-gray-600'
            >
              <span className='text-sm font-barlow'>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SimilarNames;
