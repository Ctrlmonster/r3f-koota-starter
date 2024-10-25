import {useQuery} from "koota/react";
import {Entity} from "koota";
import {Group, Mesh} from "three";
import {useEffect, useRef} from "react";
import {IsSphere, MeshRef, Position} from "../ecs/traits";
import {useFrame} from "@react-three/fiber";


export function SphereSpawner() {
  const groupRef = useRef<Group>(null!);
  const entities = useQuery(IsSphere, Position);

  useFrame((_, delta) => {
    groupRef.current.rotation.x = 1.5 * groupRef.current.rotation.y;
    groupRef.current.rotation.z += delta * 0.2;
    groupRef.current.rotation.y -= delta * 0.01;
  })

  return (
    <group ref={groupRef}>
      {entities.map((entity: Entity) => <Sphere entity={entity} key={entity}/>)}
    </group>
  )
}


export function Sphere({entity}: { entity: Entity }) {
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    // add the ref to the mesh as a trait to the entity
    entity.add(MeshRef({ref: meshRef.current}));
    return () => {
      entity.remove(MeshRef);
    }
  }, [entity]);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[0.65, 18, 18]}/>
      <meshStandardMaterial color={"gold"}/>
    </mesh>
  )
}