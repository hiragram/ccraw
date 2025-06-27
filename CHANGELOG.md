# Changelog

## [1.2.0](https://github.com/hiragram/ccraw/compare/v1.1.0...v1.2.0) (2025-06-27)


### Features

* change license to MIT ([f5862cd](https://github.com/hiragram/ccraw/commit/f5862cd483be566c35c3897dd463423fcc23f5fe))

## [1.1.0](https://github.com/hiragram/ccraw/compare/v1.0.3...v1.1.0) (2025-06-27)


### Features

* remove npm publishing from GitHub Actions workflow ([57ef0b0](https://github.com/hiragram/ccraw/commit/57ef0b0c4cc3ff4e0d19bc2dd3a201eacfc151a1))


### Bug Fixes

* add automatic dependency installation to CLI script ([5fbc53a](https://github.com/hiragram/ccraw/commit/5fbc53a437bc9c175cb8eeef4c3466b2fc350d43))
* add debugging and better error handling for build process ([5686d60](https://github.com/hiragram/ccraw/commit/5686d60078a485d378e5ea9e6da3b68c68699915))
* default to production mode to avoid TypeScript compilation issues ([1740b6a](https://github.com/hiragram/ccraw/commit/1740b6a1b671e8159836a913bfbc4067b4dbe817))
* downgrade to Next.js 14 and React 18 for better TypeScript compatibility ([87d7263](https://github.com/hiragram/ccraw/commit/87d7263368bed63cfd7bd109d75badd0191defde))
* improve build detection to ensure complete builds ([e874b96](https://github.com/hiragram/ccraw/commit/e874b969f10a00ab379416a2761907ba8e92147c))
* improve dependency checking for reliable cross-directory execution ([2cc0c05](https://github.com/hiragram/ccraw/commit/2cc0c05222b44c3a1c72074d24bb252d5e3d65ac))
* improve path resolution for npm package distribution ([0635bae](https://github.com/hiragram/ccraw/commit/0635baeeeb7bfa363a6aec52eb718c40d86864f7))
* improve TypeScript and webpack configuration for proper compilation ([951a2a2](https://github.com/hiragram/ccraw/commit/951a2a26638b407568ed1fe1db562fc29b83916c))
* improve TypeScript handling and build process for npm distribution ([f4c6c63](https://github.com/hiragram/ccraw/commit/f4c6c6399c7df0a3b2dfb05ee44bbe3d0d25f41e))
* include built application and default to production mode ([343ce6f](https://github.com/hiragram/ccraw/commit/343ce6f032435a1d1e995744061ed1aec94819b9))
* include built Next.js application excluding cache files ([72bde52](https://github.com/hiragram/ccraw/commit/72bde528e6e3ade9f3275d92010b445ac3021c97))
* move TypeScript and type definitions to runtime dependencies ([29f02d8](https://github.com/hiragram/ccraw/commit/29f02d8687ba4ab7ce1b98fef1c3cb9d087fd401))
* properly configure npm package dependencies and files ([482cac1](https://github.com/hiragram/ccraw/commit/482cac157caa170dee1b1e78f6ffc0cf5885d302))
* revert to development mode as default for better TypeScript support ([24a989b](https://github.com/hiragram/ccraw/commit/24a989b96e17062440b342be2e88c9ace522ce07))
* revert to standard approach without including .next in git ([f44014b](https://github.com/hiragram/ccraw/commit/f44014bb32857cc2a13c326afd82b8e36160450d))
* simplify Next.js and TypeScript configuration ([aa5cb7f](https://github.com/hiragram/ccraw/commit/aa5cb7ff8a0184d5c1bcd4187c4179e732daccab))


### Reverts

* remove npx support and restore package configurations ([20cb620](https://github.com/hiragram/ccraw/commit/20cb620835a4c543b564e97de7008b54e77dc9db))

## [1.0.3](https://github.com/hiragram/ccraw/compare/v1.0.2...v1.0.3) (2025-06-26)


### Bug Fixes

* revert page description to original version ([b088fbc](https://github.com/hiragram/ccraw/commit/b088fbc23baec915ce4c290c9f13a7032d7359bc))

## [1.0.2](https://github.com/hiragram/ccraw/compare/v1.0.1...v1.0.2) (2025-06-26)


### Features

* improve page title with service description ([c3659f2](https://github.com/hiragram/ccraw/commit/c3659f2486aae11bbdc8767cf375a1db6d67cd6e))

## [1.0.1](https://github.com/hiragram/ccraw/compare/v1.0.0...v1.0.1) (2025-06-26)


### Bug Fixes

* change npm publish trigger from tags to release events ([fd4055f](https://github.com/hiragram/ccraw/commit/fd4055f2bc911eef95e97ff5e779e64d58921a07))

## 1.0.0 (2025-06-26)


### Features

* add GitHub Actions for automated npm publishing ([5e4ad56](https://github.com/hiragram/ccraw/commit/5e4ad563c76030fcb7aed4042189fea0397778d2))
* add npm CLI support for npx execution ([80760f5](https://github.com/hiragram/ccraw/commit/80760f57eb6c98289edf04e7bca8531866db5d3a))
* enhance tool_use and tool_result content display formatting ([9e787f8](https://github.com/hiragram/ccraw/commit/9e787f85c82c1b09148932896f7d6cc95bca5392))
* internationalize UI to English and update descriptions ([10cdec8](https://github.com/hiragram/ccraw/commit/10cdec846a154dcd4dbde4b3a4526510322b2cbb))
* JSONL viewer web application with structured message display ([6fbe9c8](https://github.com/hiragram/ccraw/commit/6fbe9c8afbada364d22ec7b2e9ebbd562fac84a0))
* rebrand application from JSONL Viewer to ccraw ([4093e63](https://github.com/hiragram/ccraw/commit/4093e63aab450bcba21470d0de39d335ec2d9a4d))


### Bug Fixes

* update release-please workflow configuration ([c547e95](https://github.com/hiragram/ccraw/commit/c547e950ff1dafca64ce750be29c0de912b8ef64))
