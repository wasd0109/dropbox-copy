export type UserNameModalProps = {
  setShowUserNameModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUserNameModal: boolean;
};

export type UserNameModalErrors = {
  username: string;
  server: string;
};
