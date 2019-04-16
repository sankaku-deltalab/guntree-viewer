import * as mat from 'transformation-matrix';

/**
 * Field is ...
 * x: upper, y: right. [-0.5, 0.5]^2.
 * rotation is clockwise and 0 is upper.
 *
 * Canvas is ...
 * x: right, y: under. [[0, width], [0, height]].
 * rotation is clockwise and 0 is upper.
 */
export class Field {
    public readonly scale: number;
    private readonly fieldToCanvasVectorTrans: mat.Matrix;
    private readonly fieldToCanvasPointTrans: mat.Matrix;

    constructor(canvasSize: mat.Point) {
        this.scale = Math.min(canvasSize.x, canvasSize.y);
        this.fieldToCanvasVectorTrans = mat.transform(
            mat.rotateDEG(-90),
            mat.scale(this.scale),
        );
        this.fieldToCanvasPointTrans = mat.transform(
            mat.translate(canvasSize.x / 2, canvasSize.y / 2),
            mat.rotateDEG(-90),
            mat.scale(this.scale),
        );
    }

    public fieldToCanvasPoint(fieldPoint: mat.Point): mat.Point {
        return mat.applyToPoint(this.fieldToCanvasPointTrans, fieldPoint);
    }

    public fieldToCanvasVector(fieldVector: mat.Point): mat.Point {
        return mat.applyToPoint(this.fieldToCanvasVectorTrans, fieldVector);
    }

    public canvasToFieldPoint(canvasPoint: mat.Point): mat.Point {
        return mat.applyToPoint(mat.inverse(this.fieldToCanvasPointTrans), canvasPoint);
    }

    public canvasToFieldVector(canvasVector: mat.Point): mat.Point {
        return mat.applyToPoint(mat.inverse(this.fieldToCanvasPointTrans), canvasVector);
    }
}
