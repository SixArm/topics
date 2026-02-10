Now I have both the source material and the style reference. Here is the tutorial:

# Neural Radiance Fields (NeRF)

Neural Radiance Fields (NeRF) is a breakthrough technique in computer graphics and computer vision that uses deep neural networks to synthesize photorealistic novel views of complex 3D scenes from a sparse set of 2D photographs. Introduced by Mildenhall et al. in 2020, NeRF represents a scene as a continuous volumetric function mapping 3D spatial coordinates and viewing directions to color and density values. Unlike traditional 3D reconstruction methods that rely on explicit geometric representations such as meshes, point clouds, or voxel grids, NeRF learns an implicit, continuous representation that can capture intricate geometric details, complex material properties, and subtle lighting effects with remarkable fidelity. The technique has rapidly become one of the most influential developments in neural rendering, spawning hundreds of follow-up works and opening new possibilities in virtual reality, film production, robotics, and autonomous navigation.

## Core Concept

The fundamental insight behind NeRF is that a 3D scene can be encoded as a continuous function that, for any point in space and any viewing direction, returns the volume density (how opaque the point is) and the emitted radiance (the color observed from that direction). This function is approximated by a multi-layer perceptron (MLP) — a fully connected neural network — that is optimized to reproduce a set of known input photographs of the scene.

The rendering process works through classical volume rendering principles:

- **Ray casting:** For each pixel in a desired output image, a ray is cast from the virtual camera through the scene. Points are sampled along each ray at discrete intervals.
- **Network query:** Each sampled 3D point, along with the ray's viewing direction, is fed into the trained MLP, which outputs the density and color at that location.
- **Accumulation:** The color and density values along the ray are composited using numerical quadrature of the volume rendering integral, producing the final pixel color. Points with high density contribute more to the final color, while transparent regions are effectively passed through.

The network is trained end-to-end by minimizing the photometric loss between the rendered pixel colors and the actual pixel colors in the training photographs. No 3D supervision, depth maps, or geometric annotations are required — the network discovers the scene's geometry and appearance solely from multi-view image consistency.

## Data Collection and Preprocessing

NeRF requires a set of calibrated images as input, meaning that the camera position (extrinsics) and lens parameters (intrinsics) must be known for each photograph. In practice, this is typically achieved through one of several approaches:

- **Structure from Motion (SfM):** Tools such as COLMAP are used to automatically estimate camera poses from an unstructured collection of photographs by detecting and matching feature points across images.
- **Controlled capture rigs:** Multiple synchronized cameras arranged on a fixed rig provide known geometry, common in studio and industrial settings.
- **Handheld video:** A video captured by moving a smartphone or camera around a subject can be decomposed into frames, with SfM applied to recover the trajectory.

The quality of the camera pose estimates directly impacts the quality of the NeRF reconstruction. Errors in calibration introduce blurring, ghosting, and geometric distortion in the rendered outputs.

## Positional Encoding

A critical technical component of NeRF is positional encoding, which maps low-dimensional input coordinates into a higher-dimensional space using sinusoidal functions of varying frequencies. Without this encoding, the MLP tends to learn overly smooth functions that fail to capture high-frequency detail such as sharp edges, fine textures, and specular highlights.

| Input Component | Encoding Purpose | Effect on Output |
|---|---|---|
| Spatial coordinates (x, y, z) | Enables the network to represent high-frequency geometric detail | Sharper edges, finer surface texture, more accurate geometry |
| Viewing direction (theta, phi) | Allows the network to model view-dependent appearance | Specular reflections, glossy surfaces, anisotropic materials |

The number of frequency bands in the positional encoding controls the level of detail the network can represent. More frequency bands enable finer detail but increase the risk of overfitting to noise in the training images.

## Training Process

Training a NeRF model is computationally intensive and involves several key stages:

- **Ray sampling:** In each training iteration, a batch of rays is randomly sampled from the training images. Each ray corresponds to a known pixel color.
- **Point sampling along rays:** Points are sampled along each ray, typically using a combination of stratified (uniform with jitter) and hierarchical sampling. Hierarchical sampling allocates more samples to regions of high density, improving efficiency.
- **Network forward pass:** The sampled points and viewing directions pass through the MLP to produce per-point color and density predictions.
- **Volume rendering:** The predicted colors and densities are accumulated along each ray to produce rendered pixel values.
- **Loss computation:** The mean squared error between the rendered pixel colors and the ground truth pixel colors drives gradient-based optimization of the network weights.

