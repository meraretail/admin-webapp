const SubItemContainer = (props) => {
  return (
    <div className='rounded shadow p-4 relative border border-purple-300'>
      <h4 className='absolute -top-4 left-3 bg-white px-2 text-violet-700'>
        {props.title}
      </h4>
      {props.children}
    </div>
  );
};

export default SubItemContainer;
