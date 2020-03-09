/**
 * Created by rockyl on 2020-03-09.
 */

/**
 * 线性插值
 * @param begin number
 * @param end number
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export function lerp(begin: number, end: number, t: number, allowOutOfBounds = false) {
	if (!allowOutOfBounds) {
		t = Math.max(0, Math.min(1, t));
	}

	let sign = end - begin;
	sign = sign > 0 ? 1 : (sign < 0 ? -1 : 0);
	const distance = Math.abs(end - begin);

	return begin + distance * t * sign;
}

/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export function lerpVector2(begin: {x: number, y: number}, end: {x: number, y: number}, t: number, allowOutOfBounds = false) {
	return {
		x: lerp(begin.x, end.x, t, allowOutOfBounds),
		y: lerp(begin.y, end.y, t, allowOutOfBounds),
	};
}

/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export function lerpVector3(begin: {x: number, y: number, z: number}, end: {x: number, y: number,  z: number}, t: number, allowOutOfBounds = false) {
	return {
		x: lerp(begin.x, end.x, t, allowOutOfBounds),
		y: lerp(begin.y, end.y, t, allowOutOfBounds),
		z: lerp(begin.z, end.z, t, allowOutOfBounds),
	};
}
