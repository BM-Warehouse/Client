import BASE_URL from '@/lib/baseUrl';

const getAllCategories = async () => {
  try {
    const respose = await fetch(`${BASE_URL}/categories`);
    const responseJson = await respose.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: {
        getAll: { categories }
      }
    } = responseJson;
    console.log(responseJson);
    return categories;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { getAllCategories };
