const mapClientsInfo = (clientList = []) => {
  const clientMapper = (data = {}) => {
    const setKeys = safeKeys(data);
    return {
      personId: parseInt(setKeys('PersonId')),
      lastName: setKeys('LastName'),
      fullName: setKeys('FullName'),
      firstName: setKeys('FirstName'),
      middleName: setKeys('MiddleName'),
      legalName: setKeys('LegalName'),
      preferredName: setKeys('PreferredName'),
      isPrimary: setKeys('isPrimary'),
      gender: setKeys('Gender'),
      initialName: setInitials(setKeys('FirstName'), setKeys('LastName')),
      birthday: !setKeys('DateOfBirth')
        ? null
        : getFormattedDate(new Date(setKeys('DateOfBirth'))),
      email:
        setKeys('Email') !== null
          ? safeKeys(setKeys('Email')[0])('EmailAddress')
          : null,
      reSyncData: false,
      isSelected: false,
    };
  };

  return clientList.map(clientMapper);
};

const mapAdviserInfo = (adviserData = {}) => {
  const setKeys = safeKeys(adviserData);
  return {
    firstName: setKeys('FirstName'),
    lastName: setKeys('LastName'),
    preferredFullName: setKeys('PreferredFullName'),
    accessType: setKeys('AccessType'),
    email: setKeys('Email'),
    clientId: setKeys('ClientId'),
  };
};
