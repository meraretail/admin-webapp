import Skeleton from 'react-loading-skeleton';

function PanelLayoutSkeleton() {
  return (
    <div className='flex items-start'>
      <div className='h-screen w-[14rem] py-2 px-2 space-y-7 bg-white border-r border-gray-200'>
        <div>
          <Skeleton count={2} />
        </div>
        <div>
          <Skeleton count={10} />
        </div>
      </div>
      <section className='min-h-screen w-full'>
        <div className='h-[3.5rem] border-b px-4 shadow bg-white z-20 grid grid-cols-2 gap-8'>
          <Skeleton className='mt-[1rem]' />
          <Skeleton className='mt-[1rem]' />
        </div>
        <main className='px-4 py-8 grid grid-cols-3 gap-8 w-full'>
          <Skeleton count={10} />
          <Skeleton count={10} />
          <Skeleton count={10} />
        </main>
      </section>
    </div>
  );
}

export default PanelLayoutSkeleton;
