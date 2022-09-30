import Cropper from 'cropperjs';
import './index.css'
import './cropper.css'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
export default function Cutt() {

  const location = useLocation();
  const navigate = useNavigate()
  const [crop,setCrop] = useState(undefined)
  const [imgURL,setImgURL] = useState(()=>{
    if(location.state){
      console.log(location.state.imgURL);
      return location.state.imgURL
    }
  })
  // const navigate = useNavigate()

  // location.state.url
  // nav('xxx', {state: {url: imgURL}})

    useEffect(() => {
        const image = document.getElementById('image')
        const cropper = new Cropper(image,{
        aspectRatio:1/1,
        viewMode:1,
        dragMode:2,
        cropBoxMovable:true,
        cropBoxResizable:false,
        zoomOnWheel:true,
        zoomOnTouch:true,
        //preview:document.querySelectorAll('#preview'),
        crop(event){
          // console.log(event.detail.x);
          // console.log(event.detail.y);
          // console.log(event.detail.width);
          // console.log(event.detail.height);
          // console.log(event.detail.rotate);
          // console.log(event.detail.scaleX);
          // console.log(event.detail.scaleY);
        },
      })
      setCrop(cropper)
    },[])
    
  const reupload = (e)=>{
    const files = e.target.files
    const file = files[0]
    const imgURL = URL.createObjectURL(file)
    setImgURL(imgURL)
    crop.replace(imgURL,false)
  }

  const clip = ()=>{
    const imgURL = crop.getCroppedCanvas().toDataURL()
    setImgURL(imgURL)
    navigate('/home',{state:{imgURL:imgURL}})
  }

  return (
    <div className='box'>
      <div className='container'>
        <img id='image' src={imgURL}/>
      </div>
      <div className='btn'>
        <input className='reupload' onChange={(e)=>reupload(e)} type='file' id='reupload' accept='/image*'/>
        <label htmlFor="reupload">重新选择</label>
        <button className='cut' onClick={clip} >确定</button>
      </div>
    </div>

  )

}