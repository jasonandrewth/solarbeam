//  for syntax highlghting
const css = String.raw;

const ColorValues = {
  black: "#19171A",
  white: "#f0ede1ff",
  grey: "#96969644",
  grey2: "#969696aa",
};

const Color = css`
  :root {
    --color--black: ${ColorValues.black};
    --color--white: ${ColorValues.white};
    --color--grey: ${ColorValues.grey};
    --color--grey-900: ${ColorValues.grey2};
    --color--pink: ${ColorValues.pink};
  }
`;

export { ColorValues, Color };
