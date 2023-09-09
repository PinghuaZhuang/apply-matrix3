import { multiply, translate3d, rotateX } from "rematrix";

// 移动后绕远点旋转
const matrix = multiply(rotateX(180), translate3d(10, 10, 10));
console.log("matrix", matrix);

const originPpoint3d = { x: 1, y: 1, z: 1 };

const applyMatrix3 = (e: number[], { x, y, z }: typeof originPpoint3d) => {
  return {
    x: e[0] * x + e[4] * y + e[8] * z + e[12],
    y: e[1] * x + e[5] * y + e[9] * z + e[13],
    z: e[2] * x + e[6] * y + e[10] * z + e[14],
  };
};

const targetPoint = applyMatrix3(matrix, originPpoint3d);

console.log("targetPoint", targetPoint);
// {x: 11, y: -11.000000000000002, z: -10.999999999999998}
