
[![Build Status](https://travis-ci.org/gterzian/flux-challenge.svg)](https://travis-ci.org/gterzian/flux-challenge)

### What's elegance?

If we focus on the ability for others to quickly jump in, understand and contribute to a codebase, these are matters that can be important

- Test coverage
- Use of standard tool
- Clear project structure
- A lack of complicated stuff going on

Assuming this, I've focused on covering core logic with tests, using [Jest](http://facebook.github.io/jest/), and I used standard flux libraries such as the Facebook Dispatcher, Container and Store classes found in [flux utils](http://facebook.github.io/flux/docs/flux-utils.html) as well as immutable data structures found in [Immutable](http://facebook.github.io/immutable-js/).

Besides this I've tried to keep things modular and as simple as possible. I also think keeping things in separate files and folders is useful.

I'm sure there are lots of other great flux tools and frameworks out there, and perhaps using ligthweight libraries can help people to quickly jump in, especially when the community is still young and there is no de-facto standard framework.

- Run the tests: `npm test`
- Build the project: `npm start`

Actually, if you just start the server locally and paste the `index.html` file in a browser, you should be fine.
