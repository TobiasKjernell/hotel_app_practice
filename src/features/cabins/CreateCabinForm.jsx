import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { isPending, mutate } = useMutation({
    mutationFn: (cabin) => createCabin(cabin),
    onSuccess: async () => {
      toast.success('Added cabin');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message)
  });

  const handleOnSubmit = (data) => {
    console.log('called')
    mutate({...data, image: data.image[0]});
  }

  const onError = (errors) => {
    // console.log(errors);
  }
  return (
    <Form onSubmit={
      handleSubmit(handleOnSubmit, onError)}>

      <FormRow label='Cabin Name' error={errors?.name?.message} >
        <Input type="text" id="name" {...register('name', {
          required: 'This field required'
        })} disabled={isPending} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field required',
          min: {
            value: 1,
            message: 'Capacity should atleast be 1'
          }
        })} disabled={isPending} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field required',
          min: {
            value: 1,
            message: 'Capacity should atleast be 1'
          }
        })} disabled={isPending} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field required',
          validate: (value) => Number(getValues().regularPrice) > Number(value) || 'Discount should be less than the regular price.'
        })} disabled={isPending} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'This field required'
        })} disabled={isPending} />
      </FormRow>

      <FormRow label='Cabin photo' >
        <FileInput id="image" accept="image/*" type="file" disabled={isPending}
          {...register('image', {
            required: 'This field required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isPending} >
          Cancel
        </Button >
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
