import gsap from 'gsap';
import React, { useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';

const Story = () => {

    const frameRef = useRef(null);
    
    const handleMouseLeave = ()=>{

    }
    
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = frameRef.current;
    
        if (!element) return;
    
        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
    
        const centerX = rect.width / 2;
        const centerY = rect.height / 2; 
    
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
    
        gsap.to(element, {
            duration: 0.3,
            rotateX: rotateX,
            rotateY: rotateY, 
            transformPerspective: 500,
            ease: "power1.inOut"
        });
    };
    
    

    
  return (
    <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
        
        <div className='flex flex-col size-full items-center py-10 pb-24'>
            <p className='font-general text-sm uppercase md:text-[10px]'>The Ultimate  Gaming</p>

            <div className='relative size-full'>
                <AnimatedTitle 
                    title="The Ultimate PUBG "
                    containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 " 
             />  

             <div className='story-img-container'>
                <div className='story-img-mask'>
                    <div className='story-img-content'>
                        <img src="/img/wal-2.jpg" alt="" 
                        className='object-contain'
                        ref={frameRef}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseLeave}
                        onMouseEnter={handleMouseLeave}
                        onMouseMove={handleMouseMove}
          
                    
                        />
                    </div>
                </div>


             </div>
                    
          </div>


          <div className='-mt-72 flex justify-center md:-mt-44 md:ml-[65%] md:justify-end'>
            <div className='flex h-full w-fit flex-col items-center md:items-start'>
                <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start '>PUBG: The ultimate survival experience where strategy and skill determine the last one standing.
                </p>
                <Button 
                 id="realm-button" title = "discover Gaming"
                 containerClass ="mt-5 bg-white {
                    
                 }"

                />

            </div>
          </div>

           
        </div>
    </section>
  )
}

export default Story