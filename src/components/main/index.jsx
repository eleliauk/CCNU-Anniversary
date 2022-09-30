import React, { useRef, useState , useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router';

import './index.css';
import background from '../../images/background.jpg';
import jiahao from '../../images/jiahao.png';
import one from '../../images/one.png';
import two from '../../images/two.png';
import three from '../../images/three.png';
import four from '../../images/four.png';
import five from '../../images/five.png';
import six from '../../images/six.png';
import eight from '../../images/eight.png';
import nine from '../../images/nine.png';


const Main =()=>{

    const [isMobile,setIsMobile] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const [imgURL,setImgURL] = useState(location.state
        ?location.state.imgURL:'')
    const [id, setId] = useState('')
    const [kuang, setKuang] = useState(localStorage.getItem('kuang')?localStorage.getItem('kuang'):'')
    const [context, setContext] = useState('')
    const downloadRef = useRef()

    useEffect(() => {
        let info = navigator.userAgent;
        let isPhone = /mobile/i.test(info);
        if(isPhone){
            setIsMobile(true)
        }else{
            setIsMobile(false)
            alert('请使用手机打开以获得更好的体验')
        }
        return () => {
          localStorage.clear()
        }
      },[])

    const uploadImg = (e)=>{
        const files = e.target.files
        const file = files[0]
        const imgURL = URL.createObjectURL(file)
        setImgURL(imgURL)
        navigate('/editImage',{state:{imgURL:imgURL}})
    }

   
    const chooseOutimg = (e) =>{
        // document.getElementsByTagName("img")[0].setAttribute('id', "id_img2")
        setId(e.target.id)
        setKuang(e.target.src)
        localStorage.setItem('kuang',kuang)
    }

    function drawCanvasImage() {
        let width = 500
        let height = 500
        downloadRef.current.width = width
        downloadRef.current.height = height
        let myimage = new Image()
        myimage.src = imgURL
        let background = new Image()
        background.src = kuang
        if(downloadRef.current.getContext){
            let ctx = downloadRef.current.getContext('2d')
            myimage.onload = function(){
                ctx.drawImage(myimage,0,0,width,height)
                background.onload = function() {
                    ctx.drawImage(background,0,0,width,height)
                    let url = downloadRef.current.toDataURL();
                    let a = document.createElement("a"); // 生成一个a元素
                    let event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "avatar"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                }

            }
        }

 
    }

    return (
        isMobile?
        <div className="body">
            <div className='photo'>
                <img src={background} alt="" className="background"></img>
                <div className="zhuangshi"></div>
            </div>
            <div className="content">
                <canvas ref={downloadRef} id='canvas'></canvas>
                <label className="hidden" htmlFor="id-uploadimg">
                    {kuang?<img id="id_img2" src={`${kuang}`} alt="" className="img_hidden"></img>: ""}
                </label>
                <label className="upload" htmlFor="id-uploadimg">
                   <input type='file' id='id-uploadimg' className='uploadimg' onChange={(e)=>uploadImg(e)} accept='/image*'/>
                     {imgURL?<img className='the-img' src={imgURL} />:<label className="upload_button" htmlFor='id-uploadimg'  ><img src={jiahao} className='uploadlogo'></img></label>}
                </label>
                {/* <input type="file" onTouchStart={chooseImg} accept='/image*'/> */}
                <div className="tip_text">请选择你的个性头像框</div>
                <div className="choices">
                <div className="box1">
                    <div className="box2">
                        <div className="box3">
                            <img id='img1' className='txkuang' src={one} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">桂花枝头</div>
                    </div>
                    <div className="box2">
                        <div className="box3">
                            <img id='img2' className='txkuang' src={two} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">桂花朵朵</div>
                    </div>
                    <div className="box2">
                        <div className="box3">
                            <img id='img3' className='txkuang' src={three} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">桂花茶饮</div>
                    </div>
                </div>
                <div className="box1">
                    <div className="box2">
                        <div className="box3">
                            <img id='img4' className='txkuang' src={four} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">祥云贺庆</div>
                    </div>
                    <div className="box2">
                        <div className="box3">
                            <img id='img9' className='txkuang' src={nine} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">119校庆红</div>
                    </div>
                    <div className="box2">
                        <div className="box3">
                            <img id='img8' className='txkuang' src={eight} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">华师红心</div>
                    </div>
                </div>
                <div className="box1">
                    <div className="box2">
                        <div className="box3">
                            <img id='img5' className='txkuang' src={five} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">桂花小诗</div>
                    </div>
                    <div className="box2">
                        <div className="box3">
                            <img id='img6' className='txkuang' src={six} alt='' onClick={chooseOutimg}></img>
                        </div>
                        <div className="p">镂空华师绿</div>
                    </div>
                </div>
            </div>
        </div>
            <div className="bottom">
                <div id="btn" className="bot_button1" onClick={drawCanvasImage}>立即生成</div>
                <label id="btn" className="bot_button2" htmlFor='id-uploadimg' onClick={uploadImg}>重新选择</label>
            </div>
        </div>:null
    )
}

export default Main;














// import React, { useRef, useState ,useEffect} from 'react';
// import './index.css';
// import background from '../../images/background.jpg';
// import jiahao from '../../images/jiahao.png'





// const Main =()=>{
//     const navigate = useNavigate()
//     const [imgURL,setImgURL] = useState('')
//     const [img,setImg] = useState('')

   
//     return (
//         <div className="body">
//             <div className='photo'>
//                 <img src={background} alt="" className="background"></img>
//                 <div className="zhuangshi"></div>
//             </div>
//             <div className="content">
                

//                 <div className="tip_text">请选择你的个性头像框</div>
//                 <div className="choices">
//                     <div className="box1">
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                     </div>
//                     <div className="box1">
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                     </div>
//                     <div className="box1">
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                     </div>
//                     <div className="box1">
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                     </div>
//                     <div className="box1">
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                         <div className="box2">
//                             <div className="box3"></div>
//                             <div className="p">头像框</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bottom">
//                 <div className="bot_button" >立即生成</div>
//             </div>
//         </div>
//     )
// }

// export default Main;



