export const getUserFirstAndLastName = (fullName: string) => {
  const splittedFullName = fullName.split(' ');
  return { firstName: splittedFullName[0], lastName: splittedFullName[1] };
};
