import { useEffect, useRef, useState } from "react";
export default function Reveal({children}) {
  const ref=useRef(null), [show,setShow]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShow(true);o.disconnect()}},{threshold:.12});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[]);
  return <div ref={ref} className={show?"reveal is-visible":"reveal"}>{children}</div>;
}