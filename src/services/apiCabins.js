import supabase, { supabaseUrl } from "./supabase"

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

export const createCabin = async (newCabin) => {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // https://flezvkymtkxraubhyqsh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    //Create cabin data
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {

        throw new Error("Cabin could not be created");

    }

    //uploading image   

    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
             await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)

            console.error(storageError);
            throw new Error('Cabin image could not be uploaded and the cabin was not created')

    }

    return data;
}