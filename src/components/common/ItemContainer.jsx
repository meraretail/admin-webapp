const ItemContainer = (props) => {
  return (
    <div className='border rounded shadow p-4 relative'>
      <h3 className='absolute -top-4 left-3 bg-white px-2'>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default ItemContainer;
