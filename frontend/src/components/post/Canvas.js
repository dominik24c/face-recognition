import {useCallback, useEffect, useRef, useState} from "react";
import TagNameForm from "./TagNameForm";

const C_IMAGE = 'image';
const C_FACE = 'face';
const staticWidth = 500;
const staticHeight = 500;

const Canvas = (props) => {
    const canvas = useRef();
    const post = props.post;
    const [recognizedFace, setRecognizedFace] = useState(null);
    const [cursorIsOnThePicture, setCursorIsOnThePicture] = useState(C_IMAGE);
    const [widthRatio, setWidthRatio] = useState(0);
    const [heightRatio, setHeightRatio] = useState(0);

    const getContext = () => {
        return canvas.current.getContext('2d');
    }

    const getSizeOfFace = useCallback((face) => {
        return {
            left: face.left * widthRatio,
            top: face.top * heightRatio,
            width: face.width * widthRatio,
            height: face.height * heightRatio
        }
    }, [heightRatio, widthRatio]);

    const drawImage = useCallback(() => {
        const ctx = getContext();
        const image = new Image();
        image.onload = () => {
            setWidthRatio(staticWidth / image.naturalWidth);
            setHeightRatio(staticHeight / image.naturalHeight);
            ctx.drawImage(image, 0, 0, staticWidth, staticHeight);
            post.recognized_faces.forEach((face) => {
                ctx.beginPath();
                ctx.lineWidth = "4";
                ctx.strokeStyle = "red";
                const faceSize = getSizeOfFace(face);
                ctx.rect(faceSize.left, faceSize.top, faceSize.width, faceSize.height);
                ctx.stroke();
                ctx.closePath();
            })
        };
        image.src = post.post_picture;
    }, [post, getSizeOfFace]);

    useEffect(() => {
        drawImage();
    }, [drawImage])

    const getCursorPosition = (event, canvas) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return {x, y}
    }

    const cursorIsOnTheFace = (e) => {
        const currentPosition = getCursorPosition(e, canvas.current);
        const face = post.recognized_faces.find(face => {
                const faceSize = getSizeOfFace(face);
                return faceSize.left <= currentPosition.x && currentPosition.x <= faceSize.left + faceSize.width &&
                    faceSize.top <= currentPosition.y && currentPosition.y <= faceSize.top + faceSize.height
            }
        )
        if (face) {
            return {...face}
        }
        return face;
    }

    const clickHandler = (e) => {
        setRecognizedFace(cursorIsOnTheFace(e));
    }

    const mouseMoveHandler = (e) => {
        const face = cursorIsOnTheFace(e)
        if (face && cursorIsOnThePicture === C_IMAGE) {
            e.stopPropagation();
            const ctx = getContext();
            const faceSize = getSizeOfFace(face);
            console.log("FACE " + face.id)
            ctx.beginPath();
            ctx.rect(faceSize.left, faceSize.top, faceSize.width, faceSize.height);
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fill();
            ctx.closePath();
            e.target.style.cursor = 'pointer';
            setCursorIsOnThePicture(C_FACE);
        } else if (!face && cursorIsOnThePicture === C_FACE) {
            drawImage();
            e.target.style.cursor = 'auto';
            setCursorIsOnThePicture(C_IMAGE);
        }
    }

    return (
        <>
            <canvas id="img" width="500" height="500" ref={canvas}
                    onClick={(e) => clickHandler(e)}
                    onMouseMove={(e) => mouseMoveHandler(e)}
            />
            {recognizedFace && <TagNameForm id={recognizedFace.id} tagName={recognizedFace.tag_name}/>}
        </>
    );
}

export default Canvas;