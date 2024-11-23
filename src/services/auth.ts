const API_URL = process.env.API_URL;

export const loginUser = async (userData: { username: string; password: string }) => {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      
    });
  
    console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.exception.message || 'Giriş işlemi başarısız.');
    }
  
    return await response.json();
  };

export const registerUser = async (userData: { username: string; password: string }) => {
  const response = await fetch(`${API_URL}/register`,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });

  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.exception.message || "Kayıt işlemi başarısız.")
  }

  return await response.json();

}