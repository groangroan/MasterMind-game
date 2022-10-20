export const setLS = u => {
  localStorage.setItem('users', JSON.stringify(u));
};

export const getUsers = localStorage.getItem('users');
