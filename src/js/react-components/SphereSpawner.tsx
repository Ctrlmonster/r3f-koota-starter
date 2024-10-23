import {useQuery} from "koota/react";
import {Entity} from "koota";
import {Group, Mesh, Vector3Tuple} from "three";
import {useEffect, useMemo, useRef} from "react";
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
      {entities.map(entity => <Sphere entity={entity} key={entity}/>)}
    </group>
  )
}


export function Sphere({entity}: { entity: Entity }) {
  // we only get initial position as prop – we won't re-render this component when the position changes! –
  // instead, a system will update the position imperatively. If we wanted to re-render we could
  // use the `useTrait` hook to get a reactive snapshot of the Position trait.
  const initPosition = useMemo(() => Object.values(entity.get(Position)) as Vector3Tuple, [entity]);
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    // add the ref to the mesh as a trait to the entity
    entity.add(MeshRef({ref: meshRef.current}));
    return () => {
      entity.remove(MeshRef);
    }
  }, [entity]);

  return (
    <mesh position={initPosition} ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[0.65, 18, 18]}/>
      <meshStandardMaterial color={"gold"}/>
    </mesh>
  )
}