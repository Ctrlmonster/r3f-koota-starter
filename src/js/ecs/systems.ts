import {createAdded, trait, World} from "koota";
import {mapLinear} from "three/src/math/MathUtils";
import {MeshStandardMaterial} from "three";
import {IsSphere, MeshRef, Position} from "./traits";


// for demo purposes we store all systems in a single file


// =====================================================================================================================
// =====================================================================================================================


// this system will sync back the position values in our traits back to three.js meshes

export const SyncPositionToThree = ({world}: { world: World }) => {
  world.query(Position, MeshRef).updateEach(([pos, {ref: mesh}]) => {
    // sync back to three
    mesh.position.copy(pos);
  });
}


// =====================================================================================================================
// =====================================================================================================================




// this system will animate the colors based on position

const orange = [255, 100, 0];
const violet = [148, 0, 211];

export const AnimateColors = ({world}: { world: World }) => {

  world.query(Position, MeshRef).updateEach(([pos, {ref: mesh}]) => {

    const distFromOrigin = mapLinear(Math.hypot(pos.x, pos.y, pos.z), 0, 25, 0, 1);
    const r = orange[0] * distFromOrigin + (1 - distFromOrigin) * violet[0];
    const g = orange[1] * distFromOrigin + (1 - distFromOrigin) * violet[1];
    const b = orange[2] * distFromOrigin + (1 - distFromOrigin) * violet[2];

    (mesh.material as MeshStandardMaterial).color.set(r / 255, g / 255, b / 255);
  });

}


// =====================================================================================================================
// =====================================================================================================================



// this system demos some movement. in a real game our physics, AI, character controller, w/e
// would be setting the position


let elapsedTime = 0;
const Added = createAdded();
const SpawnTime = trait({current: 0});
export const AnimateSpheres = ({world, delta}: { world: World, delta: number }) => {

  elapsedTime += delta;

  world.query(Added(IsSphere)).updateEach((_, entity) => {
    entity.add(SpawnTime({current: elapsedTime * 1.1}))
  });

  world.query(Position, SpawnTime, IsSphere).updateEach(([pos, spawnTime]) => {
    const T = spawnTime.current + elapsedTime;
    const scale = 2 / (3 - Math.cos(T));
    pos.x = -7 + scale * Math.cos(T) * 25;
    pos.z = scale * Math.sin(T) * 12.5;
    pos.y = 2 * Math.cos(T) * Math.sin(T / 2) * 10;
  });
}


// =====================================================================================================================
// =====================================================================================================================
