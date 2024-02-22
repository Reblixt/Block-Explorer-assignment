export const itISWalletAddress = (address) => {
  const regex = /^0x[0-9,a-f,A-F]{40}$/;

  if (regex.test(address)) {
    return address;
  } else {
    alert("Enter a correct/complete address!");
    return null;
  }
};
