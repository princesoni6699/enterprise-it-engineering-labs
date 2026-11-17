# Deployment preparation

Not published. No remote repository has been created or modified.

1. Review the local release, QA evidence and documented limitations.
2. Obtain Prince’s explicit approval to create a public repository and publish the site.
3. Create one repository named enterprise-it-engineering-labs under the approved account. Do not use the portfolio repository.
4. Run node --test and node build.mjs. Review dist for secrets and private material.
5. Push reviewed source. Use a public repository and free standard GitHub-hosted runner only; no paid runner or billing configuration.
6. Enable Pages with GitHub Actions as the source. Manually run the prepared Publish approved Pages release workflow after approval. It tests, builds, sets absolute social metadata and uploads dist. It does not run on push.
7. Verify the hub and each folder URL, refresh, exports and asset requests on the actual host.

Expected URL pattern, **not live or verified**:

https://princesoni6699.github.io/enterprise-it-engineering-labs/

Append each lab folder name and trailing slash for its direct link. No custom domain required. GitHub Free requires the repository to be public for Pages. Current official conditions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits (checked 16 November 2026).

Public sharing approval is still required by the master instructions. Preparing these files does not grant it.
