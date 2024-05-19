export const myId = () => {
  let id = [];
  let base = "0123456789ABCDEF";

  for (let i = 0; i < 18; i++) {
    let numero = (Math.random() * 15).toFixed(0);
    id.push(base[numero]);
  }
  return id.join("");
};

const nodeEnv = "PRD";

export const backURL =
  nodeEnv === "PRD"
    ? "http://18.222.55.217/"
    : "http://localhost:7500/";

