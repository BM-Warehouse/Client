'use server';

import { uploadV2 } from '@/lib/upload';

export const serverHandleSubmit = async (form) => {
  const file1 = form.get('file1');
  const res = await uploadV2(file1);

  console.log('----', res);
};
