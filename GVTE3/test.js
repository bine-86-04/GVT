// /**
//  * Created by Selzer on 07.05.2017.
//  */
// var gl;
// var triangleVertexPositionBuffer;
// var squareVertexPositionBuffer;
// var shaderProgram;
//
// function webGLStart() {
//
//     // Get the WebGL context
//     var canvas = document.getElementById('canvas');
// //        var gl = canvas.getContext('experimental-webgl');
//
//
// //        var canvas = document.getElementById("lesson01-canvas");
//     initGL(canvas);
//     initShaders();
//     initBuffers();
//
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.enable(gl.DEPTH_TEST);
//
//     drawScene();
//
//
//
//
//
//
//     function initGL(canvas) {
//         try {
//             gl = canvas.getContext("experimental-webgl");
//             gl.viewportWidth = canvas.width;
//             gl.viewportHeight = canvas.height;
//         } catch(e) {
//         }
//         if (!gl) {
//             alert("Could not initialise WebGL, sorry :-( ");
//         }
//     }
//
//
//     function initBuffers() {
//         triangleVertexPositionBuffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//         var vertices = [
//             0.0, 1.0, 0.0,
//             -1.0, -1.0, 0.0,
//             1.0, -1.0, 0.0
//         ];
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//         triangleVertexPositionBuffer.itemSize = 3;
//         triangleVertexPositionBuffer.numItems = 3;
//
//         squareVertexPositionBuffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
//         vertices = [
//             1.0,  1.0,  0.0,
//             -1.0,  1.0,  0.0,
//             1.0, -1.0,  0.0,
//             -1.0, -1.0,  0.0
//         ];
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//         squareVertexPositionBuffer.itemSize = 3;
//         squareVertexPositionBuffer.numItems = 4;
//
//     }
//
//     function initShaders() {
//         var fragmentShader = getShader(gl, "fragment");
//         var vertexShader = getShader(gl, "vertex");
//
//         shaderProgram = gl.createProgram();
//         gl.attachShader(shaderProgram, vertexShader);
//         gl.attachShader(shaderProgram, fragmentShader);
//         gl.linkProgram(shaderProgram);
//
//         if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//             alert("Could not initialise shaders");
//         }
//
//         gl.useProgram(shaderProgram);
//         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
//         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
//
//         shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
//         shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
//
//
//     }
//
//     function getShader(gl, type) {
//         var strVertexSource  =''+  'attribute vec3 pos;'+
//             'attribute vec4 col;'+
//             'varying vec4 color;'+
//             'void main(){'+
//             'color = col;'+
//             'gl_Position = vec4(pos-0.99+0.99, 1);'+
//             'gl_PointSize = 2.0;'+
//             '}';
//         var strFragmentSource =  'precision mediump float;'+
//             'varying vec4 color;'+'void main() { gl_FragColor = color; }';;
//         var str ="";
//
//         var shader;
//         if (type == "fragment") {
//             shader = gl.createShader(gl.FRAGMENT_SHADER);
//             str = strVertexSource;
//
//         } else if (type == "vertex") {
//             shader = gl.createShader(gl.VERTEX_SHADER);
//             str = strFragmentSource;
//         } else {
//             return null;
//         }
//
//         gl.shaderSource(shader, str);
//         gl.compileShader(shader);
//
//     //        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     //            alert(gl.getShaderInfoLog(shader));
//     //            return null;
//     //        }
//
//         return shader;
//     }
//
//
//     function drawScene() {
//     //        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
//
//         gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
//         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
//
//         gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
//
//
//         gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
//         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
//
//         gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
//
//     }
// }