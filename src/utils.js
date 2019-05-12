export const getFullname = user => {
    return `${user.lastname} ${user.firstname} ${user.middlename}`
}

export const getGreetingName = user => {
    return `${user.lastname} ${user.firstname.charAt(
        0
    )}. ${user.middlename.charAt(0)}.`
}

export const getGenderLabel = gender => {
    const map = {
        male: 'мужской',
        famale: 'женский',
    }

    return map[gender] !== undefined ? map[gender] : '🤷‍'
}

export const getAge = dob => {
    const today = new Date()
    const birthDate = new Date(dob)
    const month = today.getUTCMonth() - birthDate.getUTCMonth()
    let age = today.getUTCFullYear() - birthDate.getUTCFullYear()

    if (
        month < 0 ||
        (month === 0 && today.getUTCDate() < birthDate.getUTCDate())
    ) {
        age--
    }

    return age
}
