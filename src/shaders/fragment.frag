/*
    片元着色器 ： 绘制颜色或者纹理的 —— 水彩的作用
*/
precision mediump float;
varying vec4 v_color; // 接收顶点着色器传递的颜色数据
void main() {
    gl_FragColor = vec4(0, 0, 0, v_color);
}
// 这里的 gl_FragColor 是一个内置变量，用于设置片元的颜色
// vec4(0, 0, 0, 1) 表示黑色，最后一个参数是透明度（1表示不透明）
// 这个片元着色器会将所有片元的颜色设置为黑色

// 你可以根据需要修改颜色值，例如：
// gl_FragColor = vec4(1, 0, 0, 1); // 红色
// gl_FragColor = vec4(0, 1, 0, 1); // 绿色
// gl_FragColor = vec4(0, 0, 1, 1); // 蓝色

// 你也可以使用纹理来替代颜色，例如：
// gl_FragColor = texture2D(sampler, uv); // 使用纹理采样
// 注意：在 WebGL 中，片元着色器的输出颜色必须是 vec4 类型

// 你可以在片元着色器中添加更多的逻辑来实现不同的效果，例如：
// 计算光照、添加阴影、实现渐变等效果
// 片元着色器的主要作用是为每个片元（像素）计算颜色值

// 你可以在片元着色器中使用 uniform 变量来传递外部数据，例如：
// uniform vec3 lightColor; // 光源颜色
// uniform vec3 lightPosition; // 光源位置
// uniform sampler2D textureSampler; // 纹理采样器

// 你可以在片元着色器中使用 varying 变量来接收顶点着色器传递的数据，例如：
// varying vec2 uv; // UV 坐标

// varying vec3 normal; // 法线向量
// 片元着色器可以使用条件语句、循环等控制结构来实现更复杂的效果，例如：
// if (uv.x < 0.5) {
//     gl_FragColor = vec4(1, 0, 0, 1); // 左半边红色
// } else {
//     gl_FragColor = vec4(0, 0, 1, 1); // 右半边蓝色
// }

// 片元着色器可以使用内置函数来实现一些常见的效果，例如：
// gl_FragColor = vec4(mix(vec3(1, 0, 0), vec3(0, 0, 1), uv.x), 1); // 渐变效果

// 片元着色器可以使用数学函数来实现一些效果，例如：
// gl_FragColor = vec4(sin(uv.x * 3.14), cos(uv.y * 3.14), 0, 1); // 正弦余弦效果

// 片元着色器可以使用纹理坐标来实现纹理映射效果，例如：
// gl_FragColor = texture2D(textureSampler, uv); // 使用纹理采样器获取颜色

// 片元着色器可以使用颜色混合来实现透明效果，例如：
// gl_FragColor = vec4(1, 0, 0, 0.5); // 半透明红色

// 片元着色器可以使用光照模型来实现光照效果，例如：
// vec3 lightDir = normalize(lightPosition - fragPosition);
// float diff = max(dot(normal, lightDir), 0.0); // 漫反射分量
// gl_FragColor = vec4(diff * lightColor, 1); // 漫反射光照效果

// 片元着色器可以使用阴影贴图来实现阴影效果，例如：
// float shadow = texture2D(shadowMap, shadowCoord).r; // 获取阴影贴图的深度值
// gl_FragColor = vec4(shadow * lightColor, 1); // 应用阴影效果

// 片元着色器可以使用环境光照来实现环境光效果，例如：
// vec3 ambient = 0.1 * lightColor; // 环境光照分量
// gl_FragColor = vec4(ambient, 1); // 环境光照效果

// 片元着色器可以使用高光反射来实现高光效果，例如：
// vec3 viewDir = normalize(viewPosition - fragPosition);
// vec3 reflectDir = reflect(-lightDir, normal); // 反射方向
// float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess); // 高光分量
// gl_FragColor = vec4(spec * lightColor, 1); // 高光反射效果

// 片元着色器可以使用多重纹理来实现复杂的纹理效果，例如：
// vec4 baseColor = texture2D(baseTexture, uv);
// vec4 detailColor = texture2D(detailTexture, uv * detailScale);
// gl_FragColor = baseColor * detailColor; // 纹理混合效果

// 片元着色器可以使用后处理效果来实现特效，例如：
// gl_FragColor = vec4(uv, 0.0, 1.0); // UV 坐标作为颜色输出

// 片元着色器可以使用噪声函数来实现噪声效果，例如：
// float noiseValue = noise(uv * scale);
// gl_FragColor = vec4(noiseValue, noiseValue, noiseValue, 1); // 灰度噪声效果

// 片元着色器可以使用颜色空间转换来实现颜色效果，例如：
// vec3 rgb = vec3(uv, 0.0); // RGB 颜色空间
// vec3 hsv = rgbToHsv(rgb); // RGB 转 HSV
// vec3 rgbConverted = hsvToRgb(hsv); // HSV 转 RGB
// gl_FragColor = vec4(rgbConverted, 1); // 输出转换后的颜色

// 片元着色器可以使用自定义函数来实现特定效果，例如：
// vec4 customEffect(vec2 uv) {
//     // 自定义效果逻辑
//     return vec4(uv, 0.0, 1.0); // 示例：将 UV 坐标作为颜色输出
// }
// gl_FragColor = customEffect(uv); // 调用自定义函数获取颜色

// 片元着色器可以使用多重采样来实现抗锯齿效果，例如：
// vec4 color = vec4(0.0);
// for (int i = 0; i < samples; i++) {
//     vec2 offset = getSampleOffset(i); // 获取采样偏移
//     color += texture2D(textureSampler, uv + offset) / float(samples); // 累加采样颜色
// }
// gl_FragColor = color; // 输出平均颜色

// 片元着色器可以使用屏幕空间效果来实现特效，例如：
// vec2 screenUV = gl_FragCoord.xy / resolution; // 将片元坐标转换为屏幕空间 UV
// gl_FragColor = vec4(screenUV, 0.0, 1.0); // 输出屏幕空间 UV 作为颜色

// 片元着色器可以使用时间变量来实现动态效果，例如：
// float time = u_time; // 获取时间变量
// vec2 animatedUV = uv + vec2(sin(time), cos(time)) * 0.1; // 动态 UV 坐标
// gl_FragColor = texture2D(textureSampler, animatedUV); // 使用动态 UV 采样纹理

// 片元着色器可以使用颜色渐变来实现渐变效果，例如：
// vec3 color1 = vec3(1, 0, 0); // 红色
// vec3 color2 = vec3(0, 0, 1); // 蓝色
// float gradient = uv.x; // 使用 UV 坐标作为渐变因子
// vec3 gradientColor = mix(color1, color2, gradient); // 线性插值计算渐变颜色
// gl_FragColor = vec4(gradientColor, 1); // 输出渐变颜色

// 片元着色器可以使用噪声纹理来实现噪声效果，例如：
// vec2 noiseUV = uv * noiseScale; // 缩放 UV 坐标
// float noiseValue = texture2D(noiseTexture, noiseUV).r; // 从噪声纹理获取噪声值
// gl_FragColor = vec4(vec3(noiseValue), 1); // 输出噪声值作为颜色

// 片元着色器可以使用颜色映射来实现特效，例如：
// vec3 color = vec3(uv, 0.0); // 使用 UV 坐标作为颜色
// vec3 mappedColor = colorMapping(color); // 应用颜色映射函数
// gl_FragColor = vec4(mappedColor, 1); // 输出映射后的颜色
