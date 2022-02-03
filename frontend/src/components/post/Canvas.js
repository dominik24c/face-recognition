import {useCallback, useEffect, useRef, useState} from "react";
import TagNameForm from "./TagNameForm";

const C_IMAGE = 'image';
const C_FACE = 'face';

const Canvas = (props) => {
    const canvas = useRef();
    const post = props.post;
    const [recognizedFace, setRecognizedFace] = useState(null);
    const [cursorIsOnThePicture, setCursorIsOnThePicture] = useState(C_IMAGE);

    const getContext = () => {
        return canvas.current.getContext('2d');
    }

    const drawImage = useCallback(() => {
        const ctx = getContext();
        const image = new Image();
        // console.log(post.recognized_faces);
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
            post.recognized_faces.forEach((face) => {
                ctx.beginPath();
                ctx.lineWidth = "4";
                ctx.strokeStyle = "red";
                ctx.rect(face.left, face.top, face.width, face.height);
                ctx.stroke();
            })
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
        return post.recognized_faces.find(face =>
            face.left <= currentPosition.x && currentPosition.x <= face.left + face.width &&
            face.top <= currentPosition.y && currentPosition.y <= face.top + face.height
        )
    }
    const clickHandler = (e) => {
        setRecognizedFace(cursorIsOnTheFace(e));
    }

    const mouseMoveHandler = (e) => {
        const face = cursorIsOnTheFace(e)
        if (face && cursorIsOnThePicture === C_IMAGE) {
            const ctx = getContext();
            ctx.rect(face.left, face.top, face.width, face.height);
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fill();
            setCursorIsOnThePicture(C_FACE);
            e.target.style.cursor = 'pointer';
        } else if (!face && cursorIsOnThePicture === C_FACE) {
            drawImage();
            setCursorIsOnThePicture(C_IMAGE);
            e.target.style.cursor = 'auto';
        }
    }

    return (
        <>
            <canvas id="img" width="500" height="500" ref={canvas}
                    onClick={(e) => clickHandler(e)}
                    onMouseMove={(e) => mouseMoveHandler(e)}
            />
            {recognizedFace && <TagNameForm tagName={recognizedFace.tag_name} />}

        </>

    );
}

export default Canvas;