A standard NeRF model typically requires training for several hours on a single GPU for a single scene containing 50 to 200 input images. The original architecture uses two MLPs — a coarse network and a fine network — where the coarse network guides the hierarchical sampling strategy used by the fine network.

## Strengths and Limitations

| Aspect | Strengths | Limitations |
|---|---|---|
| Visual quality | Produces photorealistic novel views with fine detail and realistic lighting | Quality degrades with insufficient input views or large viewpoint changes |
| Scene representation | Continuous implicit representation avoids discretization artifacts | Requires per-scene optimization; each scene needs its own trained model |
| Geometry capture | Captures complex topology, thin structures, and semi-transparent objects | Struggles with perfectly reflective or refractive surfaces without extensions |
| Memory footprint | Compact network weights versus large explicit meshes or voxel grids | Rendering requires many network evaluations, which is computationally expensive |
| Input requirements | Works with standard photographs; no special hardware needed | Requires accurate camera pose estimation; sensitive to calibration errors |
| Dynamic content | Foundational framework is extensible to dynamic scenes | Original formulation is limited to static scenes; dynamic extensions add complexity |

## Key Variants and Extensions

Since the original publication, the NeRF framework has been extended in many directions to address its limitations and broaden its applicability.

| Variant | Key Innovation | Primary Benefit |
|---|---|---|
| Instant NGP (instant-ngp) | Replaces MLP with multi-resolution hash encoding and a smaller network | Reduces training time from hours to seconds |
| Mip-NeRF | Reasons about volumes (cones) rather than single rays to handle multi-scale rendering | Eliminates aliasing artifacts at different resolutions |
| Mip-NeRF 360 | Extends Mip-NeRF to handle unbounded outdoor scenes | Enables high-quality reconstruction of large-scale environments |
| D-NeRF / Nerfies | Introduces deformation fields to model non-rigid motion | Supports dynamic and deformable scenes |
| NeRF in the Wild (NeRF-W) | Models per-image appearance variations and transient objects | Handles uncontrolled internet photo collections with varying lighting and occlusions |
| Plenoxels | Replaces neural networks entirely with an explicit sparse voxel grid optimized directly | Achieves fast training without any neural network |
| TensoRF | Factorizes the radiance field as a low-rank tensor decomposition | Reduces memory and computation while maintaining quality |
| 3D Gaussian Splatting | Represents the scene as a set of 3D Gaussian primitives rendered via rasterization | Enables real-time rendering at high quality |
| Block-NeRF | Decomposes large environments into independently trained NeRF blocks | Scales to city-level reconstructions |
| Zip-NeRF | Combines Instant NGP speed with Mip-NeRF 360 anti-aliasing | Achieves state-of-the-art quality with fast training |

3D Gaussian Splatting, introduced in 2023, has emerged as a particularly significant alternative that achieves real-time rendering by replacing volumetric ray marching with differentiable rasterization of explicit Gaussian primitives, while maintaining visual quality competitive with the best NeRF variants.

## Applications

Neural Radiance Fields and their derivatives have found applications across a broad range of industries and research areas:

- **Virtual and augmented reality:** Generating immersive 3D environments from photographs for VR/AR experiences, enabling users to explore real-world locations from arbitrary viewpoints.
- **Film and visual effects:** Creating digital doubles, set extensions, and relighting of captured scenes without traditional 3D modeling pipelines.
- **Robotics and autonomous navigation:** Building dense 3D maps from onboard cameras for robot planning, obstacle avoidance, and sim-to-real transfer.
- **E-commerce and product visualization:** Allowing consumers to view products from any angle based on a small set of product photographs.
- **Cultural heritage and preservation:** Digitally reconstructing archaeological sites, museum artifacts, and historical buildings from photographic archives.
- **Medical imaging:** Synthesizing novel views of anatomical structures from sparse CT or MRI slices to aid surgical planning and diagnosis.
- **Urban planning and mapping:** Reconstructing city-scale environments from drone or vehicle-mounted camera footage for digital twin applications.
- **Telepresence:** Rendering free-viewpoint video of people for immersive remote communication.

