export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setFromArray(array: number[]): Vector3 {
        this.x = array[0];
        this.y = array[1];
        this.z = array[2];
        return this;
    }

    getArray(): number[] {
        return [this.x, this.y, this.z];
    }

    add(vector: Vector3): Vector3 {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    addScalar(scalar: number): Vector3 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }

    sub(vector: Vector3): Vector3 {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    addPlusScalar(vector: Vector3, scalar: number): Vector3 {
        this.x += vector.x * scalar;
        this.y += vector.y * scalar;
        this.z += vector.z * scalar;
        return this;
    }

    subPlusScalar(vector: Vector3, scalar: number): Vector3 {
        this.x -= vector.x * scalar;
        this.y -= vector.y * scalar;
        this.z -= vector.z * scalar;
        return this;
    }

    equals(vector: Vector3): boolean {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    subScalar(scalar: number): Vector3 {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        return this;
    }

    multiply(vector: Vector3): Vector3 {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        return this;
    }

    multiplyScalar(scalar: number): Vector3 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    round(): Vector3 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }

    floor(): Vector3 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    ceil(): Vector3 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    getDistance(vector: Vector3): number {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        const dz = this.z - vector.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    getDistanceFromArray(array: number[]): number {
        const dx = this.x - array[0];
        const dy = this.y - array[1];
        const dz = this.z - array[2];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    static isCoordinateEqual(vector1: Vector3, vector2: Vector3): boolean {
        return vector1.equals(vector2);
    }

    static fromArray(array: number[]): Vector3 {
        return new Vector3(array[0], array[1], array[2]);
    }

    static fromObject(obj: { x: number; y: number; z: number }): Vector3 {
        return new Vector3(obj.x, obj.y, obj.z);
    }
}

