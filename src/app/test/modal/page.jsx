'use client'
import React, { useState } from 'react';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import ContentContainer from '@/components/parts/ContentContainer';
import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { closeModalWithId, Form, Input, InputFile, Modal, openModalWithId, Select, TextArea } from '@/components/parts/Modal';
import { uploadV1 } from '@/lib/upload';

const Modal1 = () => {
  const modalId = "modal-test-1"
  const [ in1, setIn1 ] = useState('default in 1');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const input1 = formData.get('input1');
    const input2 = formData.get('input2');
    const textArea1 = formData.get('textArea1');
    const textArea2 = formData.get('textArea2');
    const select1 = formData.get('select1');
    const select2 = formData.get('select2');
    const file1 = formData.get('file1');
    
    console.log("input1:", input1);
    console.log("input2:", input2);
    console.log("textArea1:", textArea1);
    console.log("textArea2:", textArea2);
    console.log("select1:", select1);
    console.log("select2:", select2);
    console.log("file1:", file1);

    //upload cloudinary
    const {secure_url} = await uploadV1(file1)
    console.log("url: ", secure_url);
    
    // tutup modal
    closeModalWithId(modalId);

    e.target.reset()
  }

  // kalo butuh aksi saat nilai berubah, 
  // biasanya dipakek klo valuenya refer ke suatu state
  const handleChange = (e) => {
    if(e.target.name === 'input1') setIn1(e.target.value)
    // else if(e.target.name === 'file1') console.log(e.target.files) // kalo mau lihat file change
  }

  const handleCancel = () => {
    closeModalWithId(modalId);
  }

  return (
    <Modal id={modalId} title={"Modal 1"} onSubmit={(e) => {handleSubmit(e)}}>
      <div className='overflow-y-auto max-h-96 w-full p-1 scrollbar-hide'>
        <Input label="Input 1" name="input1" value={in1} onChange={(e) => {handleChange(e)}}/>
        <Input label="Input 2" name="input2" onChange={(e) => {handleChange(e)}}/>
        <TextArea label="Text Area 1" name="textArea1" onChange={(e) => {handleChange(e)}}/>
        <TextArea label="Text Area 2" name="textArea2" onChange={(e) => {handleChange(e)}}/>
        <Select label={"Select 1"} name="select1">
          <option value={'option 1'}>option 1</option>
          <option value={'option 2'}>option 2</option>
          <option value={'option 3'}>option 3</option>
        </Select>
        <Select label={"Select 2"} name="select2">
          <option value={'option 1'}>option 1</option>
          <option value={'option 2'}>option 2</option>
          <option value={'option 3'}>option 3</option>
        </Select>
        <InputFile label="Input File" name="file1" onChange={handleChange}/>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <ButtonPrimary type="submit" >
          Submit
        </ButtonPrimary>
        <ButtonStrong type="button" onClick={handleCancel}>
          Cancel
        </ButtonStrong>
      </div>
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
