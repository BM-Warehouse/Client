'use client'
import React from 'react';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import ContentContainer from '@/components/parts/ContentContainer';
import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { closeModalWithId, Form, Input, InputFile, Modal, openModalWithId, Select, TextArea } from '@/components/parts/Modal';

const Modal1 = () => {
  const modalId = "modal-test-1"

  const handleCancel = () => {
    closeModalWithId(modalId);
  }

  return (
    <Modal id={modalId} title={"Modal 1"} className="" >
      <Form>
        <div className='overflow-y-auto max-h-96 w-full p-1'>
          <Input label="Input 1" name="input 1" />
          <Input label="Input 2" name="input 1" />
          <TextArea label="Text Area 1" name="textArea1" />
          <TextArea label="Text Area 2" name="textArea2" />
          <Select label={"Select 1"} name="select2">
            <option value={'option 1 value'}>option 1</option>
            <option value={'option 2 value'}>option 2</option>
            <option value={'option 3 value'}>option 3</option>
          </Select>
          <Select label={"Select 2"} name="select2">
            <option value={'option 1 value'}>option 1</option>
            <option value={'option 2 value'}>option 2</option>
            <option value={'option 3 value'}>option 3</option>
          </Select>
          <InputFile label="Input File" />
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <ButtonPrimary type="submit" >
            Submit
          </ButtonPrimary>
          <ButtonStrong type="button" onClick={handleCancel}>
            Cancel
          </ButtonStrong>
        </div>
      </Form>
    </Modal >
  )
}

const test = () => (
  <div className="font-poppins">
    {/* <Navbar />
    <Sidebar /> */}
    <ContentContainer>
      <div className='mt-40 ml-40'>
        <ButtonPrimary icon={"chevronR"} onClick={() => { openModalWithId('modal-test-1') }}>Open modal 1</ButtonPrimary>
      </div>
      <Modal1 />
    </ContentContainer>
  </div>
);
export default test;
