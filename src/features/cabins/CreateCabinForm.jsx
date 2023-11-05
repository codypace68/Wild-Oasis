import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
    const { id: editId, ...editValue } = cabinToEdit || {};
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValue : {},
    });
    const { errors } = formState;
    const { createCabin, isCreating } = useCreateCabin();
    const { editCabin, isEditing } = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) {
            return editCabin(
                { newCabin: { ...data, image }, id: editId },
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        }

        createCabin(
            { ...data, image },
            {
                onSuccess: (data) => {
                    reset();
                    onCloseModal?.();
                },
            }
        );
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create New Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
