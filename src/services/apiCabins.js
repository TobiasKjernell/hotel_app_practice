import supabase from "./supabase"

export const getCabins = async () => {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error('Cabins not found')
    }
    return data;
}

export const deleteCabin = async (id) => {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Couldn't delete cabin")
    }
}       