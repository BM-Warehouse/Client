import React from 'react';

const openModalWithId = (id) => {
  document.getElementById(id).showModal();
};

const closeModalWithId = (id) => {
  document.getElementById(id).close();
};

const Select = ({ children, onChange, value, className, name, label, ...rest }) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text text-secondary">{label}</span>
    </div>
    <select
      name={name}
      className={`select input-border-custom w-full text-secondary ${className || ''}`}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  </label>
);

const Form = ({ children, onSubmit, action }) => (
  <form
    action={action}
    onSubmit={onSubmit}
    className="flex flex-col items-center justify-center gap-2 w-full"
  >
    {children}
  </form>
);

const Input = ({
  label,
  name,
  type,
  onChange,
  className,
  value,
  placeholder,
  defaultValue,
  ...rest
}) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text text-secondary">{label}</span>
    </div>
    <input
      className={`input input-border-custom placeholder:text-secondary text-secondary !bg-bgInput ${
        className || ''
      }`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...rest}
    />
  </label>
);

const InputFile = ({ label, name, onChange, className, value, placeholder }) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text text-secondary">{label}</span>
    </div>
    <input
      className={`
          file:bg-tertiary
          file:px-6 file:py-3 
          file:border-none
          file:rounded-r-none
          file:rounded-tl-lg
          file:text-primary
          file:cursor-pointer
          
          !bg-bgInput 
          border
          border-secondary
          rounded-lg
          text-secondary
          focus:outline focus:outline-secondary focus:outline-offset-1 ${className || ''}`}
      type="file"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </label>
);

const TextArea = ({ className, name, label, value, onChange, defaultValue }) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text text-secondary">{label}</span>
    </div>
    <textarea
      rows={5}
      value={value}
      name={name}
      placeholder="Type here"
      className={`block p-2.5 w-full text-sm text-secondary rounded-lg border border-secondary focus:ring-secondary focus:border-secondary focus:outline  focus:outline-offset-1 !bg-bgInput ${
        className || ''
      }`}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </label>
);

const Modal = ({ children, title, description, id, className, onSubmit, action }) => (
  <dialog id={id} className="modal">
    <div className={`modal-box h-auto w-auto p-12 bg-bgColor ${className}`}>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-5 text-secondary">{title}</h2>
        {description && <p className="py-4">{description}</p>}
        <Form onSubmit={onSubmit} action={action}>
          {children}
        </Form>
      </div>
    </div>
  </dialog>
);

export { Modal, Form, Input, TextArea, Select, InputFile, openModalWithId, closeModalWithId };