## Comparison with Traditional 3D Reconstruction

| Criterion | Traditional Methods (SfM + MVS) | Neural Radiance Fields | 3D Gaussian Splatting |
|---|---|---|---|
| Output representation | Explicit point cloud or mesh | Implicit continuous function (MLP weights) | Explicit set of 3D Gaussians |
| Visual quality | Good geometry, limited appearance modeling | Photorealistic with view-dependent effects | Photorealistic with real-time rendering |
| Rendering speed | Fast after mesh extraction | Slow (many network queries per pixel) | Real-time via rasterization |
| Training / optimization time | Minutes to hours depending on scene | Hours (original); seconds (Instant NGP) | Minutes |
| Handling of thin structures | Often fails or produces noisy surfaces | Captures well due to volumetric representation | Captures well with adaptive Gaussian density |
| View-dependent effects | Requires separate material/lighting models | Learned implicitly by the network | Learned via spherical harmonics on each Gaussian |
| Editability | Mesh is directly editable in standard tools | Difficult to edit implicit representations | Gaussians can be manipulated but tooling is immature |

## Related

Related topics to explore next include volume rendering and ray marching as the classical graphics foundations that NeRF builds upon, 3D Gaussian Splatting as the leading real-time alternative to neural radiance fields, structure from motion and multi-view stereo for understanding the camera calibration pipeline, implicit neural representations and neural implicit surfaces such as DeepSDF and NeuS for related approaches to learning geometry, differentiable rendering as the broader framework enabling gradient-based optimization of 3D scenes, photogrammetry for the established discipline of measurement from photographs, and generative adversarial networks and diffusion models for complementary approaches to neural image synthesis.

## Summary

Neural Radiance Fields represent a paradigm shift in 3D scene reconstruction and novel view synthesis, demonstrating that a simple multi-layer perceptron trained on multi-view photographs can learn a continuous volumetric representation capable of producing photorealistic renderings from arbitrary viewpoints. The original NeRF framework, while computationally expensive, established the viability of implicit neural scene representations and catalyzed an extraordinary wave of research that has driven training times from hours to seconds, extended the approach to dynamic and unbounded scenes, and ultimately inspired alternative representations such as 3D Gaussian Splatting that achieve real-time rendering. For technology professionals working in computer vision, graphics, robotics, or any domain involving 3D spatial understanding, NeRF and its successors represent essential knowledge — a family of techniques that is rapidly transitioning from research breakthrough to practical production tool.

## References

- Mildenhall, B., Srinivasan, P. P., Tancik, M., Barron, J. T., Ramamoorthi, R., & Ng, R. (2020). "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis." *ECCV 2020*. https://www.matthewtancik.com/nerf
- Barron, J. T., Mildenhall, B., Tancik, M., Hedman, P., Martin-Brualla, R., & Srinivasan, P. P. (2021). "Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields." *ICCV 2021*.
- Barron, J. T., Mildenhall, B., Verbin, D., Srinivasan, P. P., & Hedman, P. (2022). "Mip-NeRF 360: Unbounded Anti-Aliased Neural Radiance Fields." *CVPR 2022*.
- Muller, T., Evans, A., Schied, C., & Keller, A. (2022). "Instant Neural Graphics Primitives with a Multiresolution Hash Encoding." *ACM Transactions on Graphics (SIGGRAPH)*, 41(4).
- Kerbl, B., Kopanas, G., Leimkuhler, T., & Drettakis, G. (2023). "3D Gaussian Splatting for Real-Time Radiance Field Rendering." *ACM Transactions on Graphics (SIGGRAPH)*, 42(4).
- Martin-Brualla, R., Radwan, N., Sajjadi, M. S. M., Barron, J. T., Dosovitskiy, A., & Duckworth, D. (2021). "NeRF in the Wild: Neural Radiance Fields for Unconstrained Photo Collections." *CVPR 2021*.
- Tancik, M., et al. (2022). "Block-NeRF: Scalable Large Scene Neural View Synthesis." *CVPR 2022*.
- Tewari, A., et al. (2022). "Advances in Neural Rendering." *Computer Graphics Forum (Eurographics State of the Art Report)*, 41(2).
