import Iphone from '@/assets/iphone.svg'
import GooglePlay from '../Home/GooglePlay'
import AppleStore from '../Home/AppleStore'

const KundaApp = () => {
  return (
    <div className='flex justify-between  max-w-[1000px] mx-auto gap-[100px]'>
      <div className='basis-[100%]'>
        <img src={Iphone} alt="phone" className=' ' />
      </div>

      <div className='basis-[100%]'>
        <div>
        <h1 className='text-3xl font-bold mt-7 mb-14 '>
            The Kunda Kids App
        </h1>
        <p>
        Discover the convenience of our mobile app, bringing a treasure trove of captivating stories right to your fingertips. Whether you're on the way to school or embarking on a family adventure, your child can immerse themselves in a vast library of tales that entertain, educate, and ignite their imagination.
        </p>
        </div>
        <div className='mt-[160px]'>
            <h1 className='font-bold text-3xl mb-14'>Download App Now </h1>
            <div className='flex gap-4'>

           <AppleStore/>

             <GooglePlay/>  
            </div>
        </div>
      </div>

    </div>
  )
}

export default KundaApp
