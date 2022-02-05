import {useCallback, useEffect, useRef, useState} from "react";

const C_IMAGE = 'image';
const C_FACE = 'face';
const staticWidth = 500;
const staticHeight = 500;

const DetectedFaceDetail = (props) => {
    const canvas = useRef();
    const post = props.post;
    const [cursorIsOnThePicture, setCursorIsOnThePicture] = useState(C_IMAGE);
    const [widthRatio, setWidthRatio] = useState(0);
    const [heightRatio, setHeightRatio] = useState(0);

    const getContext = () => {
        return canvas.current.getContext('2d');
    }

    const getSizeOfFace =(face) => {
        return {
            left: face.left * widthRatio,
            top: face.top * heightRatio,
            width: face.width * widthRatio,
            height: face.height * heightRatio
        }
    };

    const drawImage = useCallback(() => {
        const ctx = getContext();
        const image = new Image();
        image.onload = () => {
            setWidthRatio(staticWidth / image.naturalWidth);
            setHeightRatio(staticHeight / image.naturalHeight);
            ctx.drawImage(image, 0, 0, staticWidth, staticHeight);
        };
        image.src = post.post_picture;
    }, [post]);

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

    const mouseMoveHandler = (e) => {
        const face = cursorIsOnTheFace(e)
        if (face && cursorIsOnThePicture === C_IMAGE) {
            console.log("FACE " + face.id)
            const ctx = getContext();
            const faceSize = getSizeOfFace(face);
            ctx.fillStyle = "#ff0000";
            ctx.font = '16px arial';
            ctx.fillStyle = "#ffffff";
            let tagNameOfFace = face.tag_name;
            if (!tagNameOfFace) {
                ctx.fillStyle = "#ff0000";
                tagNameOfFace = 'Unrecognized!'
            }

            ctx.fillText(tagNameOfFace, faceSize.left, faceSize.top);
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
                    onMouseMove={(e) => mouseMoveHandler(e)}
            />
        </>
    );
}

export default DetectedFaceDetail;