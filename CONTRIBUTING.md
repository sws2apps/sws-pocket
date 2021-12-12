# How to Contribute
SWS Pocket is one of the application that is developped by the Scheduling Workbox System (SWS) team. But we are also more than happy to receive support from those who are very intersted to assist us. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

Please make sure that you have read the [code of conduct](https://github.com/sws2apps/sws-pocket/blob/main/CODE_OF_CONDUCT.md) before continuing.

## Semantic Versioning
SWS Pocket follows semantic versioning. We release patch versions for bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. Every significant change is documented in the [changelog](https://github.com/sws2apps/sws-pocket/blob/main/CHANGELOG.md) file.

## Branch Organization
We used three different branches to make production, beta and alpha releases of SWS Pocket:

| branch | whats for |
| :----- | :-------- |
| main   | making production release of SWS Pocket: bug fix for the current version will be queued in this branch |
| beta   | making beta release of SWS Pocket: new feature will be queued in this branch |
| alpha   | making alpha release of SWS Pocket: major update to the application will be queued in this branch |

## Bugs

### Known Issues and Report
We are using [GitHub Issues](https://github.com/sws2apps/sws-pocket/issues) to keep track of bugs fix. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Security Bugs
Please do not report security bugs in the public issues; go through the process outlined on the [Security Policy](https://github.com/sws2apps/sws-pocket/blob/main/SECURITY.md).

## Proposing a Change
If you intend to add new features or suggest major changes to SWS Pocket, we recommend filing an [issue first](https://github.com/sws2apps/sws-pocket/issues). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Contribution Prerequisites
- You have the latest version of [Node](https://nodejs.org) and [Git](https://git-scm.com) installed

## Sending a Pull Request (PR)
We are monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure the following is done:
1. Fork the repository
2. Depending on what you are suggesting, start working in the appropriate branch:
   - `main`, if you want to suggest a bug fix for the current version released in production.
   - `beta`, if you want to suggest a new feature.
   - `alpha`, if you want to suggest a major update to the application.
2. Run `npm i` in the branch root.
3. Run `npm start` to make sure that the code is compiled successfully.
4. Test your changes to make sure that they are working as intended.

**When commiting your changes**, we recommend the following commands to be run:
1. Run `git add .`
2. Run `npm run commit` to start the [commitizen cli](https://github.com/commitizen/cz-cli#using-the-command-line-tool). Make sure that you’ve set your changes accordingly. Failure to set this accordingly will cause your pull request on the release branch to be discarded.
3. Run `git push`

**When your proposed changes are in the forked repository on GitHub**, create your pull request.

You will receive a notification and be informed when your PR is published on beta, or alpha, or in production.
