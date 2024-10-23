import {trait} from "koota";
import {Mesh} from "three";

// for demo purposes we store all traits (ecs components) in a single file

export const IsSphere = trait();
export const Position = trait({x: 0, y: 0, z: 0});
// we only use this mesh as an init value for types, we'll pass the actual mesh when adding this trait
export const MeshRef = trait({ref: new Mesh});