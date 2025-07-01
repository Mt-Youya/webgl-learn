/*
 顶点着色器
*/
attribute vec4 a_position;
attribute vec4 a_color;
// uniform vec4 u_Translate;
// uniform float Tx, Ty, Tz;
varying vec4 v_color;
void main() {
    float x = a_position.x;
    float y = a_position.y;
    gl_Position =  vec4(x, y, 0, 1);
    gl_PointSize = 10.0;// 设置点的大小
    v_color = a_color;// 将颜色传递给片段着色器
}
