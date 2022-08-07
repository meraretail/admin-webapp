import Button from '../formComponents/Button';
import LoadingButton from '../formComponents/LoadingButton';

const EditChildCategoryAttributes = ({
  list,
  selectedArray,
  setSelectedArray,
  loading,
  handleSubmit,
  btnText,
  summary,
}) => {
  // console.log('list: ', list);
  // console.log('selectedArray: ', selectedArray);

  // Step 1: checkbox items change handle
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!selectedArray.includes(e.target.value)) {
        setSelectedArray([...selectedArray, e.target.value]);
      }
    } else {
      var filteredItems = selectedArray.filter(
        (value, index, arr) => value !== e.target.value
      );
      setSelectedArray(filteredItems);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4 pt-2'>
          <div className='grid grid-cols-5 gap-4'>
            {list?.map((item) => (
              <div key={item.id} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id={item.id}
                  value={item.name}
                  onChange={handleCheckboxChange}
                  checked={selectedArray.includes(item.name)}
                />
                <label htmlFor={item.id} className='cursor-pointer'>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {loading ? (
              <LoadingButton className='bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100' />
            ) : (
              <Button className='opacity-70 bg-violet-50 text-violet-700 border border-violet-700 hover:bg-violet-100'>
                {btnText}
              </Button>
            )}
            <div className='text-sm'>*{summary}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditChildCategoryAttributes;
