interface ModalState {
  isSignOpen: boolean;
  isSearchOpen: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  closeAll: () => void;
}
