import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  PlaneGeometry,
  MeshStandardMaterial,
  WireframeGeometry,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  TextureLoader,
  LinearMipMapLinearFilter,
  LinearFilter,
} from "three";
import prototipo from "../../img/PrototipoConFiltro.jpg";

const MapConCuadricula = forwardRef((props, ref) => {
  const planeRef = useRef();

  useImperativeHandle(ref, () => ({
    getGroup() {
      return planeRef.current;
    },
  }));

  useEffect(() => {
    if (!planeRef.current) return;

    const geometry = new PlaneGeometry(160, 120, 16, 12);
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(prototipo);
    texture.minFilter = LinearMipMapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.anisotropy = 64;

    const material = new MeshStandardMaterial({ map: texture });
    const wireframe = new WireframeGeometry(geometry);
    const lineMaterial = new LineBasicMaterial({ color: "black" });
    const lineSegments = new LineSegments(wireframe, lineMaterial);
    const mesh = new Mesh(geometry, material);

    mesh.renderOrder = 0;
    planeRef.current.add(mesh);
    //planeRef.current.add(lineSegments);
     console.log("Objetos añadidos a planeRef:", planeRef.current.children);

    return () => {
      planeRef.current.remove(mesh);
      planeRef.current.remove(lineSegments);
      geometry.dispose();
      material.dispose();
      wireframe.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <group ref={planeRef} />;
});

export default MapConCuadricula;
