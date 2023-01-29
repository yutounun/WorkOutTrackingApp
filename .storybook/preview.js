import "!style-loader!css-loader!postcss-loader!@/src/assets/main.css";
import "!style-loader!css-loader!postcss-loader!@/src/assets/base.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
