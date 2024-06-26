'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Input, InputFile, Modal, TextArea } from '@/components/parts/Modal';
import ProgressBar from '@/components/parts/ProgressBar';
import { uploadV3 } from '@/lib/upload';
import useCategoryStore from '@/store/categoryStore';

const modalId = 'modal-edit-category';

const openModalEditCategory = () => {
  document.getElementById(modalId).showModal();
};
const closeModalEditCategory = () => {
  document.getElementById(modalId).close();
};

const ModalEditCategory = ({ id }) => {
  const { categoryDetail, asyncGetDetailCategory, asyncEditCategory } = useCategoryStore(
    (state) => ({
      productCategories: state.productCategories,
      categoryDetail: state.categoryDetail,
      asyncGetDetailCategory: state.asyncGetDetailCategory,
      asyncEditCategory: state.asyncEditCategory,
      asyncRemoveCategory: state.asyncRemoveCategory
    })
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (categoryDetail) {
      setName(categoryDetail.name);
      setDescription(categoryDetail.description);
    }
  }, [categoryDetail]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'rwheysjo');
        const fileGet = formData.get('file');
        const filePreset = formData.get('upload_preset');
        console.log(fileGet);
        console.log(filePreset);
        const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
          method: 'POST',
          body: formData
        });

        // secureUrl ganti dulu jadi secure_url
        // eslint-disable-next-line camelcase
        const { secure_url } = await response.json();
        // eslint-disable-next-line camelcase
        imageUrl = secure_url;
      }

      // eslint-disable-next-line camelcase
      imageUrl = imageUrl || categoryDetail.imageUrl;

      // if (name === '' || description === '') {
      //   setName(categoryDetail.name);
      //   setDescription(categoryDetail.description);
      // }

      // console.log(id, { name, description, imageUrl });
      await asyncEditCategory(id, { name, description, imageUrl });
      closeModalEditCategory();
      toast.success('Category updated successfully!');
      await asyncGetDetailCategory(id);
    } catch (error) {
      console.log(`category edited failed: ${error}`);
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-primary">
        <h3 className="text-lg font-bold text-secondary">Edit Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="" className="text-secondary">
              Category name:
            </label>
            <input
              type="text"
              defaultValue={categoryDetail.name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="" className="text-secondary">
              Description:
            </label>
            <input
              type="text"
              defaultValue={categoryDetail.description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              onChange={handleChange}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-5 text-secondary file:bg-secondary file:border-secondary file:text-white"
            />
          </div>
          <div className="container-btn-action flex items-center justify-between">
            <div className="container-btn-submit mt-7">
              <button type="submit" className="btn bg-secondary text-white">
                Submit
              </button>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn bg-secondary text-white"
                onClick={closeModalEditCategory}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

const ModalEditCategory2 = ({ id }) => {
  const { categoryDetail, asyncGetDetailCategory, asyncEditCategory } = useCategoryStore(
    (state) => ({
      productCategories: state.productCategories,
      categoryDetail: state.categoryDetail,
      asyncGetDetailCategory: state.asyncGetDetailCategory,
      asyncEditCategory: state.asyncEditCategory,
      asyncRemoveCategory: state.asyncRemoveCategory
    })
  );

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleProgressChange = (percentage) => {
    console.log(percentage);
    setProgress(percentage);
  };

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
      }
      imageUrl = imageUrl || categoryDetail.imageUrl;
      const editdata = await asyncEditCategory(id, { name, description, imageUrl });
      const a = await editdata.json();
      console.log(a);
      toast.success('Category Updated Successfully!');
      setProgress(0);
      await asyncGetDetailCategory(id);
      closeModalEditCategory();
    } catch (e) {
      toast.error('Something Wrong');
    }
  };

  return (
    <Modal id={modalId} title="Edit Category" onSubmit={handleSubmit}>
      <Input label="Category Name" defaultValue={categoryDetail.name} name="categoryName" />
      <TextArea label="Description" defaultValue={categoryDetail.description} name="description" />
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
        <ButtonPrimary className="ml-5" type="button" onClick={closeModalEditCategory}>
          Close
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export { ModalEditCategory, ModalEditCategory2, openModalEditCategory, closeModalEditCategory };
