declare module "three/examples/jsm/loaders/FontLoader" {
  export class FontLoader {
    load(url: string, onLoad?: (font: any) => void): void;
  }
}

declare module "three/examples/jsm/geometries/TextGeometry" {
  import { ExtrudeGeometry } from "three";
  export class TextGeometry extends ExtrudeGeometry {
    constructor(
      text: string,
      parameters?: {
        font: any;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      },
    );
  }
}
