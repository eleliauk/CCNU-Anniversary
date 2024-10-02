import Cropper from 'cropperjs';
import './index.css'
import './cropper.css'
import { useEffect, useRef } from 'react';

export default function Cutt(props) {
  const {setIsEdit, imgURL, setImgURL} = props
  const cropperRef = useRef(null);
  const cropperInstance = useRef(null);

    useEffect(() => {
      if (cropperRef.current && imgURL) {
        console.log('imgURL', imgURL);
        cropperInstance.current = new Cropper(cropperRef.current, {
          aspectRatio: 1 / 1,
          viewMode: 1,
          dragMode: 2,
          cropBoxMovable: true,
          cropBoxResizable: false,
          zoomOnWheel: true,
          zoomOnTouch: true,
        })}

      return () => {
        if (cropperInstance.current) {
          cropperInstance.current.destroy(); // 清理
        }
    };
    },[imgURL])

    const reupload = (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        const file = files[0];
        const newImgURL = URL.createObjectURL(file);
        setImgURL(newImgURL);
        cropperInstance.current.replace(newImgURL); // 使用cropper实例替换图像
      }
    };

    const clip = () => {
      if (cropperInstance.current) {
        const croppedCanvas = cropperInstance.current.getCroppedCanvas();
        const croppedImgURL = croppedCanvas.toDataURL();
        setImgURL(croppedImgURL);
        setIsEdit(false);
      }
    };

  return (
    <div className='box'>
      <div className='container'>
        <img ref={cropperRef} id='image' src={imgURL} alt='Avatar'/>
      </div>
      <div className='btn'>
        <input className='reupload' onChange={(e)=>reupload(e)} type='file' id='reupload' accept='image/*'/>
        <label htmlFor="reupload">重新选择</label>
        <button className='cut' onClick={clip} >确定</button>
      </div>
    </div>

  )

}