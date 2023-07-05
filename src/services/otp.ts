export const verifyPin = async (pin: number) => {
  await timeout(3000);
  if (+pin === 1111) return true;
  return false;
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
