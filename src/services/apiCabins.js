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

export const createEditCabin = async (newCabin, id) => {
    const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl)
    console.log(newCabin.image);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImgPath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // https://flezvkymtkxraubhyqsh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    let query = supabase.from('cabins');
    //Create cabin data if no 'id', if id: edit/update
    if (!id)
        query = query.insert([{ ...newCabin, image: imagePath }])

    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

    const { data, error } = await query.select();
    if (error)

        throw new Error("Cabin could not be created");

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