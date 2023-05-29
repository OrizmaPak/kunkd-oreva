import Google from '@/assets/googleicon.svg'

const GooglePlay = () => {
  return (
    <div>

    <div className='bg-black text-white items-center justify-center flex gap-2 rounded-md px-4 py-1 '>
        <div>
            <img src={Google} alt="" width='30px' />
        </div>
        <div>
            <p className='text-[9px]'>GET IT ON</p>
            <h1 className='font-bold'>Google Play</h1>
        </div>
      
    </div>
    </div>
  )
}

export default GooglePlay
