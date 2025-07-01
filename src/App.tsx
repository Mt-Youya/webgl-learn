import React, { useLayoutEffect, useRef, useState, } from 'react'
import vertexShaderSource from "./shaders/vertex.vert?raw"
import fragmentShaderSource from "./shaders/fragment.frag?raw"
import { positionConvert, randomColor } from "./features/webgl-utils.ts";

function App() {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [gl, setGL] = useState<WebGLRenderingContext>()

    function createShader(type: number, source: string) {
        const shader = gl?.createShader(type);
        if (!shader) {
            throw new Error('Unable to create shader');
        }
        gl?.shaderSource(shader, source);
        gl?.compileShader(shader);
        const success = gl?.getShaderParameter(shader, gl?.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        const info = gl?.getShaderInfoLog(shader);
        gl?.deleteShader(shader);
        throw new Error(`Error compiling shader: ${info}`);
    }


    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl?.createProgram()!
        gl?.attachShader(program, vertexShader)
        gl?.attachShader(program, fragmentShader)
        gl?.linkProgram(program)
        if (!gl?.getProgramParameter(program, gl?.LINK_STATUS)) {
            throw new Error(gl?.getProgramInfoLog(program)!)
        }
        return program
    }


    function drawPoint(first = 0, count = 1) {
        gl?.drawArrays(gl?.POINTS, first, count);
    }

    const programRef = useRef<WebGLProgram>(null);
    useLayoutEffect(() => {
        if (!gl) {
            return setGL(canvasRef.current?.getContext('webgl')!)
        }
        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
        const program = createProgram(vertexShader, fragmentShader)!
        programRef.current = program
        gl.useProgram(program)
        gl.clearColor(0.0, 0.0, 1, .5)
        gl.clear(gl.COLOR_BUFFER_BIT)
    }, [gl]);


    const pointsRef = useRef<Point[]>([])

    function vertexBuffer(points: Point[], a_position: GLuint) {
        const positionBuffer = gl?.createBuffer();
        gl?.bindBuffer(gl?.ARRAY_BUFFER, positionBuffer);
        gl?.bufferData(gl?.ARRAY_BUFFER, new Float32Array(points), gl?.STATIC_DRAW);
        gl?.enableVertexAttribArray(a_position);
        gl?.vertexAttribPointer(a_position, 2, gl?.FLOAT, false, 0, 0);
    }

    function colorBuffer(colors: number[], a_color: GLuint) {
        const colorBuffer = gl?.createBuffer();
        gl?.bindBuffer(gl?.ARRAY_BUFFER, colorBuffer);
        gl?.bufferData(gl?.ARRAY_BUFFER, new Float32Array(colors), gl?.STATIC_DRAW);
        gl?.enableVertexAttribArray(a_color);
        gl?.vertexAttribPointer(a_color, 4, gl?.FLOAT, false, 0, 0);
    }

    function handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
        if (!gl) return;
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.clearColor(0, 0, .5, .2);
        const canvas = canvasRef.current!
        const width = canvas.width
        const height = canvas.height
        const color = randomColor()
        const { x, y } = positionConvert(event.nativeEvent.offsetX, event.nativeEvent.offsetY, width, height)
        pointsRef.current.push({ x, y, color })

        const program = programRef.current!

        const points = pointsRef.current.map(point => [point.x, point.y]).flat();
        const colors = pointsRef.current.map(point => [
            point.color.r, point.color.g, point.color.b, point.color.a ?? 1
        ]).flat();

        const a_position = gl.getAttribLocation(program, 'a_position');
        const a_color = gl.getAttribLocation(program, 'a_color');

        vertexBuffer(points, a_position)
        colorBuffer(colors, a_color)
        drawPoint(0, pointsRef.current.length)
    }


    return (
        <>
            <canvas ref={canvasRef} width={500} height={500} onMouseDown={handleClick}>
                Your browser does not support WebGL.
            </canvas>
        </>
    )
}

export default App
