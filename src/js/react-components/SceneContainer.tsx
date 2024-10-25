import {Environment, Grid, OrbitControls, PerspectiveCamera, Sky} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useWorld} from "koota/react";
import {SphereSpawner} from "./SphereSpawner";
import {schedule} from "../ecs";

export function SceneContainer() {
  const world = useWorld();

  useFrame((_state, delta) => {
    // this is how we connect our ecs systems to r3f
    schedule.run({world, delta});
  });

  return (
    <>
      <SphereSpawner/>
      <Background/>
      <OrbitControls dampingFactor={1}/>
      <PerspectiveCamera makeDefault position={[40, 20, 20]}/>
    </>
  )
}


function Background() {

  return (
    <>
      <color attach="background" args={['#060612']}/>
      <directionalLight castShadow color={"#ffb65e"} intensity={3} position={[4, 3, 1]}/>

      <Grid
        infiniteGrid
        fadeDistance={500}
        fadeStrength={5}
        cellSize={0.6} sectionSize={3}
        sectionColor={'#3d4367'}
        cellColor={'rgb(15,28,145)'}
      />

      <Environment frames={1} environmentIntensity={0.4}>
        <Sky sunPosition={[0, 1, 11]}/>
      </Environment>
    </>
  )
}