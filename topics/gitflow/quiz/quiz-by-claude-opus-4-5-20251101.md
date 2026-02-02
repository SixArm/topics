# Gitflow

Question: In Gitflow, which branch type is used specifically for fixing critical bugs in production code and must be merged into both master and develop branches?

- [ ] Feature branches
- [ ] Release branches
- [ ] Hotfix branches
- [ ] Integration branches

<details>
  <summary>Answer</summary>
  <p>Hotfix branches</p>
  <p>Hotfix branches are created specifically for fixing critical bugs in production code. They are branched from the master branch (which represents stable, production-ready code) and, once the fix is complete, must be merged back into both master (to deploy the fix) and develop (to ensure the fix is included in ongoing development). This distinguishes them from feature branches (which merge only into develop) and release branches (which are for preparing releases, not emergency fixes).</p>
</details>
