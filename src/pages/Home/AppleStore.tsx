import Apple from '@/assets/appleicon.svg'

const AppleStore = () => {
  return (
    <div className='bg-black text-white items-center justify-center flex gap-2 rounded-md px-4 py-1 '>
    <div>
        <img src={Apple} alt="" width='30px' />
    </div>
    <div>
        <p className='text-[9px]'>Download on the</p>
        <h1 className='font-bold'>Apple Store</h1>
    </div>
  
</div>
  )
}

export default AppleStore
