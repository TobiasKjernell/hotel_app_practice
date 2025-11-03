import supabase from "./supabase"

export const signUp = async ({ fullName, email, password }) => {
    console.log(fullName);
    let { data, error } = await supabase.auth.signUp({
        email: email, password: password, options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) throw new Error(error.message)
    return data;
}

export const login = async ({ email, password }) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) throw new Error(error.message)

    console.log(data);
    return data;
}

export const getUser = async () => {
    let { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message)

    console.log(data);
    return data?.user;
}

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

}