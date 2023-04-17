import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import React, { useRef } from 'react';
const RandomizedSphere = (props) => {
  const { radius, count,position } = props;

  // generate random positions for the dots on the sphere
  const dotPositions = new Array(count).fill().map(() => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
  });
  const sphereRef = useRef();
  useFrame(() => {
    sphereRef.current.rotation.y += 0.001;
  });
  // use a custom shader to render the dots as points
  const material = new THREE.ShaderMaterial({
    uniforms: {
      pointSize: { value: 5 },
      color: { value: new THREE.Color(0xffffff) },
    },
    vertexShader: `
      uniform float pointSize;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = pointSize * (1.0 / - mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  return (
    <points ref={sphereRef} position={position}>
      <sphereBufferGeometry args={[radius, 64, 32]} />
      <bufferAttribute
        attachObject={['attributes', 'position']}
        count={count}
        array={new Float32Array(dotPositions.flat())}
        itemSize={3}
      />
      <primitive object={material} />
    </points>
  );
}

export default RandomizedSphere;
