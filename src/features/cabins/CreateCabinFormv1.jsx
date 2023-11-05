import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("new cabin created");
            queryClient.invalidateQueries("cabins");
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isLoading}
                    {...register("name", {
                        required: "required field",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isLoading}
                    {...register("maxCapacity", {
                        required: "required field",
                        min: {
                            value: 1,
                            message: "Minimum value is 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                disabled={isLoading}
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "required field",
                        min: {
                            value: 1,
                            message: "Minimum value is 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isLoading}
                    {...register("discount", {
                        required: "required field",
                        validate: (value) =>
                            getValues().regularPrice >= value ||
                            "Discount must be lower than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isLoading}
                    {...register("description", {
                        required: "required field",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
