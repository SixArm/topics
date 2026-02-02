# Neural Radiance Fields (NeRF)

Question: What is the fundamental approach that distinguishes Neural Radiance Fields (NeRF) from traditional 3D scene reconstruction methods?

- [ ] Using discrete voxel grids to store scene geometry and color information
- [ ] Modeling a 3D scene as a continuous function that outputs radiance (color and opacity) for any 3D point
- [ ] Relying exclusively on point clouds generated from LiDAR sensors
- [ ] Constructing polygon meshes directly from single images

<details>
  <summary>Answer</summary>
  <p>Modeling a 3D scene as a continuous function that outputs radiance (color and opacity) for any 3D point</p>
  <p>NeRF's key innovation is representing a scene as a continuous volumetric function learned by a deep neural network (typically a multi-layer perceptron). This function takes a 3D position as input and outputs the radiance at that point. This continuous representation allows NeRF to capture fine details and complex lighting effects that traditional discrete methods like point clouds, meshes, or voxel grids struggle to represent, while also being more memory-efficient.</p>
</details>
