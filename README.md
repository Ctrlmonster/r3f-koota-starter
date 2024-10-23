# R3F + Koota Starter


This is a simple **starter example** for how to use [Koota](https://github.com/pmndrs/koota) with react three fiber.


**Koota** is a brand new ecs library by **pmndrs**. Designed for highly dynamic realtime apps (i.e. games).
While the library is mostly finished, expect some small changes to happen.
This example shows how to create a world, a basic systems schedule, spawn entities with Traits (ecs components)
connecting the simulation back to r3f/three.


![screenshot](./screenshot.png)

## Get Going
```bash
git clone
cd r3f-koota-starter
npm i
npm start
```
## First steps
Look at the [ecs/index.ts](src%2Fecs%2Findex.ts) to see how we create a world and a schedule.
Inside the [ecs/traits.ts](src%2Fecs%2Findex.ts) file you'll see some example traits and
[ecs/systems.ts](src%2Fecs%2Findex.ts) has some example systems.

## Docs
More complete docs coming soon, for now check out the [koota repo](https://github.com/pmndrs/koota) for more info.


 


