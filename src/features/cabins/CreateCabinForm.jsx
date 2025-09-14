import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues:
      isEditSession ? editValues : {}
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  const handleOnSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) editCabin({ newCabinData: { ...data, image: image }, id: editId })
    else createCabin({ ...data, image: image }, { onSuccess: () => { reset(); onCloseModal?.(); } })
  }

  const onError = (errors) => {
    // console.log(errors);
  }
  return (
    <Form onSubmit={
      handleSubmit(handleOnSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>

      <FormRow label='Cabin Name' error={errors?.name?.message} >
        <Input type="text" id="name" {...register('name', {
          required: 'This field required'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field required',
          min: {
            value: 1,
            message: 'Capacity should atleast be 1'
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field required',
          min: {
            value: 1,
            message: 'Capacity should atleast be 1'
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field required',
          validate: (value) => Number(getValues().regularPrice) > Number(value) || 'Discount should be less than the regular price.'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'This field required'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Cabin photo' >
        <FileInput id="image" accept="image/*" type="file" disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset" disabled={isWorking} >
          Cancel
        </Button >
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
