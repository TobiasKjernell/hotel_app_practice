import supabase from "./supabase"

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