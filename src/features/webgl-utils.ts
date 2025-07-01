export function randomColor(alpha = 1): Color {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
        a: Math.random() * (1 - alpha) + alpha   // Ensure alpha is between 0.5 and 1,
    }
}

export function positionConvert(x: number, y: number, width: number, height: number) {
    const xPos = (x * 2 / width) - 1;
    const yPos = -((y * 2 / height) - 1);
    return { x: xPos, y: yPos };
}
