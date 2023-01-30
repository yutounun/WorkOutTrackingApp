/* eslint-env node */
// Nodeで実行されるためNodeルールを適用

module.exports = {
  // ビルド時にhtmlやJavaScriptで使っているcssを抽出し、必要のないcssを削除
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001449",
        secondary: "#7D78D2",
        accent: "#00BD7E",
        "gray-1": "#F5F5F5",
        "gray-2": "#DEDEDE",
        "gray-3": "#7F7F7F",
      },
      fontSize: {
        xxs: "0.5rem",
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyui UI config
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "false",
  },
};
