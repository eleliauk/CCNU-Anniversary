import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './index.css';
import Cutt from '../cutavatar';
import Upload from '../../images/jiahao.png'
const Main = () => {
    const [isMobile, setIsMobile] = useState(false);
    // const navigate = useNavigate();
    const location = useLocation();
    const [imgURL, setImgURL] = useState(location.state ? location.state.imgURL : '');
    const [id, setId] = useState('');
    const [kuang, setKuang] = useState(localStorage.getItem('kuang') ? localStorage.getItem('kuang') : '');
    const [downloadURL, setDownloadURL] = useState('');
    const [isDownload, setIsDownload] = useState(false);
    const [isChoose, setIsChoose] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [isTip, setIsTip] = useState(false);
    const downloadRef = useRef();

    useEffect(() => {
        let info = navigator.userAgent;
        let isPhone = /mobile/i.test(info);
        if (isPhone) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
            alert('请使用手机打开以获得更好的体验');
        }
    }, []);

    const uploadImg = (e) => {
        const files = e.target.files;
        const file = files[0];
        const imgURL = URL.createObjectURL(file);
        setImgURL(imgURL);
        setIsChoose(true);
        setIsEdit(true);
        console.log("isedit",isEdit);
    };

    const chooseOutimg = (e) => {
        setId(e.target.id);
        setKuang(e.target.src);
        setIsChoose(true);
        localStorage.setItem('kuang', e.target.src);
    };

    function drawCanvasImage() {
        let width = 500;
        let height = 500;
        downloadRef.current.width = width;
        downloadRef.current.height = height;
        let myimage = new Image();
        if (!imgURL) {
            alert('请选择图片');
            return;
        }
        myimage.src = imgURL;
        let background = new Image();
        if (!kuang) {
            alert('请选择头像框');
            return;
        }
        background.setAttribute("crossOrigin", 'Anonymous');
        background.src = kuang;
        if (downloadRef.current.getContext) {
            let ctx = downloadRef.current.getContext('2d');
            myimage.onload = function () {
                ctx.drawImage(myimage, 0, 0, width, height);
                background.onload = function () {
                    ctx.drawImage(background, 0, 0, width, height);
                    downloadImage();
                };
            };
        }
    }

    const downloadImage = ()=>{
        if(window.innerWidth < 1000 ) {
            const url = downloadRef.current.toDataURL()
            setDownloadURL(url)
            setIsDownload(true)
            setIsTip(true)
            setTimeout(() => {
                setIsTip(false);
              }, 3000);
            setIsChoose(false)
        } else {
            const url = downloadRef.current.toDataURL();
            const a = document.createElement("a"); // 生成一个a元素
            const event = new MouseEvent("click"); // 创建一个单击事件
            a.download = name || "avatar"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
        }
    }

    return (
        isEdit ? <Cutt imgURL={imgURL} setImgURL={setImgURL} kuang={kuang} setKuang={setKuang} setIsEdit={setIsEdit}/> :
        (
            isMobile ?
            <div className="body">
                <div className='photo'>
                    <img src='https://mini-project.muxixyz.com/WechatIMG11.jpg' alt="" className="background"></img>
                    <div className="zhuangshi"></div>
                </div>
                <div className="content">
                    <canvas ref={downloadRef} id='canvas'></canvas>
                    {isDownload && (!isChoose) ?
                        <label className='wrapDownloadURL'><img src={downloadURL} className="downloadURL" /></label>
                        :
                        <label className="hidden" htmlFor="id-uploadimg">
                            {kuang ? <img id="id_img2" src={kuang} alt="" className="img_hidden"></img> : ""}
                        </label>}
                    <label className="upload" htmlFor="id-uploadimg">
                        <input type='file' id='id-uploadimg' className='uploadimg' onChange={(e) => uploadImg(e)} accept='image/*' />
                        {imgURL ? <img className='the-img' src={imgURL} /> :
                            <label className="upload_button" htmlFor='id-uploadimg'>
                                <img src={Upload} className='uploadlogo'></img>
                            </label>}
                    </label>
                    <div className="tip_text">请选择你的个性头像框</div>
                    {isTip&&<div className='Message'>
                        <p>长按保存头像哦~</p>
                    </div>}
                    <div className="choices">
                        <div className="box1">
                            <div className="box2">
                                <div className="box3">
                                    <img id='img1' className='txkuang' src="https://mini-project.muxixyz.com/1.png" alt='' onClick={chooseOutimg}></img>
                                </div>
                            </div>
                            {/* <div className="box2">
                                <div className="box3">
                                    <img id='img2' className='txkuang' src='https://ossfresh-test.muxixyz.com/ccnuRed.png' alt='' onClick={chooseOutimg}></img>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div id="btn" className="bot_button1" onClick={drawCanvasImage}>立即生成</div>
                    <label id="btn" className="bot_button2" htmlFor='id-uploadimg' onClick={uploadImg}>重新选择</label>
                </div>
            </div> : null
        )
    );
};

export default Main;
