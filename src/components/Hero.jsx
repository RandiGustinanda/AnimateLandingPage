import React, { useRef, useEffect } from 'react';
import './hero.css';
import { gsap } from 'gsap';

const Hero = () =>{
    const animation = useRef(null);
    const txt = useRef(null);
    const link =useRef(null);
    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(animation.current,{
            fontSize:'30px',
            position:'absolute',
            height:'20px',
            width: '30px',
            duration :2,
            delay: 3,
            left : 200,
            top: 40
        });
        tl.to(txt.current,{
            opacity:1,
            duration :1,
            stagger: .25
        })
        tl.to(link.current,{
            opacity:1,
            duration :1,
            stagger: .25
        })
      }, []);


    return(
        <div className='navbar'>
            <div className='animation' ref={animation}>
                <svg id='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M64 32C28.7 32 0 60.7 0 96V288 448c0 17.7 14.3 32 32 32s32-14.3 32-32V320h95.3L261.8 466.4c10.1 14.5 30.1 18 44.6 7.9s18-30.1 7.9-44.6L230.1 309.5C282.8 288.1 320 236.4 320 176c0-79.5-64.5-144-144-144H64zM176 256H64V96H176c44.2 0 80 35.8 80 80s-35.8 80-80 80z"/>
                </svg>
            </div>
            <div className='txt' ref={txt}>Welcome asdhjashjdhjasdhj</div>
            <div className='link' ref={link}>
                <ul className='ul'>
                    <li>hello</li>
                    <li>asd</li>
                </ul>
            </div>
        </div>
    )
}
export default Hero;
