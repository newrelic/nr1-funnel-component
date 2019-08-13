# funnel-component

Vizco-adjacent component for displaying one or many funnels.

## Usage

Like [Vizco](https://pages.datanerd.us/dataviz/vizco-core/) components, we have two portions implement this component: a JS and CSS import.

### Installation

Run the following command from within your project.
```
npm install --save @datanerd/futurians-funnel-component
```

### CSS
Import the component's CSS into your Nerdlet/artifact's styles.scss or styles.css with the following.
```
@import '~@datanerd/futurians-funnel-component/dist/commonjs/styles.css';
```

### JS
Import the component's into your Nerdlet with the following.
```
import { FunnelComponent } from '@datanerd/futurians-funnel-component'
```

You can see (or will eventually see) an example of usage in the [Customer Journey project](https://source.datanerd.us/futurians/customer-journey). For now, checkout the storybook.

```
git clone https://source.datanerd.us/futurians/funnel-component
cd funnel-component
npm install
npm run storybook
```

The navigation to: [http://localhost:4400](http://localhost:4400)
