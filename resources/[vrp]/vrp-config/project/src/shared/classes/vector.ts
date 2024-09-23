class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setFromArray(pCoords: number[]) {
        this.x = pCoords[0];
        this.y = pCoords[1];
        this.z = pCoords[2];
        return this;
    }
    getArray() {
        return [this.x, this.y, this.z];
    }
    add(pCoords: Vector3) {
        this.x += pCoords.x;
        this.y += pCoords.y;
        this.z += pCoords.z;
        return this;
    }
    addScalar(pValue: number) {
        this.x += pValue;
        this.y += pValue;
        this.z += pValue;
        return this;
    }
    sub(pCoords: Vector3) {
        this.x -= pCoords.x;
        this.y -= pCoords.y;
        this.z -= pCoords.z;
        return this;
    }
    equals(pCoords: Vector3) {
        return this.x === pCoords.x && this.y === pCoords.y && this.z === pCoords.z;
    }
    subScalar(pValue: number) {
        this.x -= pValue;
        this.y -= pValue;
        this.z -= pValue;
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }
    getDistance(pCoords: Vector3) {
        const [x, y, z] = [this.x - pCoords.x, this.y - pCoords.y, this.z - pCoords.z];
        return Math.sqrt(x * x + y * y + z * z);
    }
    getDistanceFromArray(pCoords: number[]) {
        const [x, y, z] = [this.x - pCoords[0], this.y - pCoords[1], this.z - pCoords[2]];
        return Math.sqrt(x * x + y * y + z * z);
    }
    static fromArray(pCoords: number[]) {
        return new Vector(pCoords[0], pCoords[1], pCoords[2]);
    }
    static fromObject(pCoords: Vector3) {
        return new Vector(pCoords.x, pCoords.y, pCoords.z);
    }
}