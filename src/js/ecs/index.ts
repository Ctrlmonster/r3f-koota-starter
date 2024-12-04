import {Schedule} from "directed";
import {createWorld, World, createActions} from "koota";
import {AnimateColors, AnimateSpheres, SyncPositionToThree} from "./systems";
import {IsSphere, Position} from "./traits";

// =================================================================================================================


// create our world
export const world = createWorld();

// create a default schedule (we can control what data it passes into systems)
export const schedule = new Schedule<{ world: World, delta: number }>();

// import all ecs systems and build the schedule
schedule.add(AnimateSpheres);
schedule.add(SyncPositionToThree, {after: AnimateSpheres});
schedule.add(AnimateColors, {after: AnimateSpheres});
schedule.build();



// =================================================================================================================



// an example actions store to be used from within React.
// Creating action stores is optional – we can execute the code directly –
// but it can help us with organization.

export const exampleActions = createActions((world: World) => ({

  spawnSphere: () => {
    world.spawn(IsSphere, Position({
      x: Math.random() * 70 - 35,
      y: Math.random() * 15,
      z: Math.random() * 70 - 35
    }))
  },

  removeSphere: () => {
    world.queryFirst(IsSphere)?.destroy();
  },

}))

// =================================================================================================================







