const formatAccount = (account: string, bank: string, owner: string) => {
  return `${bank} ${owner} ${account}`;
};

export default formatAccount;
