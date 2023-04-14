// Excluding Password and Email

class UserInfos {
  static usersInfos(users) {
    const information = [];
    users.forEach((user) => {
      const info = {
        name: user.name,
        roleId: user.roleId,
        isActive: user.isActive,
        gender: user.gender,
        birthDate: user.birthDate,
        preferredLanguage: user.preferredLanguage,
        preferredCurrency: user.preferredCurrency,
        physicalAddress: user.physicalAddress,
        googleId: user.googleId,
      };
      information.push(info);
    });

    return information;
  }

  static userInfos(user) {
    const information = {
      name: user.name,
      roleId: user.roleId,
      isActive: user.isActive,
      gender: user.gender,
      birthDate: user.birthDate,
      preferredLanguage: user.preferredLanguage,
      preferredCurrency: user.preferredCurrency,
      physicalAddress: user.physicalAddress,
      googleId: user.googleId,
    };

    return information;
  }
}

export default UserInfos;
