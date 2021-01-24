const container = `
  margin: auto;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 1140px;
`;

const isMobile = `@media only screen and (max-width: 768px)`;

const mixins = {
  container,
  isMobile
};

export default mixins;
