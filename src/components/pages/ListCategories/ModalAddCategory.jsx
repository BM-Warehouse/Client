'use client';

import toast from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Input, InputFile, Modal, TextArea } from '@/components/parts/Modal';
import { uploadV1 } from '@/lib/upload';
import useCategoryStore from '@/store/categoryStore';

const modalId = 'modal-add-category';

const openModalAddCategory = () => {
  document.getElementById(modalId).showModal();
};
const closeModalAddCategory = () => {
  document.getElementById(modalId).close();
};

const ModalAddCategory = () => {
  const { asyncAddCategory, asyncGetAllCategory } = useCategoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl;
    try {
      const form = new FormData(e.target);
      const categoryName = form.get('categoryName');
      const description = form.get('description');
      const image = form.get('image');
      if (image.size) {
        // eslint-disable-next-line camelcase
        const { secure_url } = await uploadV1(image);
        // eslint-disable-next-line camelcase
        imageUrl = secure_url;
        console.log(imageUrl);
      }
      if (categoryName && description && imageUrl) {
        console.log(categoryName, description, imageUrl);
        await asyncAddCategory(categoryName, description, imageUrl);
        toast.success('Category Added Successfully!');
        await asyncGetAllCategory();
        closeModalAddCategory();
      } else {
        toast.error('Please fill Category Name, Description, and choose Image');
      }
    } catch (e) {
      console.log(e);
      toast.error('Something Wrong');
    }
  };

  return (
    <Modal id={modalId} title="Edit Category" onSubmit={handleSubmit}>
      <Input label="Category Name" name="categoryName" />
      <TextArea label="Description" name="description" />
      <InputFile label="Category Picture" name="image" />
      <div className="flex justify-center w-full">
        <ButtonPrimary className="mr-5" type="submit">
          Submit
        </ButtonPrimary>
        <ButtonPrimary className="ml-5" type="button" onClick={closeModalAddCategory}>
          Close
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export { ModalAddCategory, closeModalAddCategory, openModalAddCategory };
