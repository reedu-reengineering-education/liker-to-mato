"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useFrame } from "@react-three/fiber";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);
  const horizontalBarRef = useRef<THREE.Mesh | null>(null); // Ref für horizontalen Balken
  const verticalBarRef = useRef<THREE.Mesh | null>(null); // Ref für senkrechten Balken

  useEffect(() => {
    if (!mountRef.current) return;

    // Szene und Kamera erstellen
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 6);
    // camera.lookAt(0, 0, 0);

    // Beleuchtung hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    // Renderer erstellen
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x20232a);
    mountRef.current.appendChild(renderer.domElement);

    // 2D-Koordinatensystem erstellen
    const createCoordinateSystem = () => {
      const gridSize = 1000;
      const gridDivisions = 5000;
      const gridColor = 0x888888;
      const axisColor = 0xff0000;

      // Gitter erstellen
      const gridHelper = new THREE.GridHelper(
        gridSize,
        gridDivisions,
        gridColor,
        gridColor
      );
      gridHelper.rotation.x = Math.PI / 2; // Gitter horizontal ausrichten
      scene.add(gridHelper);

      // X-Achse erstellen
      const xAxisMaterial = new THREE.LineBasicMaterial({ color: axisColor });
      const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, 0, 0),
        new THREE.Vector3(gridSize / 2, 0, 0),
      ]);
      const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
      scene.add(xAxis);

      // Y-Achse erstellen
      const yAxisMaterial = new THREE.LineBasicMaterial({ color: axisColor });
      const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -gridSize / 2, 0),
        new THREE.Vector3(0, gridSize / 2, 0),
      ]);
      const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
      scene.add(yAxis);

      // Zahlen zu den Schnittpunkten
      const loader = new FontLoader();
      loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
        function (font: any) {
          const createText = (text: string, x: number, y: number) => {
            const textGeometry = new TextGeometry(text, {
              font: font,
              size: 1,
              height: 1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({
              color: axisColor,
            });
            const mesh = new THREE.Mesh(textGeometry, textMaterial);
            mesh.position.set(x, y, 0);
            scene.add(mesh);
          };

          // Labels entlang der X-Achse
          for (let i = -5; i <= 5; i++) {
            createText(i.toString(), i * 50, -20);
          }

          // Labels entlang der Y-Achse
          for (let i = -5; i <= 5; i++) {
            if (i !== 0) createText(i.toString(), 20, i * 50);
          }
        }
      );
    };

    createCoordinateSystem();

    // Renderfunktion
    const render = () => {
      renderer.render(scene, camera);
    };

    // Balkendiagramm erstellen
    createBarChart(scene, render);

    // Cleanup bei unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      barsRef.current.forEach((bar) => {
        scene.remove(bar);
        bar.geometry.dispose();
        if (Array.isArray(bar.material)) {
          bar.material.forEach((mat) => mat.dispose());
        } else {
          bar.material.dispose();
        }
      });
      if (horizontalBarRef.current) {
        scene.remove(horizontalBarRef.current);
        horizontalBarRef.current.geometry.dispose();
        if (Array.isArray(horizontalBarRef.current.material)) {
          horizontalBarRef.current.material.forEach((mat) => mat.dispose());
        } else {
          horizontalBarRef.current.material.dispose();
        }
      }
      if (verticalBarRef.current) {
        scene.remove(verticalBarRef.current);
        verticalBarRef.current.geometry.dispose();
        if (Array.isArray(verticalBarRef.current.material)) {
          verticalBarRef.current.material.forEach((mat) => mat.dispose());
        } else {
          verticalBarRef.current.material.dispose();
        }
      }
      barsRef.current = [];
    };
  }, []);

  const createBarChart = (scene: THREE.Scene, render: () => void) => {
    const barWidth = 0.5;
    const barSpacing = 1.8; // Abstand zwischen den Balken
    const barHeights = [2, 3, 1.5, 2.5, 2]; // Höhen der 5 Balken
    const barColors = [
      new THREE.Color("rgb(38,38,217)"),
      new THREE.Color("rgb(226,55,112)"),
      new THREE.Color("rgb(232,141,48)"),
      new THREE.Color("rgb(176,87,219)"),
      new THREE.Color("rgb(46,184,138)"),
    ];

    // Erstellen und Positionieren des horizontalen Balkens
    // const horizontalBarWidth = barHeights.length * barSpacing; // Breite des horizontalen Balkens
    // const horizontalBarGeometry = new THREE.BoxGeometry(
    //   horizontalBarWidth,
    //   0.2,
    //   barWidth
    // );
    const horizontalBarWidth = barHeights.length * barSpacing; // Breite des horizontalen Balkens
    const horizontalBarShape = new THREE.Shape();
    horizontalBarShape.moveTo(-horizontalBarWidth / 2, -0.1);
    horizontalBarShape.lineTo(horizontalBarWidth / 2, -0.1);
    horizontalBarShape.lineTo(horizontalBarWidth / 2, 0.1);
    horizontalBarShape.lineTo(-horizontalBarWidth / 2, 0.1);
    horizontalBarShape.lineTo(-horizontalBarWidth / 2, -0.1);

    const horizontalBarExtrudeSettings = {
      depth: barWidth,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 10,
    };

    const horizontalBarGeometry = new THREE.ExtrudeGeometry(
      horizontalBarShape,
      horizontalBarExtrudeSettings
    );
    const horizontalBarMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("rgb(238, 230, 133)"),
      roughness: 0.5,
      metalness: 0.1,
    });
    const horizontalBar = new THREE.Mesh(
      horizontalBarGeometry,
      horizontalBarMaterial
    );
    horizontalBar.position.set(-1, -1.01, -0.2); // X-Position um 50 Pixel nach links verschieben, Y-Position nach unten verschieben
    scene.add(horizontalBar);
    horizontalBarRef.current = horizontalBar;

    // Geometrie des senkrechten Balkens erstellen
    // const verticalBarGeometry = new THREE.BoxGeometry(
    //   0.2,
    //   horizontalBarWidth / 1.6,
    //   barWidth
    // );
    const verticalBarHeight = 5.62; // Höhe des vertikalen Balkens
    const verticalBarShape = new THREE.Shape();
    verticalBarShape.moveTo(-0.1, -verticalBarHeight / 2);
    verticalBarShape.lineTo(0.1, -verticalBarHeight / 2);
    verticalBarShape.lineTo(0.1, verticalBarHeight / 2);
    verticalBarShape.lineTo(-0.1, verticalBarHeight / 2);
    verticalBarShape.lineTo(-0.1, -verticalBarHeight / 2);

    const verticalBarExtrudeSettings = {
      depth: barWidth,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 10,
    };

    const verticalBarGeometry = new THREE.ExtrudeGeometry(
      verticalBarShape,
      verticalBarExtrudeSettings
    );

    const verticalBarMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("rgb(238, 230, 133)"), // Farbe für den senkrechten Balken
      roughness: 0.5,
      metalness: 0.1,
    });
    const verticalBar = new THREE.Mesh(
      verticalBarGeometry,
      verticalBarMaterial
    );
    verticalBar.position.set(-5.65, 1.7, -0.2); // Setze ihn in den Ursprung (0, 0, 0) oder eine andere gewünschte Position
    scene.add(verticalBar);
    verticalBarRef.current = verticalBar;

    // Balken mit abgerundeten Ecken erstellen
    barHeights.forEach((height, index) => {
      const shape = new THREE.Shape();
      const radius = 0.1;
      shape.moveTo(-barWidth / 2 + radius, -height / 2);
      shape.lineTo(barWidth / 2 - radius, -height / 2);
      shape.quadraticCurveTo(
        barWidth / 2,
        -height / 2,
        barWidth / 2,
        -height / 2 + radius
      );
      shape.lineTo(barWidth / 2, height / 2 - radius);
      shape.quadraticCurveTo(
        barWidth / 2,
        height / 2,
        barWidth / 2 - radius,
        height / 2
      );
      shape.lineTo(-barWidth / 2 + radius, height / 2);
      shape.quadraticCurveTo(
        -barWidth / 2,
        height / 2,
        -barWidth / 2,
        height / 2 - radius
      );
      shape.lineTo(-barWidth / 2, -height / 2 + radius);
      shape.quadraticCurveTo(
        -barWidth / 2,
        -height / 2,
        -barWidth / 2 + radius,
        -height / 2
      );

      const extrudeSettings = {
        depth: barWidth * 0.2,
        bevelEnabled: true,
        bevelThickness: 0.25,
        bevelSize: 0.1,
        bevelSegments: 10,
      };

      const barGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const barMaterial = new THREE.MeshStandardMaterial({
        color: barColors[index],
        roughness: 0.5,
        metalness: 0.1,
      });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.x =
        index * barSpacing - (barHeights.length * barSpacing) / 2;
      bar.position.y = height / 2;
      scene.add(bar);
      barsRef.current.push(bar);
    });

    // Animation der Balkenhöhe und Breite
    barsRef.current.forEach((bar) => {
      gsap.from(bar.scale, {
        duration: 1,
        x: 0.1,
        y: 0.1,

        ease: "bounce.out",
        onUpdate: render,
      });
    });

    // Animation für den senkrechten Balken
    gsap.from(verticalBar.scale, {
      duration: 1,
      x: 0.1,
      y: 0.1,
      ease: "bounce.out",
      onUpdate: render,
    });
    gsap.from(verticalBar.position, {
      duration: 1,
      y: -1,
      z: 0,
      ease: "power1.inOut",
      onUpdate: render,
    });

    // Animation des horizontalen Balkens
    gsap.from(horizontalBar.scale, {
      duration: 1,
      y: 0.1,
      x: 0.1,
      ease: "bounce.out",
      onUpdate: render,
    });
    gsap.from(horizontalBar.position, {
      duration: 1,
      y: -1,
      z: 0,
      ease: "power1.inOut",
      onUpdate: render,
    });

    render();
  };

  return <div ref={mountRef} className="rounded-lg overflow-hidden" />;
};

export default ThreeScene;
