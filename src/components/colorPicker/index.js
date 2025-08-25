"use client"



// NAO TERMINADO , VER DPS





import React, { useEffect,useState,useRef } from "react"


export default function ColorPicker( {src} ){
    const[color, setcolor] = useState("");
    const imgRef= useRef();

    useEffect(()=>{
        const img = imgRef.current;
        if (!img) return;

        img.onload = () =>{
            console.log("img onloadada")
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');

            ctx.drawImage(img,0,0,img.width, img.height);
            const data = ctx.getImageData(0,0,img.width,img.height).data;
            let r = 0 ,g=0, b=0, count=0;
            for (let i = 0; i < data.length; i+=4) {
                r += data[i];
                g += data[i+1];
                b += data[i+2];

                count++;
            }
            //media dos rgb do bgl
            r =Math.floor(r/count);
            g =Math.floor(r/count);
            b =Math.floor(r/count);
            console.log(r);
            console.log(g);
            console.log(`rgb(${r},${g},${b})`)
            setcolor(`rgb(${r},${g},${b})`);
        }
        
    },[src])
    return(
        <>
        <img ref={imgRef} src={src} crossOrigin="anonymous" />
        <div 
            style = {{
                width:"100px",
                height:"100px",
                backgroundColor:"red"
            }}
        >
            
        </div>
        </>
    )
}
