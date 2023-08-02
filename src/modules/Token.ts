import { Preferences } from "@capacitor/preferences";

const setToken = async (value: string) => {
    await Preferences.set({
        key: 'token',
        value: 'Token ' + value
    })

    await Preferences.set(
        {
            key: 'isAuthenticated',
            value: "true"
        }
    )
}

const getToken = async () => {
    const { value } = await Preferences.get({ key: 'token' });

    return value;
}

const isAuthenticated = async () =>{
    const {value} = await Preferences.get({key:'isAuthenticated'})

    return value
}

const removeToken = async () => {
    await Preferences.remove({ key: 'token' })

    await Preferences.set(
        {
            key: 'isAuthenticated',
            value: "false"
        }
    )
}

export { setToken, getToken, removeToken, isAuthenticated }