import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // https://yorglpxmasdnpsuyfuye.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    let query = supabase.from("cabins");

    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("There was a problem creating the cabin");
    }

    // upload image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image, {
            cacheControl: "3600",
            upsert: false,
        });

    if (storageError) {
        await deleteCabin(data.id);
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}
