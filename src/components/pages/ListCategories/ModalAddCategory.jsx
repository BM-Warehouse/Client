'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Input, InputFile, Modal, TextArea } from '@/components/parts/Modal';
import ProgressBar from '@/components/parts/ProgressBar';
import { uploadV3 } from '@/lib/upload';
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
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleProgressChange = (percentage) => {
    console.log(percentage);
    setProgress(percentage);
  };

  // useEffect(()=>{
  //   console.log(progress);
  // }, [progress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl;
    try {
      const form = new FormData(e.target);
      const name = form.get('categoryName');
      const description = form.get('description');
      const image = form.get('image');
      if (image.size) {
        setIsUploading(true);
        // eslint-disable-next-line camelcase
        const { secure_url } = await uploadV3(image, handleProgressChange);
        // eslint-disable-next-line camelcase
        imageUrl = secure_url;
        console.log(imageUrl);
      }
      if (name && description && imageUrl) {
        await asyncAddCategory({ name, description, imageUrl });
        toast.success('Category Added Successfully!');
        setProgress(0);
        setIsUploading(false);
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
    <Modal id={modalId} title="Add Category" onSubmit={handleSubmit}>
      <Input label="Category Name" name="categoryName" />
      <TextArea label="Description" name="description" />
      <InputFile label="Category Picture" name="image" />
      {isUploading && (
        <div className="w-full">
          <ProgressBar progress={progress} />
        </div>
      )}
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
