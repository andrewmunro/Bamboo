export class MathHelper {
    toRadians(eularAngle) {
        return eularAngle * Math.PI / 180;
    }

    toEular(radians) {
        return radians * 180 / Math.PI;
    }
}

export default new MathHelper();
