import React, { useState, useRef, useEffect } from "react";
import './whiteboard.css';
import whiteBoardIcon from './whiteBoardIcon.svg';
import expandIcon from './expand.svg';
import shrinkIcon from './shrink.svg';
import penIcon from './pen.svg'; 
import clearIcon from './clear.svg';

const WhiteBoard = () => {
    const [isScreenExpanded, setIsScreenExpanded] = useState(true);
    const [tool, setTool] = useState('pen');
    const [zoomLevel] = useState(1);
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);

    const handleScreenExpand = () => {
        setIsScreenExpanded(!isScreenExpanded);
    };

    const handleToolChange = (newTool) => {
        setTool(newTool);
    };

   

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.lineCap = 'round';

        const startDrawing = (e) => {
            isDrawing.current = true;
            [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
        };

        const draw = (e) => {
            if (!isDrawing.current) return;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(lastX.current, lastY.current);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
        };

        const stopDrawing = () => {
            isDrawing.current = false;
        };

        const handleMouseDown = (e) => {
            if (tool === 'pen' || tool === 'eraser') {
                startDrawing(e);
            }
        };

        const handleMouseMove = (e) => {
            if (tool === 'pen' || tool === 'eraser') {
                draw(e);
            }
        };

        const handleMouseUp = () => {
            if (tool === 'pen' || tool === 'eraser') {
                stopDrawing();
            }
        };

        const handleMouseOut = () => {
            if (tool === 'pen' || tool === 'eraser') {
                stopDrawing();
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseout', handleMouseOut);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseout', handleMouseOut);
        };
    }, [tool]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.scale(zoomLevel, zoomLevel);
    }, [zoomLevel]);

    return (
        <div className={`whiteBoardDiv ${isScreenExpanded ? 'expanded' : ''}`}>
            <div className="whiteBoardNav">
                <div className="whiteBoardNavLeft">
                    <img src={whiteBoardIcon} alt="Whiteboard Icon" className="whiteBoardIcon" />
                    <h1 className="whiteBoardTitle">White Board (Presenting)</h1>
                </div>
                <div className="whiteBoardNavRight">
                    <div className="toolBar">
                        <button className="toolButton" onClick={() => handleToolChange('pen')}>
                            <img src={penIcon} alt="Pen Icon" className="toolIcon" /> Pen
                        </button>
                        <button className="toolButton" onClick={handleClear}>
                            <img src={clearIcon} alt="Clear Icon" className="toolIcon" /> Clear All
                        </button>
                        
                    </div>
                    <button
                        className={`expand ${isScreenExpanded ? 'expand-on' : 'expand-off'}`}
                        onClick={handleScreenExpand}
                    >
                        {isScreenExpanded ? (
                            <img src={shrinkIcon} alt="Shrink Screen" className="expandBtn" />
                        ) : (
                            <img src={expandIcon} alt="Expand Screen" className="expandBtn" />
                        )}
                    </button>
                </div>
            </div>
            <div className="whiteScreenBody">
                <canvas ref={canvasRef} className="whiteboardCanvas"></canvas>
            </div>
        </div>
    );
};

export default WhiteBoard;
