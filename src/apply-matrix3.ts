/**
 * Vectors
 */
import { multiply, translate3d, rotateX, fromString } from "rematrix";

// console.log("xxxx", fromString("matrix(1, 0, 0, 0, 1, 0, 0, 0, 1)"));
// 移动后绕远点旋转
// 💡 移动会携带旋转的原点移动
const matrix = multiply(rotateX(180), translate3d(10, 10, 10));
const matrix2 = multiply(translate3d(10, 10, 10), rotateX(180));
console.log("matrix", matrix, matrix2);

// -0.111213543, -0.989808381, -8.95999527
const originPpoint3d0 = { x: 1, y: 1, z: 1 };
const originPpoint3d = { x: -0.0717590377, y: 1.5729841, z: 0.0180925429 };
console.log("result", matAppPt3D(matrix, originPpoint3d0), matAppPt3D(matrix2, originPpoint3d0));

// const applyMatrix3 = (e: number[], { x, y, z }: typeof originPpoint3d) => {
//   return {
//     x: e[0] * x + e[4] * y + e[8] * z + e[12],
//     y: e[1] * x + e[5] * y + e[9] * z + e[13],
//     z: e[2] * x + e[6] * y + e[10] * z + e[14],
//   };
// };

// https://github.com/jlmakes/rematrix/issues/8#issuecomment-445815269
/**
 * Apply the matrix to a 2D point, and returns a point
 * @param  {array}  m - Matrix
 * @param  {object} p - 2D point (with x and y attributes)
 * @return {object}
 */
function matAppPt2D(m: number[], p: typeof originPpoint3d) {
  const t = m[3] * p.x + m[7] * p.y + m[15]
  return {
    x : (m[0] * p.x + m[4] * p.y + m[12]) / t,
    y : (m[1] * p.x + m[5] * p.y + m[13]) / t,
  }
}

function matAppPt3D(m: number[], p: typeof originPpoint3d) {
  const t = m[3] * p.x + m[7] * p.y + m[11] * p.z + m[15];
  return {
    x: (m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12]) / t,
    y: (m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13]) / t,
    z: (m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14]) / t,
  };
}

function applyMatrix(e: number[], { x, y, z }: typeof originPpoint3d) {
  return {
    x: e[0] * x + e[3] * y + e[6] * z,
    y: e[1] * x + e[4] * y + e[7] * z,
    z: e[2] * x + e[5] * y + e[8] * z,
  };
}

// const targetPoint = applyMatrix3(matrix, originPpoint3d);
let targetPoint = matAppPt3D(translate3d(0.111213543, 0.989808381, 8.95999527), originPpoint3d);
targetPoint = applyMatrix([1, 0, 0, 0, 1, 0, 0, 0, 1], targetPoint);

console.log("targetPoint", targetPoint);
// console.log();
// {x: 11, y: -11.000000000000002, z: -10.999999999999998}